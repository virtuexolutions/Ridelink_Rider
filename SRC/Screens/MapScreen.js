import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Pulse from 'react-native-pulse';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import DeclineModal from '../Components/DeclineModal';
import RequestModal from '../Components/RequestModal';
import navigationService from '../navigationService';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CancelRide from '../Components/CancelRide';

const MapScreen = props => {
  console.log('🚀 ~ props:', props);
  const mapRef = useRef();
  const data = props?.route?.params?.ridedata;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [price, setPrice] = useState(data?.fare);

  const [declineModal, setDeclineModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rideId, setRideID] = useState('');
  const [rideStatus, setRideStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const onPressStartNavigation = async () => {
    // rideUpdate('ontheway');
    const pickup = {
      latitude: parseFloat(data?.pickup_location_lat),
      longitude: parseFloat(data?.pickup_location_lng),
    };
    const dropoff = {
      latitude: parseFloat(data?.dropoff_location_lat),
      longitude: parseFloat(data?.dropoff_location_lng),
    };
    if (data?.pickup === 'null') {
      // console.log("inside fron fuction ===ddd===========")
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
        }}></MapView>

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
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Start Navigation To Pick Up'
            )
          }
          isBold
          onPress={() => {}}
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
            data: data,
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
