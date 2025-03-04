import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import CustomText from './CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CustomAlertModal = props => {
  const {
    isModalVisible,
    onClose,
    onOKPress,
    title,
    message,
    iconType,
    areYouSureAlert,
  } = props;

  // iconType  () error == 0 ) ( success == 1 ) ( warning == 2 )
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* Modal main View */}
      <View style={styles.modalUpperView}>
        <Icon
          name={
            iconType == 0
              ? 'closecircleo'
              : iconType == 1
              ? 'checkcircleo'
              : 'warning'
          }
          as={AntDesign}
          size={moderateScale(50, 0.3)}
          style={{
            color: Color.white,
          }}
        />
      </View>
      <View style={styles.modalLowerView}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomText style={styles.title}>{title}</CustomText>
          <CustomText style={styles.message}>{message}</CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // width: width * 0.625,
          }}>
          <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.white}
            onPress={onOKPress}
            width={width * 0.2}
            height={height * 0.05}
            text={areYouSureAlert ? 'Yes' : 'Okay'}
            fontSize={moderateScale(16, 0.3)}
            borderRadius={moderateScale(30, 0.3)}
            // textTransform={'capitalize'}
            // isGradient={true}
            // marginTop={moderateScale(12, 0.3)}
          />
          {areYouSureAlert && (
            <View
              style={{
                marginLeft: moderateScale(10, 0.3),
              }}>
              <CustomButton
                bgColor={Color.white}
                borderColor={Color.themeColor}
                borderWidth={1}
                textColor={Color.themeColor}
                onPress={onClose}
                width={width * 0.2}
                height={height * 0.045}
                text={'No'}
                fontSize={moderateScale(16, 0.3)}
                borderRadius={moderateScale(30, 0.3)}
                // textTransform={'capitalize'}
                // isGradient={true}
                // marginTop={moderateScale(12, 0.3)}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
  // Modal end
};
// Filter Modal end

const styles = ScaledSheet.create({
  modalUpperView: {
    backgroundColor: Color.themeColor,
    width: width * 0.7,
    minHeight: height * 0.1,
    maxHeight: height * 0.1,
    // borderTopLeftRadius: moderateScale(20, 0.3),
    // borderTopRightRadius: moderateScale(20, 0.3),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  modalLowerView: {
    backgroundColor: Color.white,
    width: width * 0.7,
    minHeight: height * 0.225,
    maxHeight: height * 0.325,
    // borderBottomLeftRadius: moderateScale(20, 0.3),
    // borderBottomRightRadius: moderateScale(20, 0.3),
    flexDirection: 'column',
    paddingHorizontal: moderateScale(30, 0.3),
    // paddingVertical: moderateScale(15, 0.3),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(20, 0.3),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    
  },
  message: {
    fontSize: moderateScale(11, 0.3),
    paddingTop: moderateScale(5, 0.3),
    // paddingBottom: moderateScale(10, 0.3),
    textAlign: 'center',
  },
});

export default CustomAlertModal;
