import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { baseUrl } from '../Config';
import { setUserLogoutAuth, setUserToken } from '../Store/slices/auth';
import { setUserLogOut } from '../Store/slices/common';
import { windowHeight, windowWidth } from '../Utillity/utils';

const Drawer = React.memo(() => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const isSiginWithGoogle = useSelector(
    state => state.commonReducer.isSiginWithGoogle,
  );
  console.log('🚀 ~ isSiginWithGoogl ===============>e:', isSiginWithGoogle);
  const [isOnline, setIsOnline] = useState(false);

  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const adminData = [
    {
      id: 0,
      name: isOnline ? 'Go Offline' : 'Go Online',
      type: 'switch',
    },
    {
      id: 1,
      name: 'Home',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'Home' });
      },
    },
    {
      id: 4,
      name: 'Earnings',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'Walletscreen' });
      },
    },
    {
      id: 6,
      name: 'Update vehicle',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'AddYourCar' });
      },
    },

    {
      id: 7,
      name: 'Notifications ',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'Notification' });
      },
    },
    {
      id: 8,
      name: 'Accounts ',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'Profile' });
      },
    },
    {
      id: 8,
      name: 'Referral ',
      // onPress: () => {
      //   navigation.navigate('MyDrawer', { screen: 'Profile' });
      // },
    },

    {
      id: 9,
      name: 'Change password ',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'ChangePassword' });
      },
    },
    {
      id: 10,
      name: 'privacy policy ',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'PrivacyPolicy' });
      },
    },
    {
      id: 10,
      name: 'terms & conditions',
      onPress: () => {
        navigation.navigate('MyDrawer', { screen: 'TermsAndConditions' });
      },
    },
  ];
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.con}>
        <View style={styles.profile_view}>
          <View style={styles.image_view}>
            <CustomImage
              style={styles.image}
              source={
                userData?.photo
                  ? { uri: `${baseUrl}${userData?.photo}` }
                  : require('../Assets/Images/user.png')
              }
            />
          </View>
          <View style={styles.name} />
          <CustomText isBold style={styles.heading_text}>
            {userData?.name}
          </CustomText>
          <CustomText style={styles.text}>
            Diver : {userData?.car_info?.name}
          </CustomText>
        </View>
        <View style={{ height: '60%' }}>
          {adminData.map((item) => (
            <View key={item.id}>
              {item.type === 'switch' ? (
                <View
                  style={[
                    styles.arraybtn,
                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                  ]}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: Color.black,
                    }}>
                    {isOnline ? 'Go Offline' : 'Go Online'}
                  </CustomText>

                  <Switch
                    value={isOnline}
                    onValueChange={(value) => {
                      setIsOnline(value);
                      console.log(value ? '🟢 Online' : '🔴 Offline');
                    }}
                    thumbColor={isOnline ? Color.themeColor : '#ccc'}
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={item.onPress} style={styles.arraybtn}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: Color.black,
                    }}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.end_view}>
          <TouchableOpacity
            onPress={() => {
              console.log('isSiginWithGoogle ===>', isSiginWithGoogle);
              if (!isSiginWithGoogle) {
                console.log('logout and empty userdata');
                dispatch(setUserToken({ token: '' }));
                dispatch(setUserLogOut());
                dispatch(setUserLogoutAuth());
              } else {
                console.log('logout and remove token ');
                dispatch(setUserToken({ token: '' }));
              }
            }}
            style={styles.logout_btn}>
            <CustomText style={styles.btn_txt}>Logout</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenBoiler>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  profile_view: {
    paddingHorizontal: moderateScale(20, 0.6),
    height: '20%',
    paddingVertical: moderateScale(20, 0.6),
  },
  image_view: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Color.grey,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: windowHeight,
  },
  heading_text: {
    fontSize: moderateScale(14, 0.6),
    textTransform: 'uppercase',
  },
  text: {
    fontSize: moderateScale(11, 0.6),
  },
  end_view: {
    height: '20%',
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.6),
  },
  name: {
    width: moderateScale(15, 0.6),
    height: moderateScale(15, 0.6),
    backgroundColor: '#04FF3F',
    borderRadius: windowWidth,
    top: -12,
    left: 10,
  },
  con: {
    height: windowHeight,
    backgroundColor: Color.white,
    borderTopRightRadius: moderateScale(120, 0.6),
    borderBottomRightRadius: moderateScale(120, 0.6),
    paddingVertical: moderateScale(60, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    width: '88%',
    marginTop: moderateScale(10, 0.6),
    justifyContent: 'space-between',
  },
  btn: {
    borderWidth: 1,
    borderColor: Color.black,
    borderRadius: moderateScale(4, 0.6),
    height: windowHeight * 0.022,
    width: windowWidth * 0.05,
  },
  arraybtn: {
    width: windowWidth * 0.7,
    borderColor: Color.black,
    margin: moderateScale(10, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  end_btn: {
    width: windowWidth * 0.7,
    borderColor: Color.black,
    margin: moderateScale(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  le_btn: {
    width: windowWidth * 0.7,
    borderColor: Color.black,
    margin: moderateScale(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logout_btn: {
    width: windowWidth * 0.7,
    borderColor: Color.black,
    margin: moderateScale(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn_txt: {
    fontSize: moderateScale(14, 0.6),
    color: Color.veryLightGray,
  },
});
