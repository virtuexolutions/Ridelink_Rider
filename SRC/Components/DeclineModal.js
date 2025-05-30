import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const DeclineModal = ({
  isVisible,
  onPressCancel,
  onpressAccept,
  onBackdropPress,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onBackdropPress={onBackdropPress}>
      <View style={styles.main_view}>
        <View style={styles.sub_view}>
          <CustomText isBold style={styles.heading}>
            Do You Want To Cancel The Request?
          </CustomText>
        </View>
        <CustomButton
          width={windowWidth * 0.92}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'KEEP SEARCHING'}
          isBold
          style={{top: moderateScale(-40)}}
          marginBottom={moderateScale(10, 0.6)}
          onPress={onpressAccept}
        />
        <CustomButton
          width={windowWidth * 0.92}
          height={windowHeight * 0.075}
          bgColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.black}
          isBold
          textTransform={'none'}
          text={'CANCEL REQUEST'}
          style={{top: moderateScale(-40)}}
          marginBottom={moderateScale(10, 0.6)}
          borderWidth={2}
          onPress={onPressCancel}
        />
      </View>
    </Modal>
  );
};

export default DeclineModal;

const styles = StyleSheet.create({
  main_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'rgba(225, 225, 225, 0.23)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    textAlign: 'center',
  },
});
