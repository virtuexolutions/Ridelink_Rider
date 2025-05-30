import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getDistance, isValidCoordinate} from 'geolib';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import AdditionalTimeModal from '../Components/AdditionalTimeModal';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {customMapStyle} from '../Utillity/mapstyle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const RideScreen = ({route}) => {
  const {data, type, ride_status} = route?.params;
  console.log('🚀 ~ RideScreen ~ data:', data?.user?.phone);
  const rideData = route?.params?.data;
  const rider_arrived_time = route?.params?.rider_arrived_time;

  const token = useSelector(state => state.authReducer.token);

  const timeoutRef = useRef(null);
  console.log('🚀 ~ RideScreen ~ timeoutRef:aaaaaaaa', timeoutRef?.current);
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  const pusher = Pusher.getInstance();
  const myChannel = useRef(null);

  const [canCancel, setCanCancel] = useState(true);
  console.log('🚀 ~ RideScreen ~ canCancel:', canCancel);
  const [additionalTime, setAdditionalTime] = useState(false);
  const [additionalTimeModal, setAdditionalTimeModal] = useState(false);
  const [isriderArrive, setIsRiderArrived] = useState(false);
  const [addTime, setAddTime] = useState(0);
  const [time, setTime] = useState(0);
  const {user_type} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);

  const [Updatedride, setUpdatedRide] = useState(data?.status);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
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
      type === 'details'
        ? parseFloat(data?.pickup_location_lat)
        : parseFloat(data?.ride_info?.rider?.lat),
    lng:
      type === 'details'
        ? parseFloat(data?.pickup_location_lng)
        : parseFloat(data?.ride_info?.rider?.lng),
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

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  const trackedLoaction = async (lat, lng) => {
    const url = 'auth/ride_location';
    const body = {
      lat: lat,
      lng: lng,
      target_id: data?.user?.id,
    };
    const response = await Post(url, body, apiHeader(token));
  };

  useEffect(() => {
    console.log('==================== >>>>> from pusher tracking screen');
    const connectPusher = async () => {
      try {
        console.log('Initializing Pusher...');
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
          encrypted: true,
        });

        await pusher.connect();
        console.log('Pusher Connected!');
        myChannel.current = await pusher.subscribe({
          channelName: `my-ride-location-${data?.user?.id}`,
          onSubscriptionSucceeded: channelName => {
            console.log(`Subscribed to ${channelName}`);
          },
          onEvent: event => {
            console.log('Received Event:', event);
            try {
              console.log(
                'Pusher Connection State:',
                pusher.connectionState.state,
              );
            } catch (error) {
              console.error('Error parsing event data:', error);
            }
          },
        });
      } catch (error) {
        console.error('Pusher Connection Error:', error);
      }
      getChatListingData();
    };

    connectPusher();

    return () => {
      if (myChannel.current) {
        pusher.unsubscribe({channelName: `my-ride-location-${data?.user?.id}`});
      }
    };
  }, [isFocused]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        trackedLoaction(latitude, longitude);
        setCurrentPosition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));

        const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
          Math.abs(lat1 - lat2) < threshold &&
          Math.abs(lon1 - lon2) < threshold;

        const targetLat = !isriderArrive ? origin?.lat : destination?.lat;
        const targetLng = !isriderArrive ? origin?.lng : destination?.lng;

        if (isLocationClose(latitude, targetLat, longitude, targetLng)) {
          console.log('🚗 Rider arrived at the destination!');
          setIsRiderArrived(true);
        }
      },
      error => console.log('❌ Error getting location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 3000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        showLocationDialog: true,
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

  const rideUpdate = async status => {
    const url = `auth/rider/ride_update/${data?.ride_id}`;
    const body = {
      status: status,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      if (response?.data?.ride_info?.status === 'complete') {
        navigationService.navigate('RateScreen', {
          data: Updatedride?.ride_info,
        });
      } else if (response?.data?.ride_info?.status === 'cancel') {
        navigationService.navigate('Home');
      }
      setUpdatedRide(response?.data);
    }
  };

  const onPressStartNavigation = async () => {
    console.log('inside fron fuction ===ddd===========', data?.pickup);
    rideUpdate('ontheway');
    const pickup = {
      latitude: parseFloat(data?.pickup_location_lat),
      longitude: parseFloat(data?.pickup_location_lng),
    };
    const dropoff = {
      latitude: parseFloat(data?.dropoff_location_lat),
      longitude: parseFloat(data?.dropoff_location_lng),
    };
    if (data?.pickup === 'null') {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving`;
      Linking.openURL(url).catch(err =>
        console.error('An error occurred', err),
      );
    } else {
      const waypoints = data?.stop
        .map(stop => `${stop.lat},${stop.lng}`)
        .join('|');
      const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving&waypoints=${waypoints}`;
      Linking.openURL(url).catch(err =>
        console.error('An error occurred', err),
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe_are}>
      <Header
        showBack={true}
        title={
          additionalTime
            ? 'Wait For Additional Time'
            : user_type === 'Rider'
            ? 'Navigation to Pickup'
            : 'Waiting Pickup'
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
          onReady={result => {
            if (mapRef.current && !isRouteFitted) {
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
          // provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}>
          {Object.keys(origin)?.length > 0 && isValidCoordinate(origin) && (
            <Marker
              pinColor={Color.black}
              coordinate={{
                latitude: origin?.lat,
                longitude: origin?.lng,
              }}
            />
          )}
          <MapViewDirections
            apikey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
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
          {Object.keys(destination)?.length > 0 &&
            isValidCoordinate(destination) && (
              <Marker
                pinColor={Color.black}
                coordinate={{
                  latitude: destination?.lat,
                  longitude: destination?.lng,
                }}
              />
            )}
        </MapView>
        <View
          style={[
            styles.latest_ride_view,
            {
              top: 20,
            },
          ]}>
          {/* <View
          style={[
            styles.latest_ride_view,
            {
              top: 20,
            },
          ]}> */}
          <View style={styles.latest_ride_subView}>
            <View style={styles.latest_ride_image_view}>
              <CustomImage
                source={require('../Assets/Images/user.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: windowWidth,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: moderateScale(10, 0.6),
                width: windowWidth * 0.45,
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
                  {data?.status}
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
                paddingTop: moderateScale(5, 0.6),
              }}>
              <Icon
              onPress={() =>{
                Linking.openURL(`tel:${data?.user?.phone}`);
                //  ridedata?.ride_info?.rider?.phone
              }}
                style={styles.icons}
                name={'call'}
                as={Ionicons}
                size={moderateScale(21, 0.6)}
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
                size={moderateScale(21, 0.6)}
                color={'white'}
              />
            </View>
          </View>
        </View>
        <>
          <View
            style={{
              alignItems: 'center',
              width: windowWidth,
              height: windowHeight * 0.2,
              position: 'absolute',
              bottom: 0,
              // backgroundColor :'red'
            }}>
            {Updatedride?.ride_info?.status == 'arrive' && (
              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator size={'small'} color={Color.white} />
                  ) : (
                    'DRIVE'
                  )
                }
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
                  onPressStartNavigation();
                }}
              />
            )}

            {Updatedride?.ride_info?.status == 'riderArrived' || data?.status === 'riderArrived' && (
              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator size={'small'} color={Color.white} />
                  ) : (
                    'Start Waiting'
                  )
                }
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.85}
                height={windowHeight * 0.07}
                bgColor={Color.darkBlue}
                borderWidth={1}
                borderColor={Color.blue}
                textTransform={'capitalize'}
                isBold
                onPress={() => {
                  rideUpdate('arrive');
                }}
              />
            )
            }
            {Updatedride?.ride_info?.status == 'ontheway' && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: windowHeight * 0.2,
                  width: windowWidth,
                }}>
                <CustomButton
                  text={
                    isLoading ? (
                      <ActivityIndicator size={'small'} color={Color.white} />
                    ) : (
                      'Ride End'
                    )
                  }
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
                    rideUpdate('complete');
                  }}
                />
              </View>
            )}
            {isriderArrive && (
              <CustomButton
                style={{
                  position: 'absolute',
                  bottom: 100,
                }}
                text={
                  isLoading ? (
                    <ActivityIndicator size={'small'} color={Color.white} />
                  ) : (
                    'Arrived'
                  )
                }
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.85}
                marginTop={moderateScale(10, 0.3)}
                height={windowHeight * 0.07}
                bgColor={Color.darkBlue}
                textTransform={'capitalize'}
                isBold
                onPress={() => {
                  rideUpdate('riderArrived');
                }}
              />
            )
            }
          </View>
        </>
      </View>
      {/* <AdditionalTimeModal
        setAdditionalTime={setAdditionalTime}
        modalvisibe={additionalTimeModal}
        setTime={setAddTime}
        setModalVisible={setAdditionalTimeModal}
      /> */}
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

  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },

  latest_ride_view: {
    position: 'absolute',
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

  icons: {
    backgroundColor: Color.darkBlue,
    height: windowHeight * 0.04,
    width: windowHeight * 0.04,
    textAlign: 'center',
    borderRadius: (windowHeight * 0.04) / 2,
    paddingTop: moderateScale(7, 0.6),
    marginHorizontal: moderateScale(2.6),
  },
});
