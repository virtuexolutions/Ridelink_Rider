import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import { setUserType } from '../Store/slices/auth-slice';
import navigationService from '../navigationService';
import { useDispatch } from 'react-redux';

const Start = () => {
  const [done, setDone] = useState(false);
  console.log('🚀 ~ Start ~ done:', done);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.main_view}>
      <ImageBackground
        source={require('../Assets/Images/background.png')}
        style={styles.sub_view}>
        <View style={styles.image_view}>
          <CustomImage
            style={styles.image}
          // source={require('../Assets/Images/logo.png')}
          />
        </View>
        <CustomText style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          efficitur consectetur ligula eget ultrices.
        </CustomText>
        <View style={styles.button_box}>
          <CustomButton
            text={done === true ? 'Commission' : 'Rider'}
            width={windowWidth * 0.7}
            height={windowHeight * 0.075}
            bgColor={Color.darkBlue}
            borderRadius={moderateScale(30, 0.3)}
            textColor={Color.white}
            textTransform={'none'}
            onPress={() => {
              if (done != true) {
                setDone(true);
                dispatch(setUserType('Rider'));
              } else {
                navigationService.navigate('LoginScreen');
              }
            }}
          />
          <CustomButton
            onPress={() => {
              if (done != true) {
                dispatch(setUserType('Customer'));
                navigationService.navigate('LoginScreen');
              }
            }}
            text={done === true ? 'Subscription' : 'Customer'}
            width={windowWidth * 0.7}
            borderWidth={1.5}
            borderColor={Color.darkBlue}
            height={windowHeight * 0.075}
            borderRadius={moderateScale(30, 0.3)}
            marginTop={moderateScale(10, 0.6)}
            textColor={Color.white}
            textTransform={'none'}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Start;

const styles = StyleSheet.create({
  main_view: {
    width: windowWidth,
    height: windowHeight,
  },
  sub_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_view: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.55,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: moderateScale(9, 0.6),
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: moderateScale(20, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  button_box: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.85,
    backgroundColor: Color.black,
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
