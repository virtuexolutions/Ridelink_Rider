import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
import { Rating } from 'react-native-ratings';
import { getDistance } from 'geolib';
import { baseUrl } from '../Config';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setPhoneUserData, setUserData } from '../Store/slices/common';
import { setUserToken } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const ContactPassword = ({ setIsModalVisible, isModalVisible, contact, setContact }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  const loginWithPhone = async values => {
    const body = {
      phone: `+1${contact}`,
      // phone: '+1123456789',
      code: code,
    };
    //    return  console.log("🚀 ~ loginWithPhone ~ body:", body)
    // const regex = /^\+1\d{10}$/; // +1 ke baad 10 digits
    // if (!regex.test(contact)) {
    //   Platform.OS == 'android'
    //     ? ToastAndroid.show('  enter a valid US number ', ToastAndroid.SHORT)
    //     : Alert.alert('Error', '  enter a valid US number');
    // }

    const url = 'login_with_phone';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log(
      '🚀 ~ contactVerify ~ response=================== N:',
      response?.data?.token,
    );
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setPhoneUserData(response?.data?.user_info));
      // dispatch(setUserToken({token: 'ahjfhjkhasdjk fhkj haskdhfkj hasjkd'}));
      dispatch(setUserToken({ token: response?.data?.token }));
      setIsNumberCheck(true);
      setContact('');
      //   navigation.navigate('VerifyNumber', {phoneNumber: contact , });
    }
  };
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        aligndatas: 'center',
      }}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.main_view}>
        <View
          style={{
            paddingHorizontal: moderateScale(10, 0.6),
            paddingVertical: moderateScale(15, 0.6),
            marginTop: moderateScale(8, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(22, 0),
              color: Color.black,
              fontWeight: '700',
            }}>
            Create Your SignIn Code
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0),
              textAlign: 'center',
              color: Color.black,
              paddingVertical: moderateScale(10, 0.6),
            }}>
            {
              'Set a 4-digit code to keep your RideLink \n account secure and easy to access.'
            }
          </CustomText>
          <CodeField
            placeholder={'0'}
            ref={ref}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <CustomText
                  style={[styles.cellText, isFocused && { color: Color.black }]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </CustomText>
              </View>
            )}
          />
        </View>

        <CustomButton
          onPress={() => {
            loginWithPhone();
          }}
          fontSize={moderateScale(16, 0.6)}
          width={windowWidth * 0.6}
          height={windowHeight * 0.075}
          bgColor={Color.darkBlue}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Submit'
            )
          }
          isBold
          //   fontSize={moderateScale(98, 0.6)}
          //   style={{top: moderateScale(-35)}}
          marginBottom={moderateScale(10, 0.6)}
        />
      </View>
    </Modal>
  );
};

export default ContactPassword;

const styles = StyleSheet.create({
  main_view: {
    height: windowHeight * 0.35,
    width: windowWidth * 0.9,
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(17, 0.6),
    color: Color.black,
    paddingVertical: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  input: {
    width: windowWidth * 0.62,
    borderRadius: 8,

    fontSize: moderateScale(17, 0.6),
  },

  txt3: {
    color: Color.mediumGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '95%',
    marginTop: moderateScale(10, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.themeBlack,
    fontSize: moderateScale(13, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    fontWeight: '600',
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.65,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(55, 0.3),
    height: moderateScale(55, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.themeBlack,
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
  },
  focusCell: {
    borderColor: Color.themeBlack,
    borderWidth: 1,
  },
  cellText: {
    color: Color.black,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
});
