import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';

const CancelRide = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      swipeDirection="up"
      transparent
      visible={modalVisible}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor :'red'
      }}>
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: windowWidth * 0.87,
            height: windowHeight * 0.25,
            backgroundColor: Color.white,
            borderRadius: moderateScale(20, 0.6),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(12, 0.6),
          }}>
          <View
            style={{
              height: windowHeight * 0.08,
              width: windowWidth * 0.16,
              // marginTop: moderateScale(20, 0.6),
              // marginBottom: moderateScale(20, 0.6),
            }}>
            <CustomImage
              style={{width: '100%', height: '100%'}}
              source={require('../Assets/Images/time_out.png')}
            />
          </View>
          <CustomText
            isBold
            style={{fontSize: moderateScale(15, 0.6), textAlign: 'center'}}>
            Ride Canceled
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              textAlign: 'center',
              color: Color.grey,
            }}>
            Your session has timed out due to inactivity. Unfortunately, your
            ride request has been automatically canceled. To book a new ride,
            please start again.
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.82,
              justifyContent: 'space-between',
            }}>
            <CustomButton
              fontSize={moderateScale(8, 0.6)}
              text={'stay here'}
              textColor={Color.white}
              width={windowWidth * 0.4}
              height={windowHeight * 0.045}
              bgColor={Color.themeBlack}
              // borderColor={Color.white}
              // borderWidth={1}
              marginTop={moderateScale(20, 0.6)}
              borderRadius={moderateScale(30, 0.3)}
              //   isGradient
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <CustomButton
              fontSize={moderateScale(8, 0.6)}
              text={'go back to Home'}
              textColor={Color.white}
              width={windowWidth * 0.4}
              height={windowHeight * 0.045}
              bgColor={Color.themeBlack}
              // borderColor={Color.white}
              // borderWidth={1}
              marginTop={moderateScale(20, 0.6)}
              borderRadius={moderateScale(30, 0.3)}
              //   isGradient
                onPress={() => navigationService.navigate('Home')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelRide;

const styles = StyleSheet.create({});
