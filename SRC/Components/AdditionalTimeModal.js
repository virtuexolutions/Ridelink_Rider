import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const AdditionalTimeModal = ({
  modalvisibe,
  setTime,
  setModalVisible,
  setAdditionalTime,
}) => {
  // const sendtime = async (rideId, userWaitTime, userId, riderId) => {
  //   try {
  //     const rideRef = doc(db, 'requests', rideId);
  //     await setDoc(rideRef, {
  //       userWaitTime: userWaitTime,
  //       riderWaitTime: null, // Rider's wait time will be updated later
  //       status: 'waiting',
  //       userId: userId,
  //       riderId: riderId,
  //     });
  //     console.log('User wait time sent!');
  //   } catch (e) {
  //     console.error('Error sending wait time: ', e);
  //   }
  // };

  return (
    <Modal
      swipeDirection="up"
      transparent
      visible={modalvisibe}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          //   backgroundColor: 'green',
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.2,
            backgroundColor: Color.white,
            borderRadius: moderateScale(15, 0.6),
            alignItems: 'center',
            paddingHorizontal: moderateScale(12, 0.6),
            paddingVertical: moderateScale(25, 0.6),
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(18, 0.6),
            }}>
            Add Waiting Time
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
            }}
            textAlign={'center'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.{' '}
          </CustomText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomButton
              onPress={() => {
                // sendtime(5)
                setTime(5);
                setAdditionalTime(true);
                setModalVisible(false);
              }}
              text={'5 Min'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.black}
              borderRadius={moderateScale(20, 0.3)}
              width={windowWidth * 0.32}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.05}
              bgColor={'transparent'}
              textTransform={'capitalize'}
              isBold
              borderColor={Color.darkBlue}
              borderWidth={1.5}
            />
            <CustomButton
              text={'10 Min'}
              onPress={() => {
                sendtime(10);
                // setTime(10);
                // setAdditionalTime(true);
                // setModalVisible(false);
              }}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.black}
              borderRadius={moderateScale(20, 0.3)}
              width={windowWidth * 0.32}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.05}
              bgColor={'transparent'}
              textTransform={'capitalize'}
              isBold
              borderColor={Color.lightGrey}
              borderWidth={1.5}
              style={{
                marginLeft: moderateScale(10, 0.6),
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AdditionalTimeModal;

const styles = StyleSheet.create({});
