import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { customMapStyle } from '../Utillity/mapstyle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { object } from 'yup';
import AdditionalTimeModal from '../Components/AdditionalTimeModal';
import { getDistance, isValidCoordinate } from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountdownTimer from '../Components/CountdownTimer';
import CustomImage from '../Components/CustomImage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RideScreen = ({ route }) => {
  const { data, type } = route?.params;
  const rideData = route?.params?.data;
  console.log('🚀 ~ rideData:', rideData);
  const rider_arrived_time = route?.params?.rider_arrived_time;
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ token:', token);
  const [additionalTime, setAdditionalTime] = useState(false);
  const [additionalTimeModal, setAdditionalTimeModal] = useState(false);
  const [isriderArrive, setIsRiderArrived] = useState(false);
  const [addTime, setAddTime] = useState(0);
  const [time, setTime] = useState(0);
  const { user_type } = useSelector(state => state.authReducer);
  const [start_waiting, setStartWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [arrive, setArrive] = useState(false);
  const [passengerArrive, setPassengerArrive] = useState(false);
  const [fare, setFare] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentPosition, setCurrentPosition] = useState({
    // latitude: 0,
    // longitude: 0,
    latitude: 37.43312021,
    longitude: -122.0876855,
  });
  console.log('🚀 ~ currentPosition:', currentPosition);
  const apikey = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
  const origin = {
    lat:
      type === 'details'
        ? currentPosition?.latitude
        : parseFloat(data?.ride_info?.pickup_location_lat),
    lng:
      type === 'details'
        ? currentPosition?.longitude
        : parseFloat(data?.ride_info?.pickup_location_lng),
  };
  const destination = {
    lat:
      type === 'details' ? parseFloat(data?.pickup_location_lat) : 37.43312021,
    // : parseFloat(data?.ride_info?.rider?.lat),
    lng:
      type === 'details' ? parseFloat(data?.pickup_location_lng) : -122.0876855,
    // : parseFloat(data?.ride_info?.rider?.lng),
  };

  useEffect(() => {
    if (currentPosition && data?.pickup_location_lat != null) {
      const dropLocation = {
        latitude: parseFloat(data?.pickup_location_lat),
        longitude: parseFloat(data?.pickup_location_lng),
      };
      const checkDistanceBetween = getDistance(currentPosition, dropLocation);
      let km = Math.round(checkDistanceBetween / 1000);
      const getTravelTime = async () => {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
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

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
        const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
          Math.abs(lat1 - lat2) < threshold &&
          Math.abs(lon1 - lon2) < threshold;
        if (
          isLocationClose(
            37.4219983,
            -122.084,
            37.43312021060092,
            -122.08768555488422,
          )
        ) {
          // if (isLocationClose(latitude, !isriderArrive ? origin?.lat : destination?.lat, longitude,!isriderArrive ?  origin?.lng : destination?.lng)) {
          console.log(
            'location same eeeeeeeeeeeeeeeeeeeeeeeeee',
            latitude,
            origin.lat,
            longitude,
            origin.lng,
          );

          setIsRiderArrived(true);
        }
      },
      error => console.log('Error getting location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
      },
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [isFocused]);

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
      console.error('--------------------------------- error', error);
    }
  };

  const rideUpdate = async () => {
    const url = `auth/rider/ride_update/${data?.id}`;
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      setStartWaiting(true);
    }
  };

  // const onPressStartNavigation = async () => {
  //   // updateStatus('OnGoing');
  //   // setStartNavigation(true);
  //   const pickup = {
  //     latitude: parseFloat(data?.pickup_location_lat),
  //     longitude: parseFloat(data?.pickup_location_lng),
  //   };
  //   const dropoff = {
  //     latitude: parseFloat(data?.dropoff_location_lat),
  //     longitude: parseFloat(data?.dropoff_location_lng),
  //   };
  //   if (data?.stop === null) {
  //     const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving`;
  //     Linking.openURL(url).catch(err => console.error('An error occurred', err));

  //   } {
  //     const waypoints = data?.stop.map(stop => `${stop.lat},${stop.lng}`).join('|');
  //     const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving&waypoints=${waypoints}`
  //     Linking.openURL(url).catch(err => console.error('An error occurred', err));
  //   }
  // };

  return (
    <SafeAreaView style={styles.safe_are}>
      <Header
        showBack={true}
        title={
          additionalTime
            ? 'Wait For Additional Time' :
            'Navigation to Pickup'
        }
      />
      <View style={styles.main_view}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0521,
          }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}>
          <Marker
            coordinate={{
              latitude: origin?.lat,
              longitude: origin?.lng,
            }}
            pinColor={Color.black}
          />
          <MapViewDirections
            apikey={'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM'}
            origin={{
              latitude: origin?.lat,
              longitude: origin?.lng,
            }}
            destination={{
              latitude: destination?.lat,
              longitude: destination?.lng,
            }}
            strokeColor={Color.themeBlack}
            strokeWidth={6}
            onError={error => console.log('MapViewDirections Error:', error)}
            onReady={result => {
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
              }
            }}
          />
          <Marker
            pinColor={Color.black}
            coordinate={{
              latitude: destination?.lat,
              longitude: destination?.lng,
            }}
          />
        </MapView>
        {/* <View
          style={[
            styles.latest_ride_view,
            {
              top: 20,
            },
          ]}>
          <View style={styles.latest_ride_subView}>
            <View style={styles.latest_ride_image_view}>
              <CustomImage
                // source={{uri: `${baseUrl}/${history?.user?.photo}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'red',
                  borderRadius: windowWidth,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: moderateScale(10, 0.6),
                width: windowWidth * 0.5,
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(13, 0.6),
                  color: Color.black,
                }}>
            
                {rideData?.user?.name}
              </CustomText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    color: Color.black,
                  }}>
                  status :
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    color: Color.veryLightGray,
                    marginLeft: moderateScale(8, 0.6),
                  }}>
                  {rideData?.status}
                </CustomText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.2,
                height: '100%',
                paddingHorizontal: moderateScale(10, 0.6),
                justifyContent: 'space-between',
              }}>
              <Icon
                style={styles.icons}
                name={'call'}
                as={Ionicons}
                size={moderateScale(17, 0.6)}
                color={'white'}
              />
              <Icon
                onPress={() => {
                  navigationService.navigate('MessagesScreen', {
                    data: rideData,
                  });
                }}
                style={styles.icons}
                name={'message1'}
                as={AntDesign}
                size={moderateScale(17, 0.6)}
                color={'white'}
              />
            </View>
          </View>
        </View> */}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: windowHeight * 0.2,
            width: windowWidth,
          }}>
          <CustomButton
            text={'DRIVE'}
            fontSize={moderateScale(14, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            marginTop={moderateScale(10, 0.3)}
            height={windowHeight * 0.07}
            bgColor={Color.darkBlue}
            borderWidth={1.5}
            borderColor={Color.darkBlue}
            textTransform={'capitalize'}
            isBold
            onPress={() => {
              onPressStartNavigation()
              // console.log('trying to navigate tracknng screen ');
              // const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition?.latitude},${currentPosition?.longitude}&destination=${destination?.lat},${destination?.lng}&travelmode=driving`;
              // Linking.openURL(url).catch(err =>
              //   console.error('An error occurred', err),
              // );
            }}
          />
        </View>
      </View>
      <AdditionalTimeModal
        setAdditionalTime={setAdditionalTime}
        modalvisibe={additionalTimeModal}
        setTime={setAddTime}
        setModalVisible={setAdditionalTimeModal}
      />
    </SafeAreaView>
  );
};

export default RideScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
  },

  main_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  map_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    borderRadius: moderateScale(40, 0.6),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  waiting_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: Color.white,
    alignSelf: 'center',
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
    bottom: 70,
  },
  text_view: {
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
  },
  row_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  location_text_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: moderateScale(40, 0.6),
    borderWidth: 0.6,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.veryLightGray,
    marginLeft: moderateScale(10, 0.6),
  },
  text2: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    marginLeft: moderateScale(5, 0.6),
    fontWeight: '600',
  },
  latest_ride_view: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    alignItems: 'center',
    width: windowWidth * 0.95,
    marginHorizontal: moderateScale(10, 0.6),
    height: windowHeight * 0.085,
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(30, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingVertical: moderateScale(8, 0.6),
  },
  latest_ride_image_view: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: windowWidth,
  },
  latest_ride_subView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green ',
  },
  text_view2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
  },
  icons: {
    backgroundColor: Color.darkBlue,
    height: windowHeight * 0.035,
    width: windowHeight * 0.035,
    textAlign: 'center',
    borderRadius: (windowHeight * 0.035) / 2,
    paddingTop: moderateScale(5, 0.6),
    // borderWidth: 0.3,
  },
});
