import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import { ActivityIndicator } from 'react-native';
import { Post } from '../Axios/AxiosInterceptorFunction';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useEffect } from 'react';
// import CardContainer from '../Components/CardContainer';
import CustomStatusBar from '../Components/CustomStatusBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const VerifyNumber = props => {
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const navigationN = useNavigation();

  //params
  const email = props?.route?.params?.email;
  const phoneNumber = props?.route?.params?.phoneNumber;
  const { user_type } = useSelector(state => state.authReducer);

  //states
  const [code, setCode] = useState('');
  console.log("🚀 ~ VerifyNumber ~ code===============:", code)
  const [isLoading, setIsLoading] = useState(false);
  console.log("🚀 ~ VerifyNumber ~ isLoading:", isLoading)
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend otp '), settime(''));
  };

  useEffect(() => {
    label();
  }, [time]);

  const sendOTP = async () => {
    const url = 'password/email';
    setIsLoading(true);
    const response = await Post(url, { email: email }, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${email}`);
    }
  };

  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    console.log(code);
    const response = await Post(url, { code: code }, apiHeader());
    setIsLoading(false);
    console.log("🚀 ~ VerifyOTP ~ response============================== :", response?.data)
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationN.navigate('ResetPassword', { email: email });
    }
  };

  useEffect(() => {
    label();
  }, [time]);

  useEffect(() => {
    if (timerLabel == 0) {
      sendOTP();
    }
  }, [timerLabel]);


  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      <TouchableOpacity
        onPress={() => {
          navigationN.goBack();
        }}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          top: moderateScale(20, 0.3),
          left: moderateScale(20, 0.3),
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.themeBlack,
          zIndex: 1,
        }}>
        <Icon
          name={'arrowleft'}
          as={AntDesign}
          size={moderateScale(22, 0.3)}
          color={Color.white}
          onPress={() => {
            navigationN.goBack();
          }}
        />
      </TouchableOpacity>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          marginTop: windowHeight * 0.13,
          alignItems: 'center',
          // justifyContent: 'center',
          width: '100%',
          height: windowHeight,
        }}>
        <CustomText style={styles.h1}>Verification</CustomText>
        <CustomText style={styles.h2}>Sent a verification code </CustomText>
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
        <CustomText style={[styles.txt3, { width: windowWidth * 0.6 }]}>
          Didn’t get Code yet?
        </CustomText>
        {
          <TouchableOpacity
            disabled={timerLabel == 'Resend otp ' ? false : true}
            onPress={() => {
              settimerLabel('ReSend in '), settime(120);
            }}>
            <CustomText style={[styles.txt4]}>
              {timerLabel} {time}
            </CustomText>
          </TouchableOpacity>
        }
        <CustomButton
          text={isLoading ? <ActivityIndicator size={'small'} color={Color.white} /> : 'Verify'}
          isBold
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.065}
          borderRadius={30}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
            VerifyOTP()
          }}
          bgColor={Color.darkBlue}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
    textTransform: 'uppercase',
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
    // alignSelf : 'center'
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(45, 0.3),
    height: moderateScale(45, 0.3),
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
    color: Color.themeBlack,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
  h1: {
    fontSize: moderateScale(22, 0.6),
    color: Color.themeBlack,
    textAlign: 'left',
    width: '80%',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  h2: {
    fontSize: moderateScale(20.6),
    color: Color.mediumGray,
    textAlign: 'left',
    width: '80%',
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'none',
  },
});

export default VerifyNumber;
