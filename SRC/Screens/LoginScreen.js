import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {loginSchema} from '../Constant/schema';
import {SetFCMToken, setUserToken} from '../Store/slices/auth-slice';
import {setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ ====================token:', token);
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState('');
  const {user_type} = useSelector(state => state.authReducer);
  const [device_token, setDeviceToken] = useState(null);
  console.log('🚀 ~ device_token ----------------------------:', device_token);

  const loginWithGoogle = async response1 => {
    console.log('🚀 ~ loginWithGoogle ~ body:', response1);
    const body = {...response1?.data};
    const url = 'google-login';
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ loginWithGoogle ~ response:', response?.data?.token);
    if (response != undefined) {
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserData(response?.user_info));
    }
  };

  const login = async values => {
    const body = {
      email: values.email,
      password: values.password,
      device_token: device_token,
    };
    const url = 'login';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserData(response?.data?.user_info));
    }
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then(_token => {
        console.log('🚀 Srrrrrrrrrrrrrrrrrr:', _token);
        setDeviceToken(_token);
        dispatch(SetFCMToken({fcmToken: _token}));
      })
      .catch(e => console.log('token error', e));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <ScrollView
        scrollEnabled={false}
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(90, 0.6),
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: windowHeight * 0.1,
            width: windowHeight * 0.2,
            marginTop: windowHeight * 0.04,
          }}>
          <CustomImage
            resizeMode="contain"
            // source={require('../Assets/Images/logo.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <CustomText isBold style={styles.text}>
          Sign in
        </CustomText>
        <View style={[styles.feild_container]}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={login}>
            {({handleChange, handleSubmit, values, errors, touched}) => {
              return (
                <>
                  <TextInputWithTitle
                    title={'email Id *'}
                    titleText={'Username'}
                    placeholder={'Email'}
                    setText={handleChange('email')}
                    value={values.email}
                    viewHeight={0.055}
                    viewWidth={0.82}
                    inputWidth={0.8}
                    border={1}
                    fontSize={moderateScale(10, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.lightGrey}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.darkGray}
                    titleStlye={{right: 10}}
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
                  <TextInputWithTitle
                    secureText={true}
                    title={'password *'}
                    placeholder={'**********'}
                    setText={handleChange('password')}
                    value={values.password}
                    viewHeight={0.055}
                    viewWidth={0.82}
                    inputWidth={0.8}
                    border={1}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.lightGrey}
                    marginTop={moderateScale(10, 0.3)}
                    // color={Color.white}
                    placeholderColor={Color.darkGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.password && errors.password && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.password}
                    </CustomText>
                  )}
                  <CustomText
                    onPress={() => {
                      navigation.navigate('VerifyEmail');
                    }}
                    style={styles.forgotpassword}>
                    Forgot password ?
                  </CustomText>
                  <View style={{marginTop: moderateScale(10, 0.6)}} />
                  <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator size={'small'} color={Color.white} />
                      ) : (
                        'sign in '
                      )
                    }
                    fontSize={moderateScale(15, 0.3)}
                    textColor={Color.white}
                    borderWidth={0}
                    borderColor={Color.white}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.075}
                    bgColor={Color.darkBlue}
                    textTransform={'capitalize'}
                    elevation={true}
                    onPress={handleSubmit}
                  />
                </>
              );
            }}
          </Formik>
        </View>
        <View style={styles.button_container}>
          <CustomText style={styles.soc_text}>
            or connecting using social account
          </CustomText>
          <CustomButton
            onPress={() => {
              setLoginMethod('Google');

              GoogleSignin.configure({
                offlineAccess: true,
                webClientId:
                  '679685403786-posjs7qgk9l5n3f4c13ni6soaf9dv0bb.apps.googleusercontent.com',
                // androidClientId :'308425731760-d3vg1qt7htafihdc77f2bgcvnp74old0.apps.googleusercontent.com',
                // webClientId:'256104968520-jh3nmrqlqf4df43156b7upehat6og4o7.apps.googleusercontent.com',
                // webClientId : '308425731760-757gotl6fio8ume97da60jgbsd5hc2oc.apps.googleusercontent.com'
                // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
              });

              GoogleSignin.hasPlayServices()
                .then(hasPlayService => {
                  console.log(
                    '========================== << < << ',
                    hasPlayService,
                  );
                  if (hasPlayService) {
                    GoogleSignin.signIn()
                      .then(userInfo => {
                        console.log(
                          'helllllllllllooooooooooooooooo',
                          JSON.stringify(userInfo, null, 2),
                        );
                        loginWithGoogle(userInfo);
                      })
                      .catch(e => {
                        console.log(
                          'ERROR IS=============: ' + JSON.stringify(e.message),
                        );
                      });
                  }
                })
                .catch(e => {
                  console.log('ERROR IS: ' + JSON.stringify(e, null, 2));
                });
            }}
            text={'connect with google'}
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderWidth={1.5}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            height={windowHeight * 0.065}
            bgColor={Color.darkBlue}
            textTransform={'capitalize'}
          />
          <CustomButton
            onPress={() => {
              // onPhoneNumberPressed();
            }}
            text={'connect with number'}
            fontSize={moderateScale(13, 0.3)}
            textColor={Color.themeBlack}
            borderWidth={0.8}
            borderColor={Color.black}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            height={windowHeight * 0.065}
            marginTop={moderateScale(10, 0.3)}
            bgColor={Color.white}
            textTransform={'capitalize'}
          />
        </View>
        <CustomText style={styles.do_text}>
          Don’t have an account?
          <CustomText
            onPress={() => {
              navigation.navigate('Signup');
            }}
            isBold
            style={styles.Sign_text}>
            Sign Up
          </CustomText>
        </CustomText>

        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(24, 0.6),
    color: Color.themeBlack,
    paddingVertical: moderateScale(10, 0.6),
    paddingTop: windowHeight * 0.02,
  },
  input_container: {
    borderWidth: 1,
    borderColor: Color.mediumGray,
    borderRadius: 20,
    height: windowHeight * 0.4,
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingTop: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  feild_container: {
    borderWidth: 0.5,
    borderColor: '#28272369',
    borderRadius: 20,
    height: windowHeight * 0.38,
    width: windowWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 22,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  forgotpassword: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
    textAlign: 'right',
    width: '95%',
    paddingVertical: moderateScale(4, 0.6),
    fontWeight: '700',
  },
  button_container: {
    paddingTop: windowHeight * 0.08,
  },
  soc_text: {
    fontSize: moderateScale(8, 6),
    paddingVertical: moderateScale(8, 0.6),
    textAlign: 'center',
    letterSpacing: 0.7,
    fontWeight: '700',
  },
  do_text: {
    paddingVertical: moderateScale(35, 0.6),
    textTransform: 'none',
    letterSpacing: 0.5,
    fontSize: moderateScale(12, 0.6),
  },
  Sign_text: {
    color: Color.themeBlack,
    paddingRight: moderateScale(5, 0.6),
    fontSize: moderateScale(12, 0.6),
  },
});

export default LoginScreen;
