import {useIsFocused, useNavigation} from '@react-navigation/native';
import {isValidCoordinate} from 'geolib';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Pulse from 'react-native-pulse';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import DeclineModal from '../Components/DeclineModal';
import RequestModal from '../Components/RequestModal';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
// import database, {
//   firebase,
//   getDatabase,
//   onChildAdded,
//   ref,
// } from '@react-native-firebase/database';
import CancelRide from '../Components/CancelRide';

const MapScreen = props => {
  const mapRef = useRef();
  const ridedata = props?.route?.params?.ridedata;
  console.log(
    '🚀 ~ ridedata?.multiplePickups====================:',
    ridedata?.multiplePickups,
  );
  const paymentMethod = props?.route?.params?.paymentMethod;
  const nearestcab = props?.route?.params?.isEnabled;
  const fromrideScreen = props?.route?.params?.fromrideScreen;
  const {user_type} = useSelector(state => state.authReducer);
  console.log('🚀 ~ user_type:', user_type);

  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ token:', token, user_type);
  const fcmToken = useSelector(state => state.authReducer.fcmToken);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [price, setPrice] = useState(ridedata?.fare);

  const [declineModal, setDeclineModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rideId, setRideID] = useState('');
  console.log('🚀 ~ rideId:', rideId);
  const [rideStatus, setRideStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  console.log(
    '🚀 ~ isVisible ===================================== canccel modal===============:',
    isVisible,
  );
  const [status, setStatus] = useState('');
  const [rideupdatedData, setRideuptedData] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  useEffect(() => {
    if (currentPosition) {
      mapRef.current?.animateToRegion(
        {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        },
        1000,
      );
    }
  }, [currentPosition]);

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
      console.error(error);
    }
  };

  const requestforRide = async () => {
    const formData = new FormData();
    const body = {
      location_from: ridedata?.pickupLocation?.name,
      location_to: ridedata?.dropoffLocation?.name,
      dropoff_location_lat: ridedata?.dropoffLocation?.lat,
      dropoff_location_lng: ridedata?.dropoffLocation?.lng,
      pickup_location_lat: ridedata?.pickupLocation?.lat,
      pickup_location_lng: ridedata?.pickupLocation?.lng,
      distance: ridedata?.distance,
      amount: ridedata?.fare,
      payment_method: paymentMethod,
      nearest_cab: nearestcab,
      type: ridedata?.CabType?.name,
      time: ridedata?.time,
    };
    ridedata?.multiplePickups?.forEach((item, index) => {
      console.log('🚀 ~ ridedata?.multiplePickups?.forEach ~ item:', item);
      formData.append(`pickup[${index}][lat]`, item?.lat);
      formData.append(`pickup[${index}][lng]`, item?.lng);
    });
    for (let key in body) {
      formData.append(key, body[key]);
    }
    const url = 'auth/bookride';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setRideID(response?.data.data?.id);
      setRideStatus(response?.data?.data?.status);
      Alert.alert('Waiting', 'Please wait here for rider to find your Request');
    }
  };

  // useEffect(() => {
  //   const reference = database().ref(`/requests/${rideId}`);
  //   const listener = reference.on('value', snapshot => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       if (data?.ride_info?.status && data?.ride_info?.status !== 'pending') {
  //         setRideuptedData(data);
  //         setModalVisible(true);
  //         // setStatus(data.status);
  //       }
  //     }
  //   });

  //   return () => reference.off('value', listener);
  // }, [rideId]);

  return (
    <SafeAreaView style={[styles.safe_are, styles.background_view]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: currentPosition.latitude || 0,
          longitude: currentPosition.longitude || 0,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}
        // initialCamera={{
        //   center: {
        //     latitude: currentPosition?.latitude || 0,
        //     longitude: currentPosition?.longitude || 0,
        //   },
        //   pitch: 0,
        //   zoom: 18,
        //   heading: 0,
        //   altitude: 1000,
        // }}
      ></MapView>

      <Pulse
        color={Color.black}
        numPulses={3}
        diameter={400}
        speed={20}
        duration={2000}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={styles.circle}>
        <Icon
          name="map-marker-alt"
          as={FontAwesome5}
          size={moderateScale(30, 0.6)}
          color={Color.white}
          style={{left: 5}}
        />
      </View>
      <View style={{position: 'absolute', bottom: 20}}>
        {/* <AskLocation
          main_view_style={{height: windowHeight * 0.17}}
          heading={'Waiting For Replies'}
          renderView={
            <View style={styles.offer_view}>
              <CustomText style={styles.text}>Your Offer</CustomText>
              <View style={styles.payment_view}>
                <TouchableOpacity
                  onPress={() => setPrice(price - 5)}
                  style={styles.icon_view}>
                  <Icon
                    name="minus"
                    as={FontAwesome5}
                    color={Color.white}
                    size={moderateScale(10, 0.6)}
                  />
                </TouchableOpacity>
                <CustomText isBold style={styles.price}>
                  {'$'} {price}
                </CustomText>
                <TouchableOpacity
                  onPress={() => setPrice(price + 5)}
                  style={styles.icon_view}>
                  <Icon
                    name="plus"
                    as={FontAwesome5}
                    color={Color.white}
                    size={moderateScale(10, 0.6)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
        /> */}
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          // disabled={rideId == '' || fromrideScreen ? false : true}
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Request'
            )
          }
          isBold
          onPress={() => {
            requestforRide();
          }}
        />
      </View>
      <RequestModal
        isVisible={modalVisible}
        onPressDecline={() => {
          setModalVisible(false);
          setDeclineModal(true);
        }}
        data={rideupdatedData}
        onPressAccept={() =>
          navigationService.navigate('RideScreen', {
            data: rideupdatedData,
            type: '',
          })
        }
      />
      <DeclineModal
        isVisible={declineModal}
        onBackdropPress={() => setDeclineModal(false)}
        onpressAccept={() => navigation.goBack()}
        onPressCancel={() => navigationService.navigate('Home')}
      />
      <CancelRide modalVisible={isVisible} setModalVisible={setIsVisible} />
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
  },
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.white,
  },
  offer_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    color: Color.black,
    paddingVertical: moderateScale(6, 0.6),
    width: '80%',
    borderBottomWidth: 0.8,
    borderBottomColor: '#D8D8D8',
  },
  payment_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth,
  },
  price: {
    width: '70%',
    fontSize: moderateScale(20, 0.6),
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },
});
