import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import ContactPassword from '../Components/ContactPassword';
import {setIsNumberVerify, setUserData} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {setUserToken} from '../Store/slices/auth';

const PhoneRegistration = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const numberVerify = useSelector(state => state.commonReducer.numberVerify);
  console.log('🚀 ~ LoginScreen ~ numberVerify ==============:', numberVerify);
  const [contact, setContact] = useState('');
  console.log('🚀 ~ PhoneRegistration ~ contact:', contact);
  const [isLoading, setIsLoading] = useState('');
  const [loading, setLoading] = useState('');

  const [contact_code, setContact_Code] = useState('');
  const [isNumberCheck, setIsNumberCheck] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const [code, setCode] = useState('');
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
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

  const loginWithNumber = async values => {
    const body = {
      phone: `+1${contact}`,
      role: 'rider',
      code: isNumberCheck && password,
    };
    console.log('🚀 ~ loginWithNumber ~ body:', body);
    const regex = /^\+1\d{10}$/; // +1 ke baad 10 digitss
    if (!regex.test(contact)) {
      Platform.OS == 'android'
        ? ToastAndroid.show('  enter a valid US number ', ToastAndroid.SHORT)
        : Alert.alert('Error', '  enter a valid US number');
    }

    const url = 'login_with_phone ';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ loginWithNumber ~ response:', response?.data);
    setIsLoading(false);
    if (response != undefined) {
      if (numberVerify) {
        dispatch(setUserData(response?.data?.user_info));
        dispatch(setUserToken({token: response?.data?.token}));
      } else {
        setIsNumberCheck(true);
      }
      // setContact('');
      //   navigation.navigate('VerifyNumber', {phoneNumber: contact , });
    }
  };

  const contactOtpVerify = async values => {
    const body = {
      // phone: '+1123456789',
      phone: `+1${contact}`,
      code: code,
    };
    console.log('🚀 ~ contactOtpVerify ~ body:', body);
    const url = 'phone/verify/check';
    setLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ contactOtpVerify ~ response:', response?.data);
    setLoading(false);
    if (response != undefined) {
      dispatch(setIsNumberVerify(true));
      setIsModalVisible(true);
      setCode('');

      // navigation.navigate('AddYourCar' ,{type  : 'connectwithnumber' } );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.header}>
        <Icon
          onPress={() => {
            !isNumberCheck ? navigation.goBack() : setIsNumberCheck(false);
          }}
          name="arrow-back"
          as={Ionicons}
          size={moderateScale(25, 0.6)}
          color={Color.black}
        />
      </View>
      {!isNumberCheck ? (
        <>
          <CustomText isBold style={styles.heading}>
            sing in
          </CustomText>
          <CustomText style={styles.sub_heading}>
            {numberVerify
              ? ' Enter your phone number and 4 digit code to log in '
              : '  Enter your phone number to log in or create a new account. We will send you a verification code to ensure the security of your account.'}
          </CustomText>
          <CustomText
            isBold
            style={[
              styles.heading2,
              {
                marginTop: moderateScale(20, 0.6),
              },
            ]}>
            your Number
          </CustomText>
          <TouchableOpacity
            disabled={true}
            activeOpacity={0.9}
            style={styles.birthday}>
            <View style={styles.inner_container}>
              <View style={styles.flagView}>
                <CustomImage
                  style={styles.flagImage}
                  source={require('../Assets/Images/flag.png')}
                />
              </View>
              <CustomText style={styles.text}>+1 |</CustomText>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="phone-pad"
              value={contact}
              onChangeText={setContact}
              maxLength={10} // optional
            />
          </TouchableOpacity>
          {numberVerify && (
            <>
              <CustomText isBold style={styles.heading2}>
                your code
              </CustomText>
              <TextInputWithTitle
                secureText={true}
                title={'add your 4 digitpassword *'}
                placeholder={'**********'}
                setText={setPassword}
                value={password}
                viewHeight={0.06}
                viewWidth={0.85}
                inputWidth={0.8}
                border={1}
                borderRadius={10}
                backgroundColor={'transparent'}
                borderColor={Color.lightGrey}
                marginTop={moderateScale(10, 0.3)}
                placeholderColor={Color.darkGray}
                titleStlye={{right: 10}}
              />
            </>
          )}
          <CustomButton
            onPress={() => {
              loginWithNumber();
            }}
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'sign in '
              )
            }
            fontSize={moderateScale(13, 0.3)}
            textColor={Color.white}
            borderWidth={0.8}
            borderColor={Color.darkBlue}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            height={windowHeight * 0.065}
            marginTop={moderateScale(30, 0.3)}
            bgColor={Color.darkBlue}
            textTransform={'capitalize'}
          />
        </>
      ) : (
        <View style={styles.sec_container}>
          <CustomText isBold style={styles.heading}>
            verify Your Account
          </CustomText>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              color: Color.gray,
              textAlign: 'center',
              marginHorizontal: moderateScale(20, 0.6),
            }}>
            {`we have sent a 6 digit code  to   \n the number +1 ${contact}`}
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
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <CustomText
                  style={[styles.cellText, isFocused && {color: Color.black}]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </CustomText>
              </View>
            )}
          />
          <CustomText style={[styles.txt3, {width: windowWidth * 0.6}]}>
            Didn’t get Code yet?
          </CustomText>
          {
            <TouchableOpacity
              disabled={timerLabel == 'Resend otp ' ? false : true}
              onPress={() => {
                timerLabel == 'Resend otp '
                  ? contactVerify()
                  : settimerLabel('ReSend in '),
                  settime(120);
              }}>
              <CustomText style={[styles.txt4]}>
                {timerLabel} {time}
              </CustomText>
            </TouchableOpacity>
          }
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'Verify'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.85}
            height={windowHeight * 0.065}
            borderRadius={30}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              contactOtpVerify();
            }}
            bgColor={Color.darkBlue}
          />
        </View>
      )}
      <ContactPassword
      contact={contact}
      setContact={setContact}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
  );
};

export default PhoneRegistration;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.6),
  },
  header: {
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(10, 0.6),
  },
  heading: {
    color: Color.black,
    marginTop: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.6),
    fontSize: moderateScale(23, 0.6),
    fontWeight: 'bold',
  },
  inner_container: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.18,
    flexDirection: 'row',
  },
  sub_heading: {
    fontSize: moderateScale(14, 0.6),
    color: Color.gray,
  },
  heading2: {
    color: Color.black,
    fontSize: moderateScale(18, 0.6),
  },
  birthday: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 0.3,
    borderColor: Color.mediumGray,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(10, 0.6),
  },
  flagView: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.08,
    marginVertical: moderateScale(8, 0.6),
  },
  flagImage: {
    height: '100%',
    width: '100%',
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
    color: Color.black,
    fontSize: moderateScale(17, 0.6),
  },
  sec_container: {
    paddingTop: windowHeight * 0.1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    width: windowWidth * 0.55,
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
});
