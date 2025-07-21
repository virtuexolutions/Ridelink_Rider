import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';

const RideCancel =({ isVisible ,setisVisible}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        aligndatas: 'center',
      }}
      //   onBackdropPress={}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.main_container}>
          <View style={styles.image_con}>
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/sad_face.png')}
            />
          </View>
          <CustomText style={styles.txt}> user cancel the rider</CustomText>
          <CustomButton
            width={windowWidth * 0.4}
            height={windowHeight * 0.05}
            bgColor={Color.themeBlack}
            borderRadius={moderateScale(30, 0.3)}
            marginTop={moderateScale(10,.6)}
            textColor={Color.white}
            textTransform={'none'}
            text={'Go Back'}
            isBold
            onPress={() => {
                navigationService.navigate('Home')
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RideCancel;

const styles = StyleSheet.create({
  main_container: {
    width: windowWidth * 0.65,
    height: windowHeight * 0.27,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Color.black,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_con: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  txt: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
});
