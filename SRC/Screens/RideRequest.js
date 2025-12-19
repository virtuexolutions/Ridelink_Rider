import { getDistance, isValidCoordinate } from 'geolib';
import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { imageUrl } from '../Config';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const RideRequest = ({ route }) => {
  const { type, data } = route.params;
  const mapRef = useRef(null);
  const token = useSelector(state => state.authReducer.token);

  const [decline, setDecline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const origin = {
    latitude: parseFloat(data?.pickup_location_lat),
    longitude: parseFloat(data?.pickup_location_lng),
  };
  const destination = {
    latitude: parseFloat(data?.dropoff_location_lat),
    longitude: parseFloat(data?.dropoff_location_lng),
  };

  useEffect(() => {
    if (data?.pickup_location_lat) {
      mapRef.current?.animateToRegion(
        {
          latitude: parseFloat(data?.pickup_location_lat),
          longitude: parseFloat(data?.pickup_location_lng),
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        },
        1000,
      );
    }
  }, [data]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
      setCurrentPosition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const givenaddress = data.results[0].formatted_address;
        setAddress(givenaddress);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error(
        'getAddressFromCoordinates from conrdinatesssssssssssss',
        error,
      );
    }
  };

  const onPressSendRequest = async status => {
    const url = `auth/rider/ride_update/${data?.ride_id}`;
    const body = {
      status: status,
      lat: currentPosition?.latitude,
      lng: currentPosition?.longitude,
      rider_arrived_time: time,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigationService.navigate('PassengerDetails', {
        type: 'ride',
        data: data,
        rider_arrived_time: response?.data?.rider_arrived_time,
        ride_status: response?.data?.ride_info?.status,
        currentPosition: currentPosition,
      });
    }
  };

  const acceptDelivery = async status => {
    const url = `auth/rider/delivery_update/${data?.delivery_id}`;
    console.log("🚀 ~ RideRequest ~ url:", url)
    const body = {
      status: status,
      lat: currentPosition?.latitude,
      lng: currentPosition?.longitude,
      rider_arrived_time: time,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigationService.navigate('DeliveryScreen', {
        type: 'delivery',
        data: data,
        rider_arrived_time: response?.data?.rider_arrived_time,
        ride_status: response?.data?.ride_info?.status,
      });
    }
  };

  useEffect(() => {
    if (currentPosition && data?.pickup_location_lat != null) {
      const dropLocation = {
        latitude: parseFloat(data?.pickup_location_lat),
        longitude: parseFloat(data?.pickup_location_lng),
      };
      const checkDistanceBetween = getDistance(currentPosition, dropLocation);
      let km = Math.round(checkDistanceBetween / 1000);
      const distanceInMiles = km / 1.60934;
      setDistance(km);
      const getTravelTime = async () => {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentPosition?.latitude},${currentPosition?.longitude}&destinations=${dropLocation.latitude},${dropLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            return setTime(travelTime);
          } else {
            console.error('Error fetching travel time:', data.status);
            return null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getTravelTime();
    }
  }, [currentPosition]);

  return (
    <SafeAreaView style={styles.safe_are}>
      <Header
        showBack={true}
        title={decline ? 'Cancel Ride' : 'Ride Request'}
      />
      <View style={styles.main_view}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(data?.pickup_location_lat),
            longitude: parseFloat(data?.pickup_location_lng),
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0521,
          }}>
          {isValidCoordinate(origin) && (
            <Marker
              coordinate={origin}
              style={{ width: 15, height: 10 }}
              pinColor={Color.red}></Marker>
          )}
          <MapViewDirections
            origin={origin}
            destination={destination}
            strokeColor={Color.themeBlack}
            strokeWidth={10}
            apikey="AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8"
          />
          {isValidCoordinate(destination) && (
            <Marker
              coordinate={destination}
              style={{ width: 15, height: 10 }}
              pinColor={Color.green}
            />
          )}
        </MapView>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            alignSelf: 'center',
            flex: 1,
          }}>
          {/* <View style={styles.profile_view}>
            <View style={styles.image_view}>
              <CustomImage
                style={styles.image}
                source={{uri: imageUrl + data?.user?.photo}}
              />
            </View>
             <View style={{width: '80%'}}>
              <CustomText style={styles.name}>{data?.user?.name}</CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <CustomText style={styles.model} isBold>
                  Car Model :
                </CustomText>
                <CustomText style={styles.model}>
                  Toyata Vios (CO21DJ3684)
                </CustomText>
              </View>
              <CustomText style={styles.model}>(4.5)</CustomText>
            </View> 
          </View> */}
          <View style={styles.waiting_card}>
            <View style={styles.seatView}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(5, 0.6),
                  }}>
                  <Icon
                    name="clock-o"
                    as={FontAwesome}
                    size={moderateScale(16, 0.6)}
                    color={Color.darkBlue}
                  />
                  <View style={{ alignItems: 'flex-start' }}>
                    <CustomText style={[styles.text1]}>pickup from</CustomText>
                    <CustomText isBold style={styles.text1}>
                      {data?.location_from}
                    </CustomText>
                  </View>
                </View>
                <CustomText
                  isBold
                  style={[
                    styles.text1,
                    {
                      position: 'absolute',
                      color: Color.veryLightGray,
                      top: 30,
                      marginLeft: moderateScale(-8, 0.6),
                      transform: [{ rotate: '-90deg' }],
                    },
                  ]}>
                  ------
                </CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(10, 0.6),
                  }}>
                  <Icon
                    name="map-marker"
                    as={FontAwesome}
                    size={moderateScale(16, 0.6)}
                    color={Color.darkBlue}
                  />
                  <View style={{ alignItems: 'flex-start' }}>
                    <CustomText style={styles.text1}>
                      {'DropOff Location'}
                    </CustomText>
                    <CustomText isBold style={styles.text1}>
                      {data?.location_to}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {decline === true ? (
            <CustomButton
              text={'Decline'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.9}
              height={windowHeight * 0.075}
              bgColor={Color.darkBlue}
              textTransform={'capitalize'}
              elevation
              loader={loading}
              marginBottom={moderateScale(40, 0.6)}
              onPress={() =>
                navigationService.navigate('ChooseDeclineReasonScreen', {
                  data: data,
                })
              }
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                top: -25,
                justifyContent: 'space-between',
                marginBottom: moderateScale(20, 0.6),
              }}>
              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    'Accept'
                  )
                }
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.7}
                height={windowHeight * 0.075}
                bgColor={Color.darkBlue}
                textTransform={'capitalize'}
                elevation
                loader={loading}
                onPress={() =>
                  time && type == 'delivery'
                    ? acceptDelivery('accept')
                    : onPressSendRequest('accept')
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setDecline(true);
                }}
                style={styles.icon_view}>
                <Icon
                  name="cross"
                  as={Entypo}
                  size={moderateScale(24, 0.6)}
                  color={Color.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideRequest;

const styles = StyleSheet.create({
  safe_are: {
    flex: 1,
    paddingVertical: moderateScale(25, 0.6),
    backgroundColor: Color.white,
  },
  main_view: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
  },
  waiting_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    backgroundColor: Color.white,
    alignSelf: 'flex-end',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    bottom: 50,
  },

  profile_view: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.1,
    borderRadius: windowWidth,
    marginTop: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Color.darkBlue,
    alignSelf: 'center',
    marginBottom: moderateScale(50, 0),
  },
  image_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowHeight,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },

  name: {
    fontSize: moderateScale(13, 0.6),
    color: Color.white,
  },
  model: {
    fontSize: moderateScale(11, 0.6),
    color: Color.white,
  },
  icon_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    backgroundColor: Color.red,
    borderRadius: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(20, 0.6),
  },
});
