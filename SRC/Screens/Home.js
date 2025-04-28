import {useIsFocused} from '@react-navigation/native';
import {Icon, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  I18nManager,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {getDatabase, onValue, ref} from '@react-native-firebase/database';
import Geolocation from 'react-native-geolocation-service';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import SearchbarComponent from '../Components/SearchbarComponent';
import Userbox from '../Components/Userbox';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const Home = () => {
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ Home ~ token:", token)
  const data = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ Home ~ data:", data)

  console.log("🚀 ~ Home ~ token:", token)
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);
  const [activebutton, setactivebutton] = useState('ride');
  console.log("🚀 ~ Home ~ activebutton:", activebutton)
  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);


  useEffect(() => {
    setactivebutton(selectedService[0] === 'delivery' ? 'delivery' : 'ride')
  }, [selectedService])

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const givenaddress = data.results[0].formatted_address;
        setAddress(givenaddress);
      } else {
        console.log('No ddddaddrsssess found');
      }
    } catch (error) {
      console.error('error from home screen ', error);
    }
  };

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

  const rideRequestList = async () => {
    const url = `auth/rider/ride-request-list?type[0]=${selectedService?.[0]}`;
    setIsLoading(true);
    console.log('🚀 ~ rideRequestList ~ url:', url);
    try {
      const response = await Get(url, token);
      console.log('🚀 ~ rideRequestList ~ response:', response?.data);
      if (response != undefined) {
        setRequestList(response?.data?.ride_info);
      } else {
        setRequestList([]);
      }
    } catch (error) {
      console.error('Error festchaaing ride requests:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('helllllssslloooo from firebase');
    const db = getDatabase();
    const requestsRef = ref(db, 'requests');

    const unsubscribe = onValue(requestsRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const allRequests = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        console.log("🚀 ~ allRequests ~ allRequests:", allRequests)
        if (
          selectedService.includes('ride') &&
          selectedService.includes('delivery')
        ) {
          rideRequestList();
        } else if (selectedService.includes('ride')) {
          rideRequestList();
        } else if (selectedService.includes('delivery')) {
          rideRequestList();
        }
      }
    });

    return () => unsubscribe();
  }, [isFocused, activebutton, selectedService]);

        
  // useEffect(() => {
  //   console.log('helllllssslloooo fromfire base');
  //   const db = getDatabase();
  //   const requestsRef = ref(db, 'requests');
  //   const unsubscribe = onValue(requestsRef, snapshot => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       const allRequests = Object.keys(data).map(key => ({
  //         id: key,
  //         ...data[key],
  //       }));

  //       // if (
  //       //   selectedService.includes('ride') &&
  //       //   selectedService.includes('delivery')
  //       // ) {
  //       rideRequestList();
  //       //   deliveryRequest();
  //       // } else if (selectedService.includes('ride')) {
  //       //   rideRequestList();
  //       // } else if (selectedService.includes('delivery')) {
  //       //   deliveryRequest();
  //       // }
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [isFocused, activebutton]);

  useEffect(() => {
    updateLocation();
    rideRequestList();
  }, [currentPosition, selectedService]);

  const updateLocation = async () => {
    const url = 'auth/rider/update-location';
    const body = {
      lat: currentPosition?.latitude,
      lng: currentPosition?.longitude,
    };
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('You are online now', ToastAndroid.SHORT)
        : Alert.alert('You are online now');
    }
  };

  const serviceArray = ['delivery', 'ride', 'pet delivery'];

  const profileUpdate = async () => {
    const body = {
      work_category: selectedService,
    };

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setModalVisible(false);
      dispatch(setUserData(response?.data?.user_info));
      Platform.OS == 'android'
        ? ToastAndroid.show('services added  Successfully', ToastAndroid.SHORT)
        : alert(' services added Successfully');
    }
  };
  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={'Driver Online'} />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.service}>
        <CustomText isBold style={styles.ser_text}>
          select service for today
        </CustomText>
        <Icon
          name="down"
          as={AntDesign}
          size={moderateScale(15, 0.6)}
          color={Color.black}
        />
      </TouchableOpacity>
      {modalVisible && (
        <View style={styles.con}>
          {serviceArray?.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText
                onPress={() => {
                  // setactivebutton(item === 'ride' ? 'ride' : 'delivery')
                  setSelectedService(prev =>
                    prev.includes(item)
                      ? prev?.filter(ser => ser !== item)
                      : [...prev, item],
                  );
                }}
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.black,
                  paddingHorizontal: moderateScale(5, 0.6),
                }}>
                {item}
              </CustomText>
              {selectedService.includes(item) && (
                <Icon
                  style={{
                    paddingTop: moderateScale(2, 0.6),
                  }}
                  name="check"
                  as={AntDesign}
                  size={moderateScale(10, 0.6)}
                  color={Color.blue}
                />
              )}
            </View>
          ))}
          {selectedService?.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                profileUpdate();
              }}
              style={{
                backgroundColor: Color.blue,
                width: '100%',
                alignItems: 'center',
              }}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={Color.black} />
              ) : (
                <CustomText
                  onPress={() => {
                    profileUpdate();
                  }}
                  style={{
                    fontSize: moderateScale(12, 0.6),
                  }}>
                  done
                </CustomText>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      <SearchbarComponent
        SearchStyle={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.058,
          backgroundColor: Color.white,
        }}
        placeholderName={null}
        isRightIcon={true}
        name={'search'}
        as={Feather}
        color={Color.grey}
      />

      <View style={styles.main_Container}>
        <View style={styles.ridelink_Box}>
          <ImageBackground
            style={styles.link_Image}
            imageStyle={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/bgcimage.png')}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: windowHeight * 0.12,
                  paddingLeft: moderateScale(10, 0.6),
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.themeBlack,
                    width: windowWidth * 0.42,
                  }}>
                  {' Request A Ride, Hop In, And Go.'}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(24, 0.6),
                    color: Color.themeBlack,
                    width: windowWidth * 0.45,
                    fontWeight: 'bold',
                  }}>
                  {' Go Anywhere With Ridelynk'}
                </CustomText>
              </View>
              <CustomButton
                text={'Explore'}
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.btn_Color}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.3}
                height={windowHeight * 0.05}
                bgColor={Color.lightGrey}
                textTransform={'capitalize'}
                borderWidth={1}
                style={{
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                }}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.button_Box}>
          <CustomButton
            onPress={() => {
              setactivebutton('ride');
            }}
            text={'ride'}
            fontSize={moderateScale(14, 0.3)}
            textColor={activebutton === 'ride' ? Color.white : Color.btn_Color}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.42}
            height={windowHeight * 0.053}
            bgColor={activebutton === 'ride' ? Color.btn_Color : 'transparent'}
            textTransform={'capitalize'}
          />
          <CustomButton
            onPress={() => {
              setactivebutton('delivery');
            }}
            text={'delivery'}
            fontSize={moderateScale(14, 0.3)}
            textColor={
              activebutton === 'delivery' ? Color.white : Color.btn_Color
            }
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.42}
            height={windowHeight * 0.055}
            bgColor={
              activebutton === 'delivery' ? Color.btn_Color : 'transparent'
            }
            textTransform={'capitalize'}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={Color.black}
            />
          ) : (
            <FlatList
              ListEmptyComponent={
                <CustomText
                  style={{
                    textAlign: 'center',
                    fontSize: moderateScale(11, 0.6),
                    color: Color.red,
                  }}>
                  no data found
                </CustomText>
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?.id}
              data={requestList}
              contentContainerStyle={{marginBottom: moderateScale(100, 0.6)}}
              style={{marginBottom: moderateScale(20, 0.6)}}
              renderItem={({item}) => {
                return (
                  <Userbox
                    data={item?.ride_info}
                    onPressDetails={() => {
                      item?.ride_info?.type == 'delivery'
                        ? navigationService.navigate('PassengerDetails', {
                            type: 'delivery',
                            data: item?.ride_info,
                            fromdelivery: true,
                          })
                        : navigationService.navigate('RideRequest', {
                            type: 'ride',
                            data: item?.ride_info,
                          });
                    }}
                  />
                );
              }}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe_area: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
    marginTop: moderateScale(20, 0.6),
  },
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  ridelink_Box: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.25,
    alignSelf: 'center',
    borderRadius: moderateScale(17, 0.6),
    borderWidth: 1,
    borderColor: Color.boxgrey,
    marginVertical: moderateScale(10, 0.6),
  },
  link_Image: {
    width: windowWidth * 0.88,
    height: '100%',
    alignSelf: 'center',
  },
  button_Box: {
    width: windowWidth * 0.88,
    height: moderateScale(50, 0.6),
    borderWidth: 1,
    borderRadius: moderateScale(30, 0.6),
    borderColor: Color.boxgrey,
    bottom: moderateScale(20, 0.6),
    flexDirection: 'row',
    gap: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
    backgroundColor: Color.lightGrey,
    marginTop: moderateScale(20, 0.6),
  },

  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  location: {
    fontSize: moderateScale(12, 0.6),
    color: Color.grey,
  },

  service: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    paddingHorizontal: moderateScale(22, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    marginTop: moderateScale(10, 0.6),
    justifyContent: 'space-between',
  },
  con: {
    backgroundColor: Color.white,
    height: windowHeight * 0.08,
    borderWidth: 1,
    borderColor: Color.lightGrey,
    width: windowWidth * 0.28,
    borderRadius: moderateScale(10, 0.6),
    zIndex: 1,
    position: 'absolute',
    right: 20,
    top: 115,
  },
});
