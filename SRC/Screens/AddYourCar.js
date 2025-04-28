import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {Icon, Toast} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {addYourCarSchema, loginSchema} from '../Constant/schema';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import DropDownSingleSelect from './DropDownSingleSelect';
import {Post} from '../Axios/AxiosInterceptorFunction';
import Header from '../Components/Header';
import {setUserData} from '../Store/slices/common';
import {setUserToken} from '../Store/slices/auth';
import navigationService from '../navigationService';

const AddYourCar = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [cartype, setCarType] = useState('');
  const [image, setImage] = useState({});
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState('');
  const carType = ['Mini', 'Standered Ac', 'Luxury Ac'];

  const onSubmit = async values => {
    const formData = new FormData();

    const body = {
      name: values.carName,
      number: values.carNumber,
      seats: values.carSeats,
      category: cartype,
      model: values.carModel,
      status: 'active',
      type: 'hjhjhjk',
    };
    for (let key in body) {
      if (key == '') {
        Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : alert(`${key} is required`);
      }
      formData.append(key, body[key]);
    }
    formData.append('image', image);
    const url = 'auth/rider/car_update';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Your car is Updated', ToastAndroid.SHORT)
        : Alert.alert('Your car is Updated');
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
      navigationService.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <ScrollView
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: Color.white,
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        {token && <Header title={'Add Your vehicle'} showBack hideUser />}
        {token ? (
          <></>
        ) : (
          <CustomText isBold style={styles.text}>
            Update Your Vehicle
          </CustomText>
        )}
        <View style={token ? styles.container_field : styles.feild_container}>
          <Formik
            initialValues={{
              carModel: '',
              carNumber: '',
              carSeats: '',
              category: '',
            }}
            onSubmit={onSubmit}
            validationSchema={addYourCarSchema}>
            {({handleChange, handleSubmit, values, errors, touched}) => {
              return (
                <>
                  <TextInputWithTitle
                    title={'Car Name'}
                    placeholder={'enter your car name here'}
                    setText={handleChange('carName')}
                    value={values.carName}
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
                  {touched.carName && errors.carName && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.carName}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'Car Model'}
                    placeholder={'enter your car model here'}
                    setText={handleChange('carModel')}
                    value={values.carModel}
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
                  {touched.carModel && errors.carModel && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.carModel}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'car number'}
                    placeholder={'enter your car number'}
                    setText={handleChange('carNumber')}
                    value={values.carNumber}
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
                  {touched.carNumber && errors.carNumber && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.carNumber}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'Car Seats'}
                    placeholder={'enter your car seats here'}
                    setText={handleChange('carSeats')}
                    value={values.carSeats}
                    viewHeight={0.055}
                    viewWidth={0.82}
                    inputWidth={0.8}
                    border={1}
                    fontSize={moderateScale(9, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.lightGrey}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.carSeats && errors.carSeats && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.carSeats}
                    </CustomText>
                  )}
                  <View style={{marginTop: moderateScale(10, 0.6)}} />
                  <CustomText
                    style={{
                      color: Color.black,
                      fontSize: moderateScale(12, 0.3),
                      textAlign: 'left',
                      width: windowWidth * 0.75,
                    }}>
                    Select car Category
                  </CustomText>
                  <DropDownSingleSelect
                    array={carType}
                    item={cartype}
                    setItem={setCarType}
                    width={windowWidth * 0.8}
                    placeholder={'Select Car Category'}
                    dropdownStyle={{
                      // backgroundColor: 'red',
                      borderWidth: 0.5,
                      borderColor: Color.lightGrey,
                      width: windowWidth * 0.85,
                      // marginRight: moderateScale(3, 0.2),
                      // marginTop: 10,
                      borderRadius: 25,
                      // alignSelf: 'center',
                      marginBottom: moderateScale(20, 0.6),
                      height: windowHeight * 0.06,
                    }}
                    btnStyle={{
                      height: windowHeight * 0.06,
                      borderWidth: 0.1,
                      alignSelf: 'center',
                    }}
                  />
                  <CustomText
                    style={{
                      color: Color.black,
                      fontSize: moderateScale(12, 0.3),
                      textAlign: 'left',
                      width: windowWidth * 0.75,
                    }}>
                    Add Car Image
                  </CustomText>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setImagePicker(true);
                    }}
                    style={styles.image}>
                    {Object.keys(image).length > 0 ? (
                      <CustomImage
                        source={{uri: image?.uri}}
                        resizeMode="cover"
                        style={{
                          height: windowHeight * 0.14,
                          width: windowHeight * 0.12,
                          borderRadius: moderateScale(15, 0.6),
                        }}
                      />
                    ) : (
                      <Icon
                        name="plus"
                        as={FontAwesome}
                        style={styles.icon2}
                        color={Color.darkGray}
                        size={moderateScale(20, 0.3)}
                        onPress={() => {
                          setImagePicker(true);
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      marginVertical: moderateScale(10, 0.6),
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(12, 0.6),
                        color: Color.red,
                        fontWeight: '500',
                      }}>
                      Instructions :
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        color: Color.grey,
                      }}>
                      Please add valid Imformation about your Car add front and
                      clear image.
                    </CustomText>
                  </View>
                  <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator size={'small'} color={Color.white} />
                      ) : (
                        'Submit'
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
    marginTop: moderateScale(20, 0.6),
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
  container_field: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    marginBottom: moderateScale(10, 0.6),
  },
  feild_container: {
    borderWidth: 0.5,
    borderColor: '#28272369',
    borderRadius: 20,
    width: windowWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: moderateScale(10, 0.6),
    marginBottom: moderateScale(10, 0.6),
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
  fields_box: {
    borderWidth: 0.3,
    borderColor: '#28272369',
    borderRadius: 20,
    height: windowHeight * 0.5,
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
    elevation: 8,
  },
  image: {
    marginTop: moderateScale(10, 0.3),
    height: windowHeight * 0.14,
    width: windowHeight * 0.12,
    alignSelf: 'flex-start',
    borderRadius: moderateScale(15, 0.6),
    backgroundColor: Color.lightGrey,
    marginBottom: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    bottom: -2,
    right: 5,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default AddYourCar;
