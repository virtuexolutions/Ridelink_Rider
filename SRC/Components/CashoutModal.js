import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import {setCashOut} from '../Store/slices/common';
import {useDispatch} from 'react-redux';

const CashoutModal = ({isVisible, setIsVisible}) => {
  console.log('🚀 ~ CashoutModal ~ isVisible:', isVisible);
  const dispatch = useDispatch();
  return (
    <Modal
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      style={{
        alignItems: 'center',
      }}>
      <View style={styles.main_con}>
        <CustomText style={styles.heading}>Instant Cash Out Rules </CustomText>
        <CustomText numberOfLines={2} style={styles.sub_heading}>
          Instant Cash Out lets you withdraw funds to your bank account
          instantly
        </CustomText>
        <View style={styles.txt_con}>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <CustomText style={styles.text}>Minimum cash out: $6.00</CustomText>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <CustomText style={styles.text}>
              Max: 3 transactions per day
            </CustomText>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <CustomText style={styles.text}>
              Instant fee (if applicable): e.g., $0.50 per transaction
            </CustomText>
          </View>
        </View>
        <CustomText
          onPress={() => {
            dispatch(setCashOut(true)), setIsVisible(false);
          }}
          style={styles.btn}>
          ok
        </CustomText>
      </View>
    </Modal>
  );
};

export default CashoutModal;

const styles = StyleSheet.create({
  main_con: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.75,
    backgroundColor: Color.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.darkBlue,
    overflow: 'hidden',
  },
  heading: {
    color: Color.white,
    backgroundColor: Color.darkBlue,
    width: '100%',
    fontSize: moderateScale(15, 0.6),
    textAlign: 'center',
    paddingVertical: moderateScale(7, 0.6),
  },
  sub_heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
  },
  txt_con: {
    width: windowWidth * 0.6,
    alignSelf: 'center',
    paddingVertical: moderateScale(6, 0.6),
  },
  dot: {
    height: windowHeight * 0.008,
    width: windowHeight * 0.008,
    borderRadius: (windowHeight * 0.008) / 2,
    backgroundColor: Color.darkBlue,
    marginTop: moderateScale(5, 0.6),
    marginRight: moderateScale(5, 0.6),
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    backgroundColor: Color.darkBlue,
    padding: moderateScale(3, 0.6),
    color: Color.white,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5, 0.6),
  },
});
