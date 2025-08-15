import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [username, setUserName] = useState(
    userData?.name ? userData?.name : '',
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState(userData?.email ? userData?.email : '');
  const [phone, setPhone] = useState(userData?.phone ? userData?.phone : '');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});

  const profileUpdate = async () => {
    const formData = new FormData();
    const body = {
      name: username,
      phone: phone,
    };

    for (let key in body) {
      formData?.append(key, body[key]);
    }
    if (Object.keys(image).length > 0) formData.append('photo', image);
    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token, true));
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('profile updated Successfully', ToastAndroid.SHORT)
        : alert('profile updated Successfully');
      navigation.navigate('HomeScreen');
    }
    dispatch(setUserData(response?.data?.user_info));
  };

  return (
    <SafeAreaView
      style={styles.main}
      // style={{}}
    >
      
      <Header title={'update Profile'} showBack={false} hideUser={true} />
      {/* <Header showBack={true} title={'update Profile'} /> */}

      {/* <View
        style={{
          flexDirection: 'row',
          width: windowWidth,
          backgroundColor: 'white',
          paddingHorizontal: moderateScale(10, 0.6),
          paddingTop: moderateScale(5, 0.6),
        }}>
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
        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
            color: Color.black,
            width: windowWidth * 0.8,
            textAlign: 'center',
            paddingTop: moderateScale(8, 0.6),
          }}>
          account
        </CustomText>
      </View> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}>
        <View style={styles.fields_box}>
          <View style={styles.image}>
            <CustomImage
              resizeMode="cover"
              source={
                image?.uri
                  ? {uri: image?.uri}
                  : require('../Assets/Images/user.png')
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: moderateScale((windowHeight * 0.13) / 2),
              }}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.edit}
              onPress={() => {
                setImagePicker(true);
              }}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(13, 0.3)}
                onPress={() => {
                  setImagePicker(true);
                }}
              />
            </TouchableOpacity>
          </View>
          <TextInputWithTitle
            iconName={'user-circle-o'}
            iconType={FontAwesome}
            LeftIcon={true}
            titleText={'Username'}
            placeholder={'Username'}
            setText={setUserName}
            value={username}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            backgroundColor={Color.white}
            borderColor={Color.lightGrey}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
          />
          <TextInputWithTitle
            iconName={'email'}
            iconType={Fontisto}
            LeftIcon={true}
            titleText={'Email'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.lightGrey}
            backgroundColor={Color.white}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            disable
          />

          <TextInputWithTitle
            iconName={'phone'}
            iconType={FontAwesome}
            LeftIcon={true}
            titleText={'Phone'}
            placeholder={'Phone'}
            setText={setPhone}
            value={phone}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.lightGrey}
            backgroundColor={Color.white}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
          />

          <CustomButton
            onPress={() => {
              profileUpdate();
            }}
            text={
              isLoading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'SUBMIT'
              )
            }
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(25, 0.3)}
            bgColor={Color.darkBlue}
            isBold
          />
        </View>
      </View>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      />
    </SafeAreaView>
  );
};

export default Profile;
const styles = ScaledSheet.create({
  main: {
    width: windowWidth,
    minHeight: windowHeight,
    paddingBottom: moderateScale(40, 0.6),
    // paddingTop: moderateScale(10, 0.6),
    alignItems: 'center',
    backgroundColor: Color.white,
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
    height: windowHeight * 0.12,
    width: windowHeight * 0.12,
    borderRadius: moderateScale((windowHeight * 0.13) / 2),
    borderWidth: 1.5,
    borderColor: Color.darkGray,
  },
});
