import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import PaymentMethodCard from '../Components/PaymentMethodCard';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { baseUrl, imageUrl, profilePicUrl } from '../Config';
// import { getDatabase } from '@react-native-firebase/database';
import { useIsFocused } from '@react-navigation/native';

const PassengerDetails = ({ route }) => {
  const { type, data ,ride_status} = route.params;
  // console.log("🚀 ~ ================== ??>>>> >????PassengerDetails ~ data:sssssssssssssss", ride_status)
  console.log("🚀 ~ PassengerDetails ~ route.params:", route.params)
  const rider_arrived_time = route?.params?.rider_arrived_time
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const isFocused = useIsFocused()
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [isPaymentCom, setPaymentCom] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { user_type } = useSelector(state => state.authReducer);
  const [modalVisible, setModalVisible] = useState(false)
  const [ridedata, setRideData] = useState('')

  // useEffect(() => {
  //   const reference = getDatabase().ref(`/requests/${rideId}`);
  //   console.log('🚀 ~ useEffect ~ reference:', reference);
  //   const listener = reference.on('value', snapshot => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       if (data?.ride_info?.status && data?.ride_info?.status !== 'pending') {
  //         // setRideuptedData(data);
  //         // setModalVisible(true);
  //         // setStatus(data.status);
  //       }
  //     }
  //   });

  //   return () => reference.off('value', listener);
  // }, [isFocused]);


  return (
    <SafeAreaView style={styles.safearea_view}>
      <Header
        title={
          type === 'passangerIdentity'
            ? 'Confirm Passenger Identity'
            : 'Passenger Details'
        }
      />
      <View style={styles.main_view}>
        <PaymentMethodCard
          isuserCard

          image={data?.user?.photo}
          name={data?.user?.name}
          pickuplocation={data?.location_from}
          dropofflocation={data?.location_to}
          isButton={type === 'fromDecline' ? true : false}
          btn_text={'Decline'}
        />
        {type === 'passangerIdentity' ? (
          <View>
            <View
              style={[
                styles.text_view,
                {
                  width: '100%',
                  marginTop: moderateScale(15, 0.6),
                  borderBottomColor: Color.lightGrey,
                  borderBottomWidth: 1,
                  paddingBottom: moderateScale(12, 0.6),
                },
              ]}>
              <View style={styles.text_view}>
                <Icon
                  name="calendar"
                  as={Entypo}
                  size={moderateScale(16, 0.6)}
                  color={Color.black}
                />
                <CustomText
                  isBold
                  style={[
                    styles.heading,
                    { marginLeft: moderateScale(10, 0.6) },
                  ]}>
                  Booking Time
                </CustomText>
              </View>
              <CustomText
                style={[styles.heading, { color: Color.veryLightGray }]}>
                03 : 00 pm
              </CustomText>
            </View>
            <View
              style={[
                styles.text_view,
                {
                  width: '100%',
                  marginTop: moderateScale(15, 0.6),
                  borderBottomColor: Color.lightGrey,
                  borderBottomWidth: 1,
                  paddingBottom: moderateScale(12, 0.6),
                },
              ]}>
              <View style={styles.text_view}>
                <Icon
                  name="user"
                  as={Entypo}
                  size={moderateScale(16, 0.6)}
                  color={Color.black}
                />
                <CustomText
                  isBold
                  style={[
                    styles.heading,
                    { marginLeft: moderateScale(10, 0.6) },
                  ]}>
                  Passenger{' '}
                </CustomText>
              </View>
              <CustomText
                style={[styles.heading, { color: Color.veryLightGray }]}>
                3 Passengers
              </CustomText>
            </View>
            <View
              style={[
                styles.text_view,
                {
                  width: '100%',
                  marginTop: moderateScale(15, 0.6),
                  borderBottomColor: Color.lightGrey,
                  borderBottomWidth: 1,
                  paddingBottom: moderateScale(12, 0.6),
                },
              ]}>
              <View style={styles.text_view}>
                <Icon
                  name="dollar"
                  as={FontAwesome}
                  size={moderateScale(16, 0.6)}
                  color={Color.black}
                />
                <CustomText
                  isBold
                  style={[
                    styles.heading,
                    { marginLeft: moderateScale(10, 0.6) },
                  ]}>
                  payment Method
                </CustomText>
              </View>
              <CustomText
                style={[styles.heading, { color: Color.veryLightGray }]}>
                Online
              </CustomText>
            </View>
            <CustomButton
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              bgColor={Color.darkBlue}
              borderRadius={moderateScale(30, 0.3)}
              textColor={Color.white}
              textTransform={'none'}
              text={'CONFIRM'}
              isBold
              marginTop={moderateScale(20, 0.6)}
              onPress={() =>
                navigationService.navigate('RideRequest', {
                  type: 'fromIdentity',
                })
              }
            />
            <CustomButton
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              bgColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              textColor={Color.black}
              textTransform={'none'}
              text={'NAVIGATE'}
              borderWidth={1}
              borderColor={Color.darkBlue}
              marginBottom={moderateScale(20, 0.6)}
              isBold
              marginTop={moderateScale(10, 0.6)}
              onPress={() =>
                navigationService.navigate('RideRequest', {
                  type: 'fromIdentity',
                })
              }
            />
          </View>
        ) : (
          <>
            <View style={styles.search_conatiner}>
              <CustomText isBold style={styles.heading}>
                Payment Method
              </CustomText>
              <CustomText
                style={[styles.heading, { color: Color.veryLightGray }]}>
                **** *** **** 2482
              </CustomText>
              <View style={styles.text_view}>
                <View style={[styles.text_view, { width: '35%' }]}>
                  <CustomText isBold style={styles.heading}>
                    Expires On :
                  </CustomText>
                  <CustomText
                    style={[styles.heading, { color: Color.veryLightGray }]}>
                    12 / 12{' '}
                  </CustomText>
                </View>
                <View style={[styles.text_view, { width: '30%' }]}>
                  <CustomText
                    isBold
                    style={[styles.heading, { color: Color.red }]}>
                    $ 50.25
                  </CustomText>
                  {data?.payment_method === 'visa' ? (
                    <View style={styles.image_view}>
                      <CustomImage
                        style={styles.image}
                        source={require('../Assets/Images/visa_logo.png')}
                      />
                    </View>
                  ) : (
                    <View style={styles.image_view}>
                      <CustomImage
                        style={styles.image}
                        source={require('../Assets/Images/paypal.png')}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View
              style={[styles.search_conatiner, { height: windowHeight * 0.1 }]}>
              <CustomText isBold style={styles.heading}>
                Promo Code
              </CustomText>
              <TextInput
                editable={false}
                placeholder="013244879498"
                placeholderTextColor={Color.veryLightGray}
                style={{ borderBottomWidth: 0.5 }}
              />
            </View>
            <View style={styles.expensesContainer}>
              <View style={styles.amountView}>
                <CustomText>Trip Fare Breakdown</CustomText>
                <CustomText>{'$ ' + data?.amount}</CustomText>
              </View>
              <View style={styles.amountView}>
                <CustomText>Subtotal</CustomText>
                <CustomText>{'$ ' + data?.amount}</CustomText>
              </View>
              <View style={styles.amountView}>
                <CustomText>Promo Code</CustomText>
                <CustomText>{'$ ' + data?.amount}</CustomText>
              </View>
              <View
                style={[
                  styles.amountView,
                  {
                    borderTopColor: 'grey',
                    borderTopWidth: 0.2,
                    marginTop: 15,
                  },
                ]}>
                <CustomText isBold style={{ fontSize: moderateScale(24, 0.4) }}>
                  Total
                </CustomText>
                <CustomText isBold style={{ fontSize: moderateScale(24, 0.4) }}>
                  {'$ ' + data?.amount}
                </CustomText>
                {/* Resolved Design's calculations issues */}
              </View>
            </View>
            <View
              style={{ position: 'absolute', bottom: moderateScale(70, 0.6) }}>
              <CustomButton
                width={windowWidth * 0.9}
                height={windowHeight * 0.07}
                bgColor={Color.darkBlue}
                borderRadius={moderateScale(30, 0.3)}
                textColor={Color.white}
                textTransform={'none'}
                text={
                  type === 'fromDecline'
                    ? 'DashBoard'
                    : 'START NAVIGATION TO PICKUP'
                }
                marginBottom={moderateScale(40, 0.6)}
                isBold
                onPress={() => {
                  if (type === 'fromDecline') {
                    navigationService.navigate('GoOnlineScreen');
                  } else {
                    navigationService.navigate('RideScreen', {
                      data: data,
                      type: 'details',
                      rider_arrived_time: rider_arrived_time,
                      ride_status :ride_status,
                    });
                  }

                }}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PassengerDetails;

const styles = StyleSheet.create({
  safearea_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  main_view: {
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  search_conatiner: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.13,
    backgroundColor: 'white',
    marginTop: moderateScale(20, 0.6),
    borderRadius: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  map_view: {
    width: windowWidth * 0.9,
    height: moderateScale(55, 0.6),
    backgroundColor: Color.white,
    borderRadius: windowWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  map_icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth,
    marginRight: moderateScale(10, 0.6),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  image_view: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
  },
  expensesContainer: {
    width: windowWidth * 0.9,
    // backgroundColor:'green',
  },
  amountView: {
    paddingHorizontal: moderateScale(12, 0.2),
    marginTop: moderateScale(12, 0.2),
    width: '100%',
    // paddingLeft: moderateScale(12,0.2),
    justifyContent: 'space-between',
    // gap:moderateScale(300,.2),
    flexDirection: 'row',
  },
  statusImageView: {
    // backgroundColor:'black',
    alignItems: 'center',
  },
  logo: {
    tintColor: 'red',
    opacity: 1,
  },
});
