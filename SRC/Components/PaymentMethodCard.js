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
import {baseUrl} from '../Config';

const PaymentMethodCard = ({
  isuserCard,
  isButton,
  pickuplocation,
  dropofflocation,
  image,
  name,
  style,
  iscomplete,
  btn_text,
  fare,
  setPaymentMethod,
  paymentMethod,
  setIsEnabled,
  isEnabled,
}) => {
  const [isPaymentCom, setPaymentCom] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState('Card');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.card_view, style]}>
      {isuserCard ? (
        <View>
          <View style={styles.profile_view}>
            <View style={styles.image_view}>
              {/* <CustomImage style={styles.image} source={require('../Assets/Images/ridelink.png')}
              /> */}
              <CustomImage
                style={styles.image}
                source={{uri: `${baseUrl}/${image}`}}
              />
            </View>
            <CustomText
              isBold
              style={[
                styles.text,
                {
                  width: isButton ? '50%' : '80%',
                  marginLeft: moderateScale(10, 0.6),
                },
              ]}>
              {name}
            </CustomText>
            {isButton && (
              <CustomButton
                text={iscomplete ? 'Complete' : btn_text ? btn_text : 'Accept'}
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.25}
                height={windowHeight * 0.05}
                bgColor={btn_text ? Color.red : Color.green}
                textTransform={'capitalize'}
                elevation
              />
            )}
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
                  <CustomText numberOfLines={2} style={[styles.text1]}>
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
                  <CustomText numberOfLines={2} isBold style={[styles.text1]}>
                    DropOff
                  </CustomText>
                  <CustomText numberOfLines={2} style={[styles.text1]}>
                    {dropofflocation}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <>
          <CustomText style={styles.price}>
            <CustomText style={{}}>Fare : </CustomText>
            {`$${fare}`}
          </CustomText>
          <CustomText style={styles.text}>Payment Method</CustomText>
          <View style={styles.payment_view}>
            <View style={styles.payment_subview}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('Card')}
                style={styles.check_box}>
                {paymentMethod === 'Card' && <View style={styles.dot} />}
              </TouchableOpacity>
              <CustomText style={styles.sub_text}>Credit Card</CustomText>
            </View>
            <View
              style={[
                styles.payment_subview,
                {marginLeft: moderateScale(10, 0.6)},
              ]}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('Paypal')}
                style={styles.check_box}>
                {paymentMethod === 'Paypal' && <View style={styles.dot} />}
              </TouchableOpacity>
              <CustomText style={styles.sub_text}>Paypal</CustomText>
            </View>
          </View>
          <CustomText style={styles.des}>
            Automatically Accept The Nearest Drive For Your Fare
          </CustomText>
          <Switch
            trackColor={{false: '#767577', true: Color.themeBlack}}
            thumbColor={isEnabled ? '#fffff' : '#f4f3f4'}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </>
      )}
    </View>
  );
};

export default PaymentMethodCard;

const styles = StyleSheet.create({
  card_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.24,
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
    alignSelf: 'center',
  },
  price: {
    fontSize: moderateScale(12, 0.6),
    // backgroundColor :'red',
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
    // backgroundColor :'green' ,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    // backgroundColor :'red'
  },
  profile_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingBottom: moderateScale(10, 0.6),
    borderBottomColor: Color.lightGrey,
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    marginTop: moderateScale(12, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'left',
    marginLeft: moderateScale(10, 0.6),
    width: windowWidth * 0.75,
  },
  icon_view: {
    width: moderateScale(15, 0.6),
    height: moderateScale(15, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
