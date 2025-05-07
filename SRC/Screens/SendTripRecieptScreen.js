import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';

const SendTripRecieptScreen = ({ route }) => {
  const { type, data } = route.params;
  const [selectedTime, setSelectedTime] = useState('');
  const [passsengers, setPassengers] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [timeVisible, setTimeVisible] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(24, 0.2),
        }}>
        <Header title={'Send Trip Reciept'} />
        <View style={styles.mainView}>
          <View style={styles.box}>
            <View style={styles.profileInfo}>
              <View style={styles.imageContainer}>
                <CustomImage
                  style={styles.image}
                  source={require('../Assets/Images/user1.png')}
                />
              </View>
              <CustomText style={styles.profileName}>
                Theodora J. Gardner
              </CustomText>
            </View>
            <View
              style={{
                marginTop: moderateScale(10, 0.6),
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.Circle}>
                  <Icon
                    style={{ color: Color.white }}
                    as={FontAwesome5}
                    name="car"
                    size={moderateScale(6, 0.6)}
                  />
                </View>
                <View style={{ marginLeft: moderateScale(10, 0.6) }}>
                  <CustomText style={styles.text1}>Pickup</CustomText>
                  <CustomText
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.themeBlack,
                      fontWeight: 'bold',
                    }}>
                    {data?.type == 'Pets Delivery' || 'delivery' ? data?.location_from : data?.ride_info?.location_from}
                  </CustomText>
                </View>
              </View>
              <View style={styles.vert_dots}>
                <CustomText style={styles.dots}>.........</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: moderateScale(20, 0.6),
                }}>
                <View style={styles.Circle}>
                  <Icon
                    style={{ color: Color.white }}
                    as={FontAwesome5}
                    name="car"
                    size={moderateScale(6, 0.6)}
                  />
                </View>
                <View style={{ marginLeft: moderateScale(10, 0.6) }}>
                  <CustomText style={styles.text1}>Drop Off</CustomText>
                  <CustomText style={styles.text2}>
                    {data?.type == 'Pets Delivery' || 'delivery'? data?.location_to : data?.ride_info?.location_to}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
          {type === 'fromDecline' && (
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
                    <View style={styles.image_view}>
                      <CustomImage
                        style={styles.image}
                        source={require('../Assets/Images/visa_logo.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[styles.search_conatiner, { height: windowHeight * 0.1 }]}>
                <CustomText isBold style={styles.heading}>
                  Promo Code{' '}
                </CustomText>
                <TextInput
                  placeholder="013244879498"
                  placeholderTextColor={Color.veryLightGray}
                  style={{ borderBottomWidth: 0.5 }}
                />
              </View>
            </>
          )}
          {/* <View style={styles.configView}>
            <View style={styles.configDetailView}>
              <View style={styles.configDetail}>
                <Icon
                  name="calendar"
                  as={Feather}
                  color={Color.black}
                  size={moderateScale(24, 0.3)}
                />
                <CustomText isBold>Booking Time</CustomText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeVisible(true);
                }}>
                <DropDownSingleSelect
                  array={['4:00']}
                  item={selectedTime}
                  setItem={setSelectedTime}
                  width={windowWidth * 0.3}
                  // placeholder={'Ápproval for Admittance'}
                  placeholder={'Set Your TIme'}
                  dropdownStyle={{
                    // alignSelf:'flex',
                    borderBottomWidth: 0,
                    width: windowWidth * 0.3,
                    //   backgroundColor:'black',
                    //   marginRight:moderateScale(2,0.2),
                    marginTop: 10,
                  }}
                  btnStyle={{
                    backgroundColor: '#fff',
                    height: windowHeight * 0.045,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.configDetailView}>
              <View style={styles.configDetail}>
                <Icon
                  name="user"
                  as={Feather}
                  color={Color.black}
                  size={moderateScale(24, 0.3)}
                />
                <CustomText isBold>Passengers</CustomText>
              </View>
              <DropDownSingleSelect
                array={passengersArray}
                item={passsengers}
                setItem={setPassengers}
                width={windowWidth * 0.3}
                // placeholder={'Ápproval for Admittance'}
                placeholder={'Select Passengers'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.3,
                  marginRight: moderateScale(3, 0.2),
                  marginTop: 10,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />
            </View>
            <View style={styles.configDetailView}>
              <View style={styles.configDetail}>
                <Icon
                  name="dollar-sign"
                  as={Feather}
                  color={Color.black}
                  size={moderateScale(24, 0.3)}
                />
                <CustomText isBold>Payment Method</CustomText>
              </View>
              <DropDownSingleSelect
                array={paymentArray}
                item={PaymentMethod}
                setItem={setPaymentMethod}
                width={windowWidth * 0.3}
                // placeholder={'Ápproval for Admittance'}
                placeholder={'Payment Method'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.3,
                  marginRight: moderateScale(4, 0.3),
                  marginTop: 10,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
                // extreme
              />
            </View>
          </View> */}

          <View style={styles.expensesContainer}>
            <View style={styles.amountView}>
              <CustomText>Trip Fare Breakdown</CustomText>
              <CustomText>{'$' + data?.type == 'Pets Delivery' || 'delivery' ? data?.amount : data?.ride_info?.amount}</CustomText>
            </View>
            <View style={styles.amountView}>
              <CustomText>Subtotal</CustomText>
              <CustomText>{'$' +data?.type == 'Pets Delivery' || 'delivery' ? data?.amount : data?.ride_info?.amount}</CustomText>
            </View>
            <View style={styles.amountView}>
              <CustomText>Promo Code</CustomText>
              <CustomText>{'$' + data?.type == 'Pets Delivery' || 'delivery' ? data?.amount : data?.ride_info?.amount}</CustomText>
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
                {'$' + data?.type == 'Pets Delivery' || 'delivery'? data?.amount : data?.ride_info?.amount}
              </CustomText>
              {/* Resolved Design's calculations issues */}
            </View>
          </View>
          {type === 'fromDecline' ? (
            <>
              <CustomButton
                text={'Done'}
                fontSize={moderateScale(24, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.9}
                // marginTop={moderateScale(5, 0.3)}
                height={windowHeight * 0.075}
                bgColor={'#1877F2'}
                textTransform={'capitalize'}
                elevation
                isBold
                marginTop={moderateScale(20, 0.5)}
                onPress={() => {
                  navigationService.navigate('PassengerDetails', {
                    type: 'fromDecline',
                  });
                }}
              />
            </>
          ) : (
            <>
              <View style={styles.statusImageView}>
                <CustomImage
                  resizeMode={'cover'}
                  style={styles.logo}
                  source={require('../Assets/Images/paid.png')}
                />
              </View>
              <CustomButton
                onPress={() => {
                  navigationService.navigate('Home');
                  console.log(" helllllllllllllllo ooooooooooooooooooooooooooo")
                }}
                text={'thanks '}
                fontSize={moderateScale(24, 0.3)}
                textColor={Color.white}
                borderWidth={1.5}
                borderColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.9}
                // marginTop={moderateScale(5, 0.3)}
                height={windowHeight * 0.075}
                bgColor={'#1877F2'}
                textTransform={'capitalize'}
                // elevation
                isBold
              />
              <CustomButton
                onPress={() => {
                  navigationService.navigate('Home');
                }}
                text={'Share'}
                fontSize={moderateScale(24, 0.3)}
                textColor={Color.black}
                borderWidth={1.5}
                borderColor={'#1877F2'}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.9}
                marginTop={moderateScale(10, 0.3)}
                height={windowHeight * 0.075}
                bgColor={Color.white}
                textTransform={'capitalize'}
                // elevation
                isBold
              />
            </>
          )}
        </View>
      </ScrollView>
      {/* {timeVisible ?  <RNDateTimePicker
       value={new Date()}
       
       mode="time"
       is24Hour={false}
       display="spinner"
       
       onChange={(e, time)=>{
        if(e?.type === 'set'){
          setSelectedTime(moment(time).format('hh:mm:ss A'))
          setTimeVisible(false)
         console.log('Time selected   ', moment(time).format('hh:mm:ss A'))
        }else{
          setTimeVisible(false)
        }
      }}
      /> : null} */}
    </SafeAreaView>
  );
};

