import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get} from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {setUserLogoutAuth, setUserToken} from '../Store/slices/auth';
import {setUserData, setUserLogOut} from '../Store/slices/common';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {StatusBar} from 'react-native';

const AccountVerificationScreen = () => {
  const token = useSelector(state => state.authReducer.token);
  const isSiginWithGoogle = useSelector(
      state => state.commonReducer.isSiginWithGoogle,
    );
  // const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    checkAccountStatus();
  }, [isFocused]);

  const checkAccountStatus = async () => {
    console.log('here');
    const url = 'auth/userinfo';
    const response = await Get(url, token);
    if (response?.data != undefined) {
      console.log(response?.data?.user_info);
      dispatch(setUserData(response?.data?.user_info));
    }
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar barStyle={'dark-content'} />
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
          console.log('isSiginWithGoogle ===>', isSiginWithGoogle);
          if (!isSiginWithGoogle) {
            console.log('logout and empty userdata');
            dispatch(setUserToken({token: ''}));
            dispatch(setUserLogOut());
            dispatch(setUserLogoutAuth());
          } else {
            console.log('logout and remove token ');
            dispatch(setUserToken({token: ''}));
          }
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
