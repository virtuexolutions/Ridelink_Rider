import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountryPicker from 'react-native-country-picker-modal';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import SearchLocationModal from '../Components/SearchLocationModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {SignupSchema} from '../Constant/schema';
import {setUserToken} from '../Store/slices/auth';
import {setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const Signup = () => {
  const dispatch = useDispatch();

  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const navigation = useNavigation();
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const {user_type} = useSelector(state => state.authReducer);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isContactVerified, setIsContactVerified] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [timerLabel, settimerLabel] = useState('Resend In');
  const CELL_COUNT = 6;
  const [code, setCode] = useState('');
  const [contact_code, setContact_Code] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');
  const [ismail, setIsmail] = useState(false);
  const [isnumber, setIsNumber] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState({});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  if (time > 0) {
    ismail &&
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

  const onPressregister = async values => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: number,
      agree_terms_condition: values.termsAccepted,
      confirm_password: values.confirmPassword,
      role: 'rider',
      title: 'Driver',
      city: city,
      country: country?.name,
      state: state,
      zip_code: zipCode,
      address: address?.name,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert('error', `${key} field is empty`);
      }
    }
    if (!usPhoneRegex.test(`+1 ${number}`)) {
      Platform.OS === 'android'
        ? ToastAndroid.show(
            'Please enter a valid US phone number',
            ToastAndroid.SHORT,
          )
        : Alert.alert('error', 'Please enter a valid US phone number');
      // return null
    }
    const url = 'register';
    // setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ Signup ~ response:', response?.data);
    // setIsLoading(false);
    if (response != undefined) {
      navigation.navigate('AddYourCar');
      Platform.OS == 'android'
        ? ToastAndroid.show('Sign up successfully', ToastAndroid.SHORT)
        : Alert.alert('Sign up successfully');
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
    }
  };

  const emailVerify = async values => {
    const body = {
      email: values.email,
    };
    const url = 'email/verify/send';
    setloading(true);
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ Signup ~ response:', response?.data);
    setloading(false);
    if (response != undefined) {
      setIsmail(true);
    }
  };
  const VerifyOtp = async values => {
    const body = {
      email: values.email,
      code: code,
    };
    const url = 'email/verify/check';
    setloading(true);
    const response = await Post(url, body, apiHeader());
    setloading(false);
    if (response != undefined) {
      setCode('');
      setIsEmailVerified(true);
      setIsmail(false);
    }
  };

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const contactVerify = async values => {
    const body = {
      phone: `+1${number}`,
    };

    const url = 'phone/verify/send';
    setIsLoading(true)
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ Signup ~ response:', response?.data);
    setIsLoading(false)
    if (response != undefined) {
      setIsNumber(true);
    }
  };

  const contactOtpVerify = async values => {
    const body = {
      phone: `+1${number}`,
      code: contact_code,
    };
    const url = 'phone/verify/check';
    // setloading(true)
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ Signup ~ response:', response?.data);
    // setloading(false)
    if (response != undefined) {
      setContact_Code('');
      setIsContactVerified(true);
      setIsNumber(false);
    }
  };

  const usPhoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

  const validateAndFormatUSPhone = phoneNumber => {
    // if (!usPhoneRegex.test(phoneNumber)) {
    //   const errorMessage = 'Please enter a valid US phone number'
    //   // Platform.OS === 'android'
    //   //   ? ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
    //   //   : Alert.alert(errorMessage);
    //   // return null; // ❌ Don't update field
    // }

    const phoneNumberRegex = /^(\d{3})[-]?(\d{3})[-]?(\d{4})$/;
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`; // e.g., "571 561 8937"
    }

    return phoneNumber;
  };
  useEffect(() => {
    if (number && number.length < 12) {
      const formattedNumber = validateAndFormatUSPhone(number);
      setNumber(formattedNumber);
    }
  }, [number]);
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: 'white',
          paddingBottom: moderateScale(90, 0.6),
        }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <CustomText isBold style={styles.text}>
          Sign up
        </CustomText>
        <Formik
          initialValues={{
            name: '',
            email: '',
            contact: 0,
            password: '',
            termsAccepted: false,
            state: '',
            city: '',
            zipCode: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={onPressregister}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => {
            return (
              <View style={[styles.fields_box]}>
                <TextInputWithTitle
                  title={'name *'}
                  placeholder={'James W. Brown'}
                  setText={handleChange('name')}
                  value={values.name}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                {touched.name && errors.name && (
                  <CustomText style={styles.schemaText}>
                    {errors.name}
                  </CustomText>
                )}
                <TextInputWithTitle
                  title={'email Id *'}
                  titleText={'Username'}
                  placeholder={'Email '}
                  setText={handleChange('email')}
                  value={values.email}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                  disable={ismail || isEmailVerified}
                />
                {touched.email && errors.email && (
                  <CustomText
                    textAlign={'left'}
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.red,
                      alignSelf: 'flex-start',
                    }}>
                    {errors.email}
                  </CustomText>
                )}

                {values.email != '' && !isEmailVerified ? (
                  <CustomText
                    disabled={ismail}
                    onPress={() => {
                      emailVerify(values);
                    }}
                    style={[
                      styles.verify_email,
                      {
                        color: ismail ? Color.darkGray : Color.darkBlue,
                      },
                    ]}>
                    verify now
                  </CustomText>
                ) : (
                  isEmailVerified && (
                    <CustomText style={styles.email_txt}>
                      email verified successfully
                    </CustomText>
                  )
                )}
                {ismail && (
                  <View style={styles.email_con}>
                    <CodeField
                      placeholder={'0'}
                      ref={ref}
                      value={code}
                      onChangeText={setCode}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      onComp
                      renderCell={({index, symbol, isFocused}) => (
                        <View
                          onLayout={getCellOnLayoutHandler(index)}
                          key={index}
                          style={[
                            styles.cellRoot,
                            isFocused && styles.focusCell,
                          ]}>
                          <CustomText
                            style={[
                              styles.cellText,
                              isFocused && {color: Color.white},
                            ]}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </CustomText>
                        </View>
                      )}
                    />
                    <View style={styles.row_con}>
                      <CustomText
                        style={[styles.txt3, {width: windowWidth * 0.6}]}>
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
                    </View>
                    <CustomButton
                      onPress={() => {
                        VerifyOtp(values);
                      }}
                      text={
                        loading ? (
                          <ActivityIndicator
                            color={Color.white}
                            size={'small'}
                          />
                        ) : (
                          'submit'
                        )
                      }
                      fontSize={moderateScale(14, 0.3)}
                      textColor={Color.white}
                      borderWidth={1.5}
                      borderColor={Color.darkBlue}
                      borderRadius={moderateScale(30, 0.3)}
                      width={windowWidth * 0.4}
                      marginTop={moderateScale(10, 0.3)}
                      height={windowHeight * 0.04}
                      bgColor={Color.darkBlue}
                      textTransform={'capitalize'}
                      elevation
                    />
                  </View>
                )}
                <CustomText
                  style={[
                    {
                      color: Color.themeBlack,
                      fontSize: moderateScale(12, 0.6),
                      marginBottom: moderateScale(5, 0.3),
                      marginTop: moderateScale(10, 0.3),
                      textAlign: 'left',
                      width: windowWidth * 0.75,
                    },
                  ]}>
                  Country *
                </CustomText>
                <TouchableOpacity
                  disabled={true}
                  activeOpacity={0.9}
                  onPress={() => {
                    setShowNumberModal(true);
                  }}
                  style={[styles.birthday, {justifyContent: 'flex-start'}]}>
                  <CountryPicker
                    {...{
                      countryCode,
                      // withCallingCode,
                      onSelect,
                      // withFilter,
                    }}
                    visible={showNumberModal}
                    onClose={() => {
                      setShowNumberModal(false);
                    }}
                  />

                  {country && (
                    <CustomText
                      style={{
                        fontSize: moderateScale(15, 0.6),
                        color: '#5E5E5E',
                      }}>
                      {countryCode}
                    </CustomText>
                  )}

                  <Icon
                    name={'angle-down'}
                    as={FontAwesome}
                    size={moderateScale(20, 0.6)}
                    color={Color.themeColor}
                    // onPress={() => {
                    //   setShowNumberModal(true);
                    // }}
                    style={{
                      position: 'absolute',
                      right: moderateScale(5, 0.3),
                    }}
                  />
                </TouchableOpacity>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.black,
                    alignSelf: 'flex-start',
                    paddingHorizontal: moderateScale(3, 0.6),
                    paddingTop: moderateScale(10, 0.6),
                  }}>
                  address *
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(true);
                  }}
                  style={styles.address_btn}>
                  <CustomText
                    numberOfLines={1}
                    style={{
                      fontSize: moderateScale(13, 0.6),
                      color: Color.mediumGray,
                    }}>
                    {address?.name ? address?.name : 'Address'}
                  </CustomText>
                </TouchableOpacity>
                <TextInputWithTitle
                  disable={true}
                  title={'State * '}
                  titleText={'State'}
                  placeholder={'State'}
                  // setText={handleChange('state')}
                  value={state}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                <TextInputWithTitle
                  disable={true}
                  title={'city * '}
                  titleText={'city'}
                  placeholder={'City'}
                  // setText={handleChange('city')}
                  value={city}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                <TextInputWithTitle
                  disable={true}
                  title={'Zip Code * '}
                  titleText={'Zip Code'}
                  placeholder={'Zip Code'}
                  // setText={handleChange('zipCode')}
                  value={zipCode}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />

                <TextInputWithTitle
                  disable={isnumber || isContactVerified}
                  title={'contact * '}
                  titleText={'Username'}
                  placeholder={'contact'}
                  setText={setNumber}
                  value={number}
                  // setText={handleChange('contact')}
                  // value={values.contact}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                  keyboardType={'numeric'}
                  maxLength={12}
                  // disable={isnumber}
                />
                {/* {touched.contact && errors.contact && (
                  <CustomText style={styles.schemaText}>
                    {errors.contact}
                  </CustomText>
                )} */}
                {number != '' && !isContactVerified ? (
                  <CustomText
                    disable={isnumber}
                    onPress={() => {
                      contactVerify(values);
                    }}
                    style={{
                      fontSize: moderateScale(11, 0.6),
                      alignSelf: 'flex-end',
                      paddingTop: moderateScale(5, 0.6),
                      color: isnumber ? Color.darkGray : Color.darkBlue,
                    }}>
                    verify now
                  </CustomText>
                ) : (
                  isContactVerified && (
                    <CustomText
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        alignSelf: 'flex-end',
                        paddingTop: moderateScale(5, 0.6),
                        color: Color.darkBlue,
                      }}>
                      phone number is verified
                    </CustomText>
                  )
                )}

                {isnumber && (
                  <View
                    style={{
                      width: windowWidth * 0.8,
                      backgroundColor: Color.white,
                      borderRadius: 10,
                      padding: moderateScale(10, 0.6),
                      marginVertical: moderateScale(5, 0.6),
                      borderWidth: 1,
                      borderColor: Color.darkBlue,
                    }}>
                    <CodeField
                      placeholder={'0'}
                      ref={ref}
                      value={contact_code}
                      onChangeText={setContact_Code}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({index, symbol, isFocused}) => (
                        <View
                          onLayout={getCellOnLayoutHandler(index)}
                          key={index}
                          style={[
                            styles.cellRoot,
                            isFocused && styles.focusCell,
                          ]}>
                          <CustomText
                            style={[
                              styles.cellText,
                              isFocused && {color: Color.white},
                            ]}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </CustomText>
                        </View>
                      )}
                    />
                    <View style={styles.row_con}>
                      <CustomText
                        style={[styles.txt3, {width: windowWidth * 0.6}]}>
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
                    </View>
                    <CustomButton
                      onPress={() => {
                        contactOtpVerify(values);
                      }}
                      text={
                        loading ? (
                          <ActivityIndicator
                            color={Color.white}
                            size={'small'}
                          />
                        ) : (
                          'submit'
                        )
                      }
                      fontSize={moderateScale(14, 0.3)}
                      textColor={Color.white}
                      borderWidth={1.5}
                      borderColor={Color.darkBlue}
                      borderRadius={moderateScale(30, 0.3)}
                      width={windowWidth * 0.4}
                      marginTop={moderateScale(10, 0.3)}
                      height={windowHeight * 0.04}
                      bgColor={Color.darkBlue}
                      textTransform={'capitalize'}
                      elevation
                    />
                  </View>
                )}
                <TextInputWithTitle
                  showPassword
                  title={'password *'}
                  placeholder={'password'}
                  setText={handleChange('password')}
                  value={values.password}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  secureText={true}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                {touched.password && errors.password && (
                  <CustomText style={styles.schemaText}>
                    {errors.password}
                  </CustomText>
                )}
                <TextInputWithTitle
                  showPassword
                  title={'confirm Password *'}
                  placeholder={'Confirm Password'}
                  setText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  viewHeight={0.055}
                  viewWidth={0.82}
                  inputWidth={0.8}
                  border={1}
                  secureText={true}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.lightGrey}
                  marginTop={moderateScale(8, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                {touched.password && errors.password && (
                  <CustomText style={styles.schemaText}>
                    {errors.password}
                  </CustomText>
                )}
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      setFieldValue('termsAccepted', !values.termsAccepted);
                    }}
                    style={styles.check_box}>
                    {values.termsAccepted && (
                      <Icon
                        as={Feather}
                        size={moderateScale(15, 0.6)}
                        color={Color.themeBlack}
                        name="check"
                      />
                    )}
                  </TouchableOpacity>
                  <CustomText style={styles.term_text}>
                    By Click You Agree To Our
                    <CustomText
                      style={{fontSize: moderateScale(11, 0.6), color: 'red'}}>
                      terms & conditions
                    </CustomText>
                    As Well As Our
                    <CustomText
                      style={{fontSize: moderateScale(11, 0.6), color: 'red'}}>
                      Privacy Policy.
                    </CustomText>
                  </CustomText>
                </View>
                {touched.termsAccepted && errors.termsAccepted && (
                  <CustomText style={styles.schemaText}>
                    {errors.termsAccepted}
                  </CustomText>
                )}
                <CustomButton
                  // disabled={!isEmailVerified}
                  disabled={!isEmailVerified && !isContactVerified}
                  onPress={handleSubmit}
                  text={
                    isLoading ? (
                      <ActivityIndicator color={Color.white} size={'small'} />
                    ) : (
                      'sign up'
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.white}
                  borderWidth={1.5}
                  borderColor={Color.darkBlue}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.8}
                  marginTop={moderateScale(10, 0.3)}
                  height={windowHeight * 0.075}
                  bgColor={Color.darkBlue}
                  textTransform={'capitalize'}
                />
              </View>
            );
          }}
        </Formik>

        <CustomText style={styles.do_text}>
          Already have an account?
          <CustomText
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
            isBold
            style={styles.Sign_text}>
            Sign in
          </CustomText>
        </CustomText>
      </ScrollView>
      <SearchLocationModal
        locationType={'address'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setUserAddress={setAddress}
        userAddress={address}
        setCity={setCity}
        setState={setState}
        setZipCode={setZipCode}
      />
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: moderateScale(22, 0.6),
    color: Color.themeBlack,
    paddingVertical: moderateScale(10, 0.6),
    marginTop: windowHeight * 0.1,
    paddingBottom: moderateScale(10, 0.6),
  },
  fields_box: {
    borderWidth: 0.3,
    borderColor: '#28272369',
    borderRadius: 20,
    paddingVertical: moderateScale(10, 0.6),
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingTop: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    paddingHorizontal: moderateScale(20, 0.6),
    elevation: 200,
  },

  row: {
    flexDirection: 'row',
    paddingVertical: moderateScale(15, 0.6),
    width: '85%',
  },
  check_box: {
    height: windowHeight * 0.02,
    width: windowWidth * 0.04,
    borderWidth: 1,
    borderColor: Color.black,
    borderRadius: 2,
    marginTop: moderateScale(2, 0.3),
  },
  do_text: {
    paddingVertical: moderateScale(35, 0.6),
    textTransform: 'none',
    letterSpacing: 1,
  },
  Sign_text: {
    color: Color.themeBlack,
    paddingRight: moderateScale(5, 0.6),
  },
  term_text: {
    paddingHorizontal: moderateScale(5, 0.6),
    fontSize: moderateScale(11, 0.6),
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: 'red',
    alignSelf: 'flex-start',
  },

  codeFieldRoot: {
    marginTop: moderateScale(10, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(40, 0.3),
    height: moderateScale(35, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.mediumGray,
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
  },
  focusCell: {
    borderColor: Color.darkBlue,
    borderWidth: 1,
  },
  cellText: {
    color: Color.black,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
  txt3: {
    color: Color.darkGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'left',
    paddingHorizontal: moderateScale(15, 0.6),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.darkGray,
    fontSize: moderateScale(12, 0.6),
    borderColor: Color.white,
    fontWeight: '600',
    paddingHorizontal: moderateScale(15, 0.6),
  },
  email_con: {
    width: windowWidth * 0.8,
    backgroundColor: Color.white,
    borderRadius: 10,
    padding: moderateScale(10, 0.6),
    marginVertical: moderateScale(5, 0.6),
    borderWidth: 1,
    borderColor: Color.darkBlue,
  },
  email_txt: {
    fontSize: moderateScale(11, 0.6),
    alignSelf: 'flex-end',
    paddingTop: moderateScale(5, 0.6),
    color: Color.darkBlue,
  },
  verify_email: {
    fontSize: moderateScale(11, 0.6),
    alignSelf: 'flex-end',
    paddingTop: moderateScale(5, 0.6),
  },
  birthday: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    borderRadius: moderateScale(30, 0.6),
    borderWidth: 0.2,
    borderColor: Color.mediumGray,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address_btn: {
    width: windowWidth * 0.8,
    borderWidth: 0.3,
    height: windowHeight * 0.055,
    borderColor: Color.mediumGray,
    marginTop: moderateScale(10, 0.6),
    borderRadius: moderateScale(30, 0.6),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
  },
});

export default Signup;
