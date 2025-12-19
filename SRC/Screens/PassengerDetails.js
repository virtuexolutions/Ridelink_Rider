import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import PaymentMethodCard from '../Components/PaymentMethodCard';
import { baseUrl } from '../Config';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const PassengerDetails = ({ route }) => {
  const { type, data, ride_status, fromdelivery, currentPosition } = route.params;
  console.log("🚀 ~ PassengerDetails ~ type:", type)

  const token = useSelector(state => state.authReducer.token)
  const rider_arrived_time = route?.params?.rider_arrived_time;

  const isFocused = useIsFocused();

  const [selectedData, setSelectedData] = useState('pickup');
  const [isLoading, setIsLoading] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');

  const amount = Number(data?.amount) || 0;

  const formattedAmount = '$ ' + (data?.amount ? Number(data.amount).toFixed(2) : '0.00');

  const rideUpdate = async status => {
    const url = `auth/rider/ride_update/${data?.ride_id}`;
    const body = {
      status: status,
      lat: currentPosition?.latitude,
      lng: currentPosition?.longitude,
      rider_arrived_time: rider_arrived_time,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigationService.navigate('RideScreen', {
        data: data,
        type: 'details',
        rider_arrived_time: rider_arrived_time,
        ride_status: updatedStatus,
      });

      setUpdatedStatus(response?.data?.ride_info?.status);
    }
  };

  return (
    <SafeAreaView style={styles.safearea_view}>
      <Header
        title={
          type === 'passangerIdentity'
            ? 'Confirm Passenger Identity'
            : 'Passenger Details'
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={styles.main_view}>
        {type == 'delivery' ? (
          <>
            <View style={styles.btn_row}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedData('pickup');
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      selectedData == 'pickup'
                        ? Color.darkBlue
                        : Color.mediumGray,
                  },
                ]}>
                <CustomText style={styles.btn_text}> pickup </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedData('dropoff location');
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      selectedData == 'dropoff location'
                        ? Color.darkBlue
                        : Color.mediumGray,
                  },
                ]}>
                <CustomText
                  style={[
                    styles.btn_text,
                    {
                      color: Color.white,
                    },
                  ]}>
                  dropoff location
                </CustomText>
              </TouchableOpacity>
            </View>

            {selectedData && (
              <View
                style={[
                  styles.detail_con,
                  {
                    height:
                      selectedData == 'pickup'
                        ? windowHeight * 0.55
                        : windowHeight * 0.4,
                  },
                ]}>
                <CustomText isBold style={styles.txt}>
                  {selectedData == 'pickup'
                    ? 'pickup location Details'
                    : 'dropoff location Details '}
                </CustomText>
                <View style={styles.con}>
                  <View style={styles.row_con1}>
                    <Icon
                      style={styles.icon_con}
                      name="battery-charging"
                      as={MaterialCommunityIcons}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                    <CustomText
                      style={{
                        fontSize: moderateScale(11, 0.6),
                      }}>
                      {selectedData == 'pickup'
                        ? 'pickup location'
                        : 'dropoff location'}
                    </CustomText>
                  </View>
                  <CustomText
                    style={{
                      marginHorizontal: moderateScale(8, 0.6),
                      width: '100%',
                      fontSize: moderateScale(11, 0.6),
                    }}>
                    {selectedData == 'pickup'
                      ? data?.location_from
                      : data?.location_to}
                  </CustomText>

                  <View style={styles.row_con}>
                    <Icon
                      style={styles.row_icon}
                      name="enter-outline"
                      as={Ionicons}
                      size={moderateScale(13, 0.6)}
                      color={Color.black}
                    />

                    <CustomText numberOfLines={2} style={styles.key}>
                      entrance :
                    </CustomText>
                    <CustomText style={styles.value}>
                      {selectedData == 'pickup'
                        ? data?.pickup_entrance
                        : data?.destination_entrance}
                    </CustomText>
                  </View>

                  <View style={styles.row_con}>
                    <Icon
                      style={styles.row_icon}
                      name="floor-plan"
                      as={MaterialCommunityIcons}
                      size={moderateScale(15, 0.6)}
                      color={Color.black}
                    />

                    <CustomText style={styles.key}>floor :</CustomText>
                    <CustomText numberOfLines={2} style={styles.value}>
                      {selectedData == 'pickup'
                        ? data?.pickup_floor
                        : data?.destination_floor}
                    </CustomText>
                  </View>
                  <View style={styles.row_con}>
                    <Icon
                      style={styles.row_icon}
                      name="door-open"
                      as={FontAwesome5}
                      size={moderateScale(12, 0.6)}
                      color={Color.black}
                    />

                    <CustomText style={styles.key}>door phone :</CustomText>
                    <CustomText numberOfLines={2} style={styles.value}>
                      {selectedData == 'pickup'
                        ? data?.pickup_door_phone
                        : data?.destination_door_phone}
                    </CustomText>
                  </View>
                  <View style={styles.row_con}>
                    <Icon
                      style={styles.row_icon}
                      name="call"
                      as={Ionicons}
                      size={moderateScale(12, 0.6)}
                      color={Color.black}
                    />
                    <CustomText style={styles.key}>contact :</CustomText>
                    <CustomText numberOfLines={2} style={styles.value}>
                      {selectedData == 'pickup'
                        ? data?.pickup_contact
                        : data?.destination_contact}
                    </CustomText>
                  </View>
                  <View style={styles.row_con}>
                    <Icon
                      style={styles.row_icon}
                      name="summarize"
                      as={MaterialIcons}
                      size={moderateScale(12, 0.6)}
                      color={Color.black}
                    />
                    <CustomText style={styles.key}>details :</CustomText>
                    <CustomText numberOfLines={2} style={styles.value}>
                      {selectedData == 'pickup'
                        ? data?.pickup_details
                        : data?.destination_details}
                    </CustomText>
                  </View>

                  {selectedData == 'pickup' && (
                    <>
                      <CustomText
                        style={[
                          styles.key,
                          {
                            paddingVertical: moderateScale(10, 0.6),
                          },
                        ]}>
                        item image :
                      </CustomText>
                      <View
                        style={{
                          height: windowHeight * 0.1,
                          width: windowWidth * 0.33,
                          borderRadius: 10,
                          overflow: 'hidden',
                        }}>
                        <CustomImage
                          style={{
                            overflow: 'hidden',
                            height: '100%',
                            width: '100%',
                          }}
                          source={
                            data?.photo
                              ? { uri: `${baseUrl}${data?.photo}` }
                              : require('../Assets/Images/parcelimage.png')
                          }
                        />
                      </View>
                    </>
                  )}
                </View>
              </View>
            )}
          </>
        ) : (
          <PaymentMethodCard
            // iscomplete={}
            isuserCard
            image={data?.user?.photo}
            name={data?.user?.name}
            pickuplocation={data?.location_from}
            dropofflocation={data?.location_to}
            isButton={type === 'fromDecline' ? true : false}
            btn_text={'Decline'}
          />
        )}
        <View style={styles.expensesContainer}>
          <View style={styles.amountView}>
            <CustomText>Trip Fare Breakdown</CustomText>
            <CustomText>{'$ ' + formattedAmount}</CustomText>
          </View>
          <View style={styles.amountView}>
            <CustomText>Subtotal</CustomText>
            <CustomText>{'$ ' + formattedAmount}</CustomText>
          </View>
          <View style={styles.amountView}>
            <CustomText>Promo Code</CustomText>
            <CustomText>{'$ ' + formattedAmount}</CustomText>
          </View>
          <View
            style={[
              styles.amountView,
              {
                marginVertical: moderateScale(25, 0.6),
                borderTopColor: 'grey',
                borderTopWidth: 0.2,
                marginTop: 15,
              },
            ]}>
            <CustomText isBold style={{ fontSize: moderateScale(24, 0.4) }}>
              Total
            </CustomText>
            <CustomText isBold style={{ fontSize: moderateScale(24, 0.4) }}>
              {'$ ' + formattedAmount}
            </CustomText>
          </View>
        </View>
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          bgColor={Color.darkBlue}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={type === 'delivery' ? 'NEXT' : 'START NAVIGATION TO PICKUP'}
          marginBottom={moderateScale(60, 0.6)}
          isBold
          onPress={() => {
            if (type === 'fromDecline' || fromdelivery) {
              navigationService.navigate('RideRequest', {
                type: 'delivery',
                data: data,
              });
            } else {
              rideUpdate('riderOntheWay');
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PassengerDetails;

const styles = StyleSheet.create({
  safearea_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(25, .6)
  },
  main_view: {
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
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
  },
  amountView: {
    paddingHorizontal: moderateScale(12, 0.2),
    marginTop: moderateScale(12, 0.2),
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detail_con: {
    marginTop: moderateScale(20, 0.6),
    width: windowWidth * 0.89,
    borderRadius: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
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
    bottom: 20,
  },
  row_con: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: Color.mediumGray,
    paddingVertical: moderateScale(8, 0.6),
    marginTop: moderateScale(6, 0.6),
  },
  key: {
    fontSize: moderateScale(11, 0.6),
    paddingRight: moderateScale(5, 0.6),
  },
  value: {
    fontSize: moderateScale(11, 0.6),
    color: Color.mediumGray,
    width: windowWidth * 0.6,
  },
  row_icon: {
    borderRadius: (windowWidth * 0.04) / 2,
    height: windowWidth * 0.04,
    width: windowWidth * 0.04,
    textAlign: 'center',
    paddingTop: moderateScale(2, 0.6),
    marginHorizontal: moderateScale(5, 0.6),
  },
  btn: {
    width: '49%',
    height: windowHeight * 0.04,
    borderRadius: moderateScale(25, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.white,
  },
  btn_row: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    width: windowWidth * 0.86,
    alignItems: 'center',
    height: windowHeight * 0.05,
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: 25,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    bottom: 20,
    marginTop: moderateScale(10, 0.6),
  },
  txt: {
    fontSize: moderateScale(11, 0.6),
    backgroundColor: Color.lightGrey,
    paddingHorizontal: moderateScale(8, 0.6),
    paddingVertical: moderateScale(2, 0.6),
    borderRadius: moderateScale(5, 0.6),
  },
  con: {
    height: windowHeight * 0.15,
    marginVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
  },
  row_con1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(4, 0.6),
  },
  icon_con: {
    backgroundColor: Color.black,
    borderRadius: (windowWidth * 0.04) / 2,
    height: windowWidth * 0.04,
    width: windowWidth * 0.04,
    textAlign: 'center',
    paddingTop: moderateScale(2, 0.6),
    marginHorizontal: moderateScale(5, 0.6),
  },
});
