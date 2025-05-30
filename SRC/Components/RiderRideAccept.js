import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RiderRideAccept = ({
  isuserCard,
  isButton,
  pickuplocation,
  dropofflocation,
  image,
  name,
}) => {
  const [isPaymentCom, setPaymentCom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.card_view}>
      <View>
        <View style={styles.profile_view}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.image_view}>
                <CustomImage style={styles.image} source={image} />
              </View>
              <View>
                <CustomText
                  isBold
                  style={[
                    styles.text,
                    {
                      width: isButton ? '50%' : '100%',
                      marginLeft: moderateScale(10, 0.6),
                    },
                  ]}>
                  {name}
                </CustomText>
                <CustomText
                  style={[
                    styles.text,
                    {
                      marginLeft: moderateScale(10, 0.6),
                      fontSize: moderateScale(11, 0.5),
                    },
                  ]}>
                  {'Mini Ride'}
                </CustomText>
              </View>
            </View>
            <View style={styles.seatView}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(5, 0.6),
                  }}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="battery-charging"
                      as={MaterialCommunityIcons}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <View>
                    <CustomText isBold style={[styles.text1]}>
                      PickUp
                    </CustomText>
                    <CustomText style={[styles.text1]}>
                      {pickuplocation}
                    </CustomText>
                  </View>
                </View>
                <CustomText
                  isBold
                  style={[
                    styles.text1,
                    {
                      position: 'absolute',
                      color: 'black',
                      top: 27,
                      marginLeft: moderateScale(-5, 0.6),
                      transform: [{rotate: '-90deg'}],
                    },
                  ]}>
                  -----
                </CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(10, 0.6),
                  }}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="battery-charging"
                      as={MaterialCommunityIcons}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <View>
                    <CustomText isBold style={[styles.text1]}>
                      DropOff
                    </CustomText>
                    <CustomText style={[styles.text1]}>
                      {dropofflocation}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: windowWidth * 0.25,
              height: windowHeight * 0.2,
              backgroundColor: '#d4d4d3',
              marginLeft: moderateScale(18, 0.6),
              borderRadius: moderateScale(20, 0.6),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: windowWidth * 0.12,
                height: windowHeight * 0.12,
                backgroundColor: 'red',
              }}>
              <CustomImage
                source={require('../Assets/Images/location.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
        </View>
        <View style={styles.text_view}>
          <CustomText isBold style={styles.heading}>
            Trip Fare Breakdown{' '}
          </CustomText>
          <CustomText style={styles.heading}>$ 50.25 </CustomText>
        </View>
        <View style={styles.text_view}>
          <CustomText isBold style={styles.heading}>
            SubTotal
          </CustomText>
          <CustomText style={styles.heading}>$ 50.25 </CustomText>
        </View>
        <View style={styles.text_view}>
          <CustomText isBold style={styles.heading}>
            Promo Code
          </CustomText>
          <CustomText style={styles.heading}>$ 5.25 </CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.8,
            borderBottomWidth: 0.5,
            borderBottomColor: Color.lightGrey,
            marginTop: moderateScale(10, 0.6),
          }}
        />
        <View style={styles.text_view}>
          <CustomText isBold style={{fontSize: moderateScale(14, 0.6)}}>
            Total
          </CustomText>
          <CustomText isBold style={{fontSize: moderateScale(14, 0.6)}}>
            $ 45.00
          </CustomText>
        </View>
        <CustomButton
          text={'Accept'}
          isBold
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          bgColor={Color.darkBlue}
          textTransform={'capitalize'}
          marginTop={moderateScale(10, 0.6)}
        />
        <CustomButton
          text={'Decline'}
          isBold
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.black}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          bgColor={Color.white}
          textTransform={'capitalize'}
          borderWidth={1}
          borderColor={Color.darkBlue}
          marginTop={moderateScale(7, 0.6)}
        />
      </View>
    </View>
  );
};

export default RiderRideAccept;

const styles = StyleSheet.create({
  card_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.55,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: moderateScale(15, 0.6),
  },
  price: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '700',
    width: windowWidth * 0.8,
    height: moderateScale(22, 0.6),
    borderBottomWidth: 0.5,
    borderBottomColor: Color.black,
    marginBottom: moderateScale(15, 0.6),
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    fontWeight: '600',
    color: Color.black,
  },
  payment_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: moderateScale(7, 0.6),
  },
  payment_subview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(5, 0.6),
  },
  check_box: {
    width: moderateScale(12, 0.6),
    height: moderateScale(12, 0.6),
    borderRadius: moderateScale(20, 0.6),
    borderWidth: 0.9,
    borderColor: Color.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  des: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
    marginTop: moderateScale(20, 0.6),
  },
  sub_text: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
    color: Color.black,
  },
  dot: {
    width: moderateScale(6, 0.6),
    height: moderateScale(6, 0.6),
    backgroundColor: Color.black,
    borderRadius: moderateScale(20, 0.6),
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
  profile_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    paddingBottom: moderateScale(10, 0.6),
    borderBottomColor: Color.lightGrey,
  },
  seatView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: moderateScale(12, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'left',
    marginLeft: moderateScale(10, 0.6),
  },
  icon_view: {
    width: moderateScale(15, 0.6),
    height: moderateScale(15, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_view: {
    flexDirection: 'row',
    width: windowWidth * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(7, 0.6),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
  },
});
