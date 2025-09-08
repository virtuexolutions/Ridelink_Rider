import messaging from '@react-native-firebase/messaging';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {loginSchema} from '../Constant/schema';
import {SetFCMToken, setUserToken} from '../Store/slices/auth-slice';
import {setIsSiginWithGoogle, setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ContactPassword from '../Components/ContactPassword';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log(
    '🚀 ~ ~ssssssssssssssssssss userData: ===================',
    userData,
  );
  const numberVerify = useSelector(state => state.commonReducer.numberVerify);
  console.log('🚀 ~ LoginScreen ~ numberVerify:', numberVerify);

  const isSiginWithGoogle = useSelector(
    state => state.commonReducer.isSiginWithGoogle,
  );
  console.log('🚀 ~ isSiginWithGoogl ===============>e:', isSiginWithGoogle);

  const [isLoading, setIsLoading] = useState(false);
  console.log('🚀 ~ LoginScreen ~ isLoading:', isLoading);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState('');
  const [device_token, setDeviceToken] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loginWithGoogle = async response1 => {
    const body = {...response1?.data, role: 'rider'};

    const url = 'google-login';
    setGoogleLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ loginWithGoogle ~ response:', response?.data);
    setGoogleLoading(false);
    if (response != undefined) {
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setIsSiginWithGoogle(true));
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '926398445960-6f98tf5ga88hlm4qna4m847eguv4m8vk.apps.googleusercontent.com', // <-- WEB CLIENT ID
      // forceCodeForRefreshToken: true, // optional
    });
  }, []);

  const handleGoogleSignIn = async () => {
    if (googleLoading) return; // prevent double tap

    try {
      setGoogleLoading(true);

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // (optional) stuck state me helpful
      // await GoogleSignin.signOut();
      // await GoogleSignin.revokeAccess();

      const userInfo = await GoogleSignin.signIn();
      console.log(
        'userInfo ===> ================== ',
        JSON.stringify(userInfo, null, 2),
      );

      // TODO: yahan apni API call
      await loginWithGoogle(userInfo);
    } catch (e) {
      console.log('🚀 ~ handleGoogleSignIn ~ e:=====================', e);
      // Friendly error mapping
      if (e.code === statusCodes.IN_PROGRESS) {
        // ye wahi error tha
        Platform.OS === 'android' &&
          ToastAndroid.show('Sign-in already in progress', ToastAndroid.SHORT);
      } else if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        Platform.OS === 'android' &&
          ToastAndroid.show('Sign-in cancelled', ToastAndroid.SHORT);
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Platform.OS === 'android' &&
          ToastAndroid.show('Update Google Play services', ToastAndroid.SHORT);
      } else {
        Platform.OS === 'android' &&
          ToastAndroid.show(String(e.message || e), ToastAndroid.SHORT);
      }
      console.log('Google Sign-In Error ==> ', e);
    } finally {
      setGoogleLoading(false);
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

              handleGoogleSignIn();
            }}
            text={
              googleLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : isSiginWithGoogle ? (
                `sign in with ${userData?.name}`
              ) : (
                'connect with google'
              )
            }
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
              navigation.navigate('PhoneRegistration');
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
      {numberVerify == true && (
        <ContactPassword
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(24, 0.6),
    color: Color.themeBlack,
    paddingVertical: moderateScale(10, 0.6),
    paddingTop: windowHeight * 0.1,
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
