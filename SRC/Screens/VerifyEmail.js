import React, { useState } from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';

import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { Formik } from 'formik';
import { forgotpasswordSchema } from '../Constant/schema';

const VerifyEmail = props => {
  const dispatch = useDispatch();
  const navigationN = useNavigation();
  const { user_type } = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async values => {
    console.log('asdhkasdjagsdjags');
    const url = 'password/email';

    setIsLoading(true);
    const response = await Post(url, { email: values.email }, apiHeader());
    setIsLoading(false);
    console.log('response data =========================>', response?.data);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${values.email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${values.email}`);
      // fromForgot
      //   ?
      navigationN.navigate('VerifyNumber', { email: values.email });
      // : navigationService.navigate('VerifyNumber', {
      //     email: `${email}`,
      //   });
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <View style={styles.main_container}>
        <TouchableOpacity
          onPress={() => {
            navigationN.goBack();
          }}
          activeOpacity={0.8}
          style={styles.back}>
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
          contentContainerStyle={styles.container}>
          <CustomText isBold style={styles.txt2}>
            Forget Password
          </CustomText>
          <CustomText style={styles.txt3}>
            Forgot your password ? don't worry, jsut take a simple step and
            create your new password!
          </CustomText>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={forgotpasswordSchema}
            onSubmit={sendOTP}>
            {({ values, handleChange, handleSubmit, touched, errors }) => {
              console.log(
                '🚀 ~ VerifyEmail ~ errors:',
                errors.email,
                '======================= uuuuuuu',
              );
              return (
                <View style={styles.text_input}>
                  <TextInputWithTitle
                    title={'Email  *'}
                    placeholder={'Email'}
                    setText={handleChange('email')}
                    value={values.email}
                    viewHeight={0.06}
                    viewWidth={0.8}
                    inputWidth={0.75}
                    border={1}
                    borderRadius={moderateScale(30, 0.3)}
                    borderColor={'#000'}
                    backgroundColor={Color.white}
                    marginTop={moderateScale(10, 0.3)}
                    color={Color.black}
                    placeholderColor={Color.veryLightGray}
                  />
                  {touched.email && errors.email && (
                    <CustomText textAlign={'left'} style={styles.schemaText}>
                      {errors.email}
                    </CustomText>
                  )}
                  <CustomButton
                    text={isLoading ? <ActivityIndicator size={'small'} color={Color.white} /> : 'submit'}
                    textColor={Color.white}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(20, 0.3)}
                    onPress={
                      handleSubmit
                      // navigationN.navigate('VerifyNumber');
                    }
                    borderRadius={30}
                    bgColor={
                      Color.darkBlue
                    }
                  />
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  main_container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'white',
  },
  txt2: {
    color: Color.black,
    fontSize: moderateScale(24, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '80%',
    marginVertical: moderateScale(15, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  back: {
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
  },
  text_input: {
    alignItems: 'center',
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    height: windowHeight * 0.25,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
    paddingHorizontal: moderateScale(30, 0.6),
  },
  container: {
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: windowHeight,
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: Color.red,
    // backgroundColor: 'green',
    alignSelf: 'flex-start',
  },
});

export default VerifyEmail;
