import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  I18nManager,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import DeliveryBox from '../Components/DeliveryBox';
import Header from '../Components/Header';
import SearchbarComponent from '../Components/SearchbarComponent';
import Userbox from '../Components/Userbox';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

// import {
//   getDatabase,
//   onChildAdded,
//   onValue,
//   ref,
// } from '@react-native-firebase/database';

const Home = () => {
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ Home ~ token:", token)
  const { user_type } = useSelector(state => state.authReducer);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [activebutton, setactivebutton] = useState('current');
  const [isLoading, setIsLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [modal_visible, setModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});
  const [historyLoading, setHistoryLoading] = useState(false);
  const [histry_list, setHistoryList] = useState([]);

  const deliveryList = [
    {
      id: 1,
      image: require('../Assets/Images/carimage.png'),
      title: 'Ride',
    },
    {
      id: 2,
      image: require('../Assets/Images/parcelimage.png'),
      title: 'Parcel Delivery',
    },
    {
      id: 3,
      image: require('../Assets/Images/catimage.png'),
      title: 'Pets',
    },
  ];

  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

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
    const url = 'auth/rider/ride-request-list';
    setIsLoading(true);
    try {
      const response = await Get(url, token);
      console.log("🚀 ~ rideRequestList ~ response:", response?.data)
      if (response?.data?.ride_info) {
        setRequestList(response.data.ride_info?.reverse());
      } else {
        setRequestList([]);
      }
    } catch (error) {
      console.error('Error festching ride requests:', error);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (user_type === 'Rider') {
  //     const db = getDatabase();
  //     const requestsRef = ref(db, 'requests');
  //     const unsubscribe = onValue(requestsRef, snapshot => {
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         const allRequests = Object.keys(data).map(key => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         rideRequestList();
  //       }
  //     });
  //     return () => unsubscribe();
  //   }
  // }, []);

  useEffect(() => {
    updateLocation();
    rideRequestList();
    userRequestHistory();
  }, [currentPosition]);

  const updateLocation = async () => {
    const url = 'auth/rider/update-location';
    const body = {
      lat: currentPosition?.latitude,
      lng: currentPosition?.longitude,
    };
    console.log('🚀 ~ updateLocation ~ body:', body);
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('You are online now', ToastAndroid.SHORT)
        : Alert.alert('You are online now');
    }
  };

  const userRequestHistory = async () => {
    const url = `auth/customer/ride_list?type=${activebutton}`;
    setHistoryLoading(truee);
    const response = await Get(url, token);
    setHistoryLoading(false);
    if (response != undefined) {
      setHistoryList(response?.data);
    }
  };

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //     // rideRequestList()
  //   }, 2000);
  // }, []);

  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={'Driver Online'} />
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
                  Request A Ride, Hop In, And Go.
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(24, 0.6),
                    color: Color.themeBlack,
                    width: windowWidth * 0.45,
                    fontWeight: 'bold',
                  }}>
                  Go Anywhere With Ridelynk
                </CustomText>
              </View>
              <CustomButton
                text={'Explore'}
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.btn_Color}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.3}
                //   marginTop={moderateScale(10,.3)}
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
              contentContainerStyle={{ marginBottom: moderateScale(100, 0.6) }}
              style={{ marginBottom: moderateScale(20, 0.6) }}
              renderItem={({ item }) => {
                return (
                  <Userbox
                    data={item}
                    onPressDetails={() =>
                      navigationService.navigate('RideRequest', {
                        type: '',
                        data: item,
                      })
                    }
                  />
                );
              }}
            />
          )}
          {/* {Object.keys(current_ride).length > 0 &&
              current_ride.status != 'Completed' && (
                <View
                  style={[
                    styles.latest_ride_view,
                    {
                      bottom: 20,
                    },
                  ]}>
                  <View style={styles.latest_ride_subView}>
                    <View style={styles.latest_ride_image_view}>
                      <CustomImage
                        source={{uri: `${baseUrl}/${history?.user?.photo}`}}
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
                        width: windowWidth * 0.5,
                      }}>
                      <CustomText
                        isBold
                        style={{
                          fontSize: moderateScale(16, 0.6),
                          color: Color.black,
                        }}>
                        {current_ride?.user?.name}
                      </CustomText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          {current_ride?.status}
                        </CustomText>
                      </View>
                    </View>
                    <CustomText
                      isBold
                      style={{fontSize: moderateScale(12, 0.6)}}>
                      Date :
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        marginLeft: moderateScale(10, 0.6),
                      }}>
                      {moment(current_ride?.created_at).format('MM-DD-YYYY')}
                    </CustomText>
                  </View>
                  <View style={styles.text_view2}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          name="map-pin"
                          as={Feather}
                          color={Color.orange}
                        />
                        <CustomText
                          isBold={true}
                          style={{
                            fontSize: 13,
                            paddingHorizontal: moderateScale(5, 0.6),
                          }}>
                          pickupLocatoion
                        </CustomText>
                        <CustomText
                          isBold
                          style={[
                            styles.text1,
                            {
                              position: 'absolute',
                              color: 'black',
                              paddingVertical: moderateScale(10, 0.6),
                              top: 11,
                              // marginLeft: moderateScale(-3, 0.6),
                              transform: [{rotate: '-90deg'}],
                            },
                          ]}>
                          - - -
                        </CustomText>
                      </View>
                      <CustomText
                        numberOfLines={1}
                        style={{
                          fontSize: 10,
                          width: windowWidth * 0.8,
                          marginLeft: moderateScale(18, 0.6),
                        }}>
                        {current_ride?.location_from}
                      </CustomText>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: moderateScale(7, 0.6),
                        }}>
                        <Icon
                          name="map-pin"
                          as={Feather}
                          color={Color.cartheme}
                        />
                        <CustomText
                          isBold={true}
                          style={{
                            fontSize: 13,
                            paddingHorizontal: moderateScale(5, 0.6),
                          }}>
                          drop off location
                        </CustomText>
                      </View>
                      <CustomText
                        numberOfLines={1}
                        style={{
                          fontSize: 10,
                          width: windowWidth * 0.8,
                          marginLeft: moderateScale(18, 0.6),
                        }}>
                        {current_ride?.location_to}
                      </CustomText>
                    </View>
                  </View>
                  <CustomButton
                    text={'Track Ride'}
                    textColor={Color.white}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(10, 0.3)}
                    bgColor={Color.cartheme}
                    borderColor={Color.white}
                    borderWidth={1}
                    borderRadius={moderateScale(30, 0.3)}
                    isGradient
                    onPress={() =>
                      navigationService.navigate('TrackingScreen', {
                        data: current_ride,
                        description: current_ride,
                        ride_id: current_ride?.id,
                      })
                    }
                  />
                </View>
              )} */}
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
    // borderRadius: moderateScale(17, 0.6),
    alignSelf: 'center',
  },
  second_Image: {
    height: windowHeight * 0.32,
    width: windowWidth * 0.52,
    right: moderateScale(25, 0.6),
    top: moderateScale(15, 0.6),
  },
  container_Style: {
    paddingVertical: moderateScale(40, 0.6),
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
    // backgroundColor:'green',
    // position:'absolute'
  },
  card: {
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
    backgroundColor: Color.white,
    alignSelf: 'center',
  },
  image_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text_view: {
    width: '60%',
  },
  icon_view: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  location: {
    fontSize: moderateScale(12, 0.6),
    color: Color.grey,
  },
  date: {
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
  },
});