export default SendTripRecieptScreen;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth,
    // height: windowHeight * 0.9,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  imageContainer: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: moderateScale(14, 0.6),
    fontWeight: 'bold',
    color: Color.themeBlack,
    width: windowWidth * 0.45,
    marginLeft: moderateScale(13, 0.6),
  },
  profileInfo: {
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5, 0.4),
    borderBottomColor: '#a5a1a1',
    borderBottomWidth: 0.2,
    paddingVertical: moderateScale(12, 0.2),
  },
  box: {
    // height: windowHeight * 0.23,
    width: windowWidth * 0.9,
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(18, 0.6),
    // paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  text1: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeBlack,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    color: Color.themeBlack,
    fontWeight: 'bold',
  },
  vert_dots: {
    transform: [{ rotate: '90deg' }],
    // position: 'absolute',
    width: windowWidth * 0.15,
    top: moderateScale(10, 0.6),
    left: moderateScale(-12, 0.6),
  },
  dots: { color: Color.black, letterSpacing: 3 },
  Circle: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: (windowWidth * 0.04) / 2,
    backgroundColor: Color.themeBlack,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  configView: {
    paddingHorizontal: moderateScale(10, 0.4),
  },
  configDetailView: {
    // width: windowWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Color.black,
    borderBottomWidth: 1,
    // backgroundColor:'red',
    paddingHorizontal: moderateScale(12, 0.3),
    paddingVertical: moderateScale(12, 0.2),
  },
  configDetail: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: moderateScale(11, 0.3),
  },
  expensesContainer: {
    width: windowWidth * 0.9,
    marginVertical: moderateScale(15, 0.6),

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
});
