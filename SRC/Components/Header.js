import React, { useState } from 'react';
import { Icon } from 'native-base';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const { height, width } = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';
import { imageUrl } from '../Config';
import { setUserLogout, setUserLogoutAuth } from '../Store/slices/auth-slice';
import LinearGradient from 'react-native-linear-gradient';
import { setUserLogOut } from '../Store/slices/common';
import navigationService from '../navigationService';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const cartData = useSelector(state => state.commonReducer.cart);
  const userData = useSelector(state => state.commonReducer.userData);

  const navigationN = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    close,
    navigateTO,
    index,
    cart,
    Notify,
    hideUser,
    navigation,
    textstyle,
    isFilledButton,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    { label: 'Change Password', value: 'ChangePassword' },
    { label: 'Terms & Conditions', value: 'TermsAndConditions' },
    { label: 'Financial Breakdown', value: 'FinancialBreakDown' },
    { label: 'Logout', value: 'Logout' },
  ];

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  return (
    <View
      style={[
        styles.header2,
        { backgroundColor: headerColor ? headerColor : Color.white },
      ]}>
      <View
        style={{
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: showBack || showList ? 'white' : 'transparent',
        }}>
        {showBack ? (
          <Icon
            name={'arrow-back'}
            as={Ionicons}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        ) : (
          <>
            {isFilledButton ? (
              <TouchableOpacity style={styles.filledButton}>
                <Icon
                  // style={styles.menu}
                  name={'menu'}
                  as={Feather

                  }
                  size={moderateScale(21, 0.3)}
                  color={Color.white}
                // onPress={() => {
                //   console.log('hello mg ');
                //   navigationN.toggleDrawer();
                //   // navigation.openDrawer()
                //   // navigationN.dispatch(DrawerActions.toggleDrawer());
                // }}
                />
              </TouchableOpacity>
            ) : (
              <Icon
                style={styles.menu}
                name={'menu'}
                as={Feather}
                size={moderateScale(28, 0.3)}
                color={Color.black}
                onPress={() => {
                  console.log('hello mg ======================= ');
                  navigationN.toggleDrawer();
                  // dispatch(setUserLogOut())
                  // dispatch(SetUserRole(''));

                  // navigation.openDrawer()
                  // navigationN.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            )}

          </>
        )}
      </View>
      {title ? (
        <CustomText style={[styles.text, textstyle]}>{title}</CustomText>
      ) : (
        <CustomImage
          resizeMode={'contain'}
          style={{
            width: windowWidth * 0.21,
            // backgroundColor : 'red' ,
            height: windowHeight * 0.05,
          }}
        // source={require('../Assets/Images/customerservice.png')}
        />
      )}

      {/* {/ <CustomText isBold style={{color : Color.white , fontSize : moderateScale(20,0.6)}} >Hola!!</CustomText> /} */}
      {!hideUser && cart ? (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: moderateScale(6, 0.6),
          }}>
          {cartData?.length > 0 && (
            <View
              style={{
                width: moderateScale(14, 0.6),
                height: moderateScale(14, 0.6),
                borderRadius: moderateScale(7, 0.6),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                position: 'absolute',
                right: -4,
                zIndex: 1,
                top: 0,
              }}>
              <CustomText
                style={{
                  fontSize: 8,
                }}>
                {cartData?.length < 10 ? cartData?.length : '9+'}
              </CustomText>
            </View>
          )}

          <Icon
            name={'shopping-cart'}
            as={Feather}
            size={moderateScale(27, 0.3)}
            color={Color.black}
            onPress={() => {
              if (token == null) {
                Confirm();
                // navigationService.navigate('LoginScreen')
              } else if (cartData?.length > 0) {
                navigationService.navigate('CartScreen');
              } else {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('No Item in cart', ToastAndroid.SHORT)
                  : Alert('No Item in cart');
              }
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: windowHeight * 0.055,
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight * 0.055,
          }}>
          <CustomImage
            onPress={() => {
              // navigation.navigate('Profile')
              // dispatch(setUserLogoutAuth());
            }}
            source={ require('../Assets/Images/user_Image.png')}
            style={{ width: windowHeight * 0.06, height: windowHeight * 0.06 }}
          />
          <View
            style={{
              height: windowHeight * 0.018,
              width: windowHeight * 0.018,
              borderRadius: (windowHeight * 0.018) / 2,
              backgroundColor: '#04FF3F',
              position: 'absolute',
              top: moderateScale(35, 0.6),
              right: moderateScale(29, 0.6),
            }}></View>
        </View>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.black,
  },
  menu: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    textAlign: 'center',
    backgroundColor: Color.white,
    paddingTop: moderateScale(7, 0.6),
  },
  shadowporp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    marginTop: moderateScale(60, 0.3),
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    alignItems: 'center',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
  },
  filledButton: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    backgroundColor: Color.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Header;
