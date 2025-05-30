import {useIsFocused} from '@react-navigation/native';
import {getDistance, isValidCoordinate} from 'geolib';
import haversine from 'haversine';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get} from '../Axios/AxiosInterceptorFunction';
import AskLocation from '../Components/AskLocation';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import {windowHeight, windowWidth} from '../Utillity/utils';

const RequestScreen = () => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const mapRef = useRef(null);

  const cablist = [
    {
      id: 1,
      name: 'X Regular',
      price: '$ 10.00',
    },
    {
      id: 2,
      name: 'Mini',
      price: '$ 20.00',
    },
    {
      id: 3,
      name: 'Standered Ac',
      price: '$ 30.00',
    },
    {
      id: 4,
      name: 'Luxury Ac',
      price: '$ 40.00',
    },
  ];

  const locationPermission = useSelector(state => state.commonReducer.location);
  const [cabType, setCabType] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationType, setLocationType] = useState('pickup');
  const [completePayment, setCompletePayment] = useState(false);
  const [fare, setFare] = useState(0);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [address, setAddress] = useState('');
  const [additionalLocation, setAdditionalLocation] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [points, setPoints] = useState({});
  const [multipleLocation, setMultipleLocation] = useState([]);
  const [nearestRider, setNearestRider] = useState([]);
  const origin = {
    latitude: parseFloat(pickupLocation?.lat),
    longitude: parseFloat(pickupLocation?.lng),
  };
  const destination = {
    latitude: parseFloat(dropLocation?.lat),
    longitude: parseFloat(dropLocation?.lng),
  };
  const waypoints = multipleLocation?.map(item => ({
    latitude: parseFloat(item?.lat),
    longitude: parseFloat(item?.lng),
  }));

  const fareStructure = {
    1: {baseFare: 10, additionalFarePerMile: 1},
    2: {
      baseFare: 10,
      additionalFarePerMile: 2,
      minDistance: 10,
      maxDistance: 75,
    },
    3: {
      baseFare: 10,
      additionalFarePerMile: 1.75,
      minDistance: 76,
      maxDistance: 150,
    },
    4: {baseFare: 10, additionalFarePerMile: 1.5, minDistance: 151},
  };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, [isFocused]);

  useEffect(() => {
    getCurrentLocation();
    // getcabsData()
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

  useEffect(() => {
    if (currentPosition) {
      mapRef.current?.animateToRegion(
        {
          latitude: currentPosition?.latitude,
          longitude: currentPosition?.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        },
        1000,
      );
    }
  }, []);

  const calculateFare = distance => {
    let fare = 0;
    let fareType;
    let calfare;

    Object.keys(fareStructure).forEach(key => {
      const fareTypeObj = fareStructure[key];
      if (
        (!fareTypeObj.minDistance || distance >= fareTypeObj.minDistance) &&
        (!fareTypeObj.maxDistance || distance <= fareTypeObj.maxDistance)
      ) {
        fareType = fareTypeObj;
      }
    });

    if (fareType) {
      fare =
        fareType.baseFare + (distance - 1) * fareType.additionalFarePerMile;
      calfare = fare.toFixed(0);
    }
    return calfare;
  };

  useEffect(() => {
    if (dropLocation && pickupLocation != null) {
      const checkDistanceBetween = getDistance(pickupLocation, dropLocation);
      let km = Math.round(checkDistanceBetween / 1000);

      const distanceInMiles = km / 1.60934;
      const calculatedFare = calculateFare(distanceInMiles);
      setFare(calculatedFare);
      setDistance(km);
      const getTravelTime = async () => {
        // const apikey ='AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'
        const GOOGLE_MAPS_API_KEY = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickupLocation.lat},${pickupLocation.lng}&destinations=${dropLocation.lat},${dropLocation.lng}&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            console.log(travelTime, 'travelTime');
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
  }, [dropLocation]);

  useEffect(() => {
    const reigion = {
      latitude: origin?.latitude,
      longitude: origin?.longitude,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0521,
    };
    mapRef.current?.animateToRegion(reigion, 1000);
  }, [origin]);

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
      console.error('errrrrrrrrrrrrrrrrrr from cordinatesssssss', error);
    }
  };

  // const nearestRide = async () => {
  //   const url = 'auth/customer/near_riders_list';
  //   const response = await Get(url, token);
  //   if (response != undefined) {
  //     setNearestRider(response?.data?.data);
  //   }
  // };

  // // useEffect(() => {
  // //   // const riderPosition = nearestRider.watchPosition
  // //   // this.watchId = navigator.Wa
  // //   this.watchId = navigator.geolocation.watchPosition(
  // //         (position) => {
  // //           const region = regionFrom(
  // //             position.coords.latitude,
  // //             position.coords.longitude,
  // //             position.coords.accuracy
  // //           );
  // //           // update the UI
  // //           this.setState({
  // //             region: region,
  // //             accuracy: position.coords.accuracy
  // //           });

  // //           if(this.state.has_passenger && this.state.passenger){
  // //             // next: add code for sending driver's current location to passenger
  // //           }
  // //         },
  // //         (error) => this.setState({ error: error.message }),
  // //         {
  // //           enableHighAccuracy: true, // allows you to get the most accurate location
  // //           timeout: 20000, // (milliseconds) in which the app has to wait for location before it throws an error
  // //           maximumAge: 1000, // (milliseconds) if a previous location exists in the cache, how old for it to be considered acceptable
  // //           distanceFilter: 10 // (meters) how many meters the user has to move before a location update is triggered
  // //         },
  // //       );
  // // }, [])

  // useEffect(() => {
  //   nearestRide();
  // }, [isFocused]);

  // const sortedRiders = nearestRider
  //   ?.map(rider => ({
  //     ...rider,
  //     distance: haversine(currentPosition, {
  //       latitude: nearestRider.lat,
  //       longitude: nearestRider.lng,
  //     }),
  //   }))
  //   ?.sort((a, b) => a.distance - b.distance);
  const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';

  const handleMultipleStopsUpdate = updatedStops => {
    setMultipleLocation(updatedStops);
  };

  return (
    <SafeAreaView style={styles.safearea_view}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(currentPosition.latitude),
          longitude: parseFloat(currentPosition.longitude),
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}>
        {Object.keys(origin)?.length > 0 && (
          <>
            <Marker
              coordinate={origin}
              title="pickup  Location"
              pinColor={Color.red}
            />
          </>
        )}

        {multipleLocation.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{latitude: stop.lat, longitude: stop.lng}}
            title={`Stop ${index + 1}`}
            description={
              stop.name ||
              `Stop at latitude: ${stop.lat}, longitude: ${stop.lng}`
            }
            pinColor={Color.black}
          />
        ))}

        <MapViewDirections
          key={`${origin?.latitude}-${origin?.longitude}-${destination?.latitude}-${destination?.longitude}-${waypoints?.length}`}
          origin={origin}
          waypoints={waypoints}
          destination={destination}
          strokeColor={Color.black}
          strokeWidth={6}
          apikey={apikey}
          optimizeWaypoints={false}
          onStart={params => {
            // console.log(
            //   `Started routing between "${params?.origin}" and "${params?.destination}"`,
            // );
          }}
          onError={e => {
            console.log('map vview direction erorrrrrrrrrrrrrr', e);
          }}
          tappable={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 50,
                left: 50,
                top: 300,
                bottom: 100,
              },
            });
          }}
        />
        {/* {sortedRiders?.map((item, index) => (
          <Marker
            coordinate={{
              latitude: parseFloat(item?.lat),
              longitude: parseFloat(item?.lng),
            }}>
            <View
              style={{
                width: windowWidth * 0.09,
                height: windowHeight * 0.035,
              }}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/car_icon.png')}
              />
            </View>
          </Marker>
        ))} */}
        {destination != null &&
          Object.keys(destination)?.length > 0 &&
          isValidCoordinate(destination) && (
            <Marker
              coordinate={destination}
              title="Drop-off Location"
              pinColor={Color.green}
            />
          )}
      </MapView>
      <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
        <FlatList
          horizontal
          data={cablist}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.cab_view}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: moderateScale(10, 0.6),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <CustomText style={styles.text}>{item?.name}</CustomText>
                    <CustomText style={styles.price}>{item?.price}</CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        setCabType(item);
                      }}
                      style={[
                        styles.btn,
                        {
                          backgroundColor:
                            cabType?.id == item?.id ? '#949392' : Color.black,
                        },
                      ]}>
                      <CustomText style={styles.btn_text}>Book Ride</CustomText>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.image_view}>
                    <CustomImage
                      resizeMode="contain"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={require('../Assets/Images/carimage.png')}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
        <AskLocation
          onPressCurrentLocation={() => {
            getCurrentLocation();
            setIsModalVisible(false);
          }}
          setAddress={setAddress}
          address={address}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          isModalVisible={isModalVisible}
          setDropLocation={setDropLocation}
          dropLocation={dropLocation}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          setIsModalVisible={setIsModalVisible}
          heading={'Where are you Going?'}
          locationType={locationType}
          setLocationType={setLocationType}
          multipleLocation={multipleLocation}
          setMultipleLocation={setMultipleLocation}
          onUpdateLocation={handleMultipleStopsUpdate}
          setAdditionalLocation={setAdditionalLocation}
          additionalLocation={additionalLocation}
          fromrequest={true}
          isIcon
          islocation
        />
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'CONFIRM NOW'}
          marginBottom={moderateScale(10, 0.6)}
          onPress={() => {
            if (
              cabType != null &&
              dropLocation != null &&
              pickupLocation != null
            ) {
              navigationService.navigate('FareScreen', {
                rideData: {
                  distance: parseInt(distance),
                  time: time,
                  fare: Number(fare),
                  pickup: origin,
                  dropoff: destination,
                  currentPosition: currentPosition,
                  pickupLocation: pickupLocation,
                  dropoffLocation: dropLocation,
                  CabType: cabType,
                  multiplePickups: multipleLocation,
                },
              });
            } else {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'required feild is empty ',
                    ToastAndroid.SHORT,
                  )
                : Alert.alert('required feild is empty');
            }
          }}
        />
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  safearea_view: {
    width: windowWidth,
    height: windowHeight,
  },
  background_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cab_view: {
    height: windowHeight * 0.2,
    backgroundColor: Color.white,
    width: windowWidth * 0.7,
    marginHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#32C5FF3D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingVertical: moderateScale(15, 0.6),
    marginBottom: moderateScale(40, 0.6),
  },
  image_view: {
    width: moderateScale(120, 0.6),
    height: moderateScale(100, 0.6),
  },
  text: {
    fontSize: moderateScale(18, 0.6),
    fontWeight: '700',
  },
  price: {
    fontSize: moderateScale(12, 0.6),
    color: '#22211D',
  },
  btn: {
    width: moderateScale(100, 0.6),
    height: moderateScale(40, 0.6),
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: Color.white,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
  },
  location_View: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    backgroundColor: Color.lightGrey,
    bottom: 20,
    borderRadius: moderateScale(15, 0.6),
  },
  location_subview: {
    width: windowWidth * 0.9,
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  location_head: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
