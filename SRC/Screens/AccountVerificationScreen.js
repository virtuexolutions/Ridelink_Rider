import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {useDispatch, useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';
import {setUserData} from '../Store/slices/common';
import {setUserLogoutAuth} from '../Store/slices/auth';
import {position} from 'native-base/lib/typescript/theme/styled-system';

const AccountVerificationScreen = () => {
  const token = useSelector(state => state.authReducer.token);
  // const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    checkAccountStatus();
  }, []);

  const checkAccountStatus = async () => {
    const url = 'auth/userinfo';
    const response = await Get(url, token);
    if (response?.data?.user_info?.acc_active != null) {
      dispatch(setUserData(response?.data?.user_info));
    }
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.image_container}>
        <CustomImage
          style={styles.image}
          source={require('../Assets/Images/locked.png')}
        />
      </View>
      <CustomText style={styles.heading}>
        Account Approval in Progress
      </CustomText>
      <CustomText style={styles.sub_heading}>
        Kindly wait until your account is verified to proceed.
      </CustomText>

      <CustomText
        onPress={() => {
          console.log('======================== >>>>>> ');
          dispatch(setUserLogoutAuth({}));
          dispatch(setUserData({}));
        }}
        style={{
          color: Color.blue,
          fontSize: moderateScale(13, 0.6),
          paddingVerticle: moderateScale(10, 0.6),
          // position: 'absolute',
          // bottom: 50,
          // right : 20,
        }}>
        logout
      </CustomText>
    </SafeAreaView>
  );
};

export default AccountVerificationScreen;

const styles = StyleSheet.create({
  main_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_container: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  heading: {
    fontSize: moderateScale(18, 0.6),
    color: Color.black,
    marginTop: moderateScale(10, 0.6),
  },
  sub_heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
  },
});
