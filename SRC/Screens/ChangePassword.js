import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../navigationService';
import {Icon} from 'native-base';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {changePasswordSchema} from '../Constant/schema';
import {Post} from '../Axios/AxiosInterceptorFunction';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);

  const handleReset = async values => {
    const url = 'auth/change_password';
    const body = {
      current_password: values.currentPassword,
      new_password: values.newPassword,
      confirm_password: values.confirmNewPassword,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('change password uccessfully', ToastAndroid.SHORT)
        : Alert.alert('change password uccessfully');
      navigationService.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor :Color.white}}>

    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon
            name="arrowleft"
            as={AntDesign}
            style={styles.icon2}
            color={Color.white}
            size={moderateScale(20, 0.3)}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <CustomText style={styles.headert}>change password</CustomText>
      </View> */}
      
      <Header title={'Change password'} showBack={false} hideUser={true} />
      <View style={styles.main_container}>
        <Formik
          validationSchema={changePasswordSchema}
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={handleReset}>
          {({handleChange, handleSubmit, values, errors, touched}) => {
            return (
              <View style={styles.text_input}>
                <TextInputWithTitle
                  title={'current Password *'}
                  placeholder={'Current Password'}
                  setText={handleChange('currentPassword')}
                  value={values.currentPassword}
                  secureText={true}
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
                {touched.currentPassword && errors.currentPassword && (
                  <CustomText style={styles.schemaText}>
                    {errors.currentPassword}
                  </CustomText>
                )}
                <TextInputWithTitle
                  title={'new password *'}
                  titleText={'New Password'}
                  placeholder={'New Password'}
                  setText={handleChange('newPassword')}
                  value={values.newPassword}
                  secureText={true}
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
                {touched.newPassword && errors.newPassword && (
                  <CustomText style={styles.schemaText}>
                    {errors.newPassword}
                  </CustomText>
                )}
                <TextInputWithTitle
                  title={'confirm new password *'}
                  titleText={'Confirm your new password'}
                  placeholder={'Confirm your new password'}
                  setText={handleChange('confirmNewPassword')}
                  value={values.confirmNewPassword}
                  secureText={true}
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
                {touched.confirmNewPassword && errors.confirmNewPassword && (
                  <CustomText style={styles.schemaText}>
                    {errors.confirmNewPassword}
                  </CustomText>
                )}
                <CustomButton
                  onPress={handleSubmit}
                  text={
                    isLoading ? (
                      <ActivityIndicator size={'small'} color={Color.white} />
                    ) : (
                      'RESET'
                    )
                  }
                  fontSize={moderateScale(12, 0.3)}
                  textColor={Color.white}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.8}
                  height={windowHeight * 0.065}
                  marginTop={moderateScale(20, 0.3)}
                  bgColor={Color.darkBlue}
                  isBold
                  elevation
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
const styles = ScaledSheet.create({
  main_container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop : windowHeight*0.1,
    // justifyContent: 'center',
  },

  text_input: {
    alignItems: 'center',
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    height: windowHeight * 0.47,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    justifyContent: 'center',
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: 'red',
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: windowWidth,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingTop: moderateScale(40, 0.3),
  },
  headert: {
    fontSize: moderateScale(18, 0.6),
    color: Color.black,
    width: windowWidth * 0.8,
    textAlign: 'center',
    marginTop: moderateScale(8, 0.6),
  },
});
