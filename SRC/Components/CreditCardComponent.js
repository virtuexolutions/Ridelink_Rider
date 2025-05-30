import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';

const CreditCardComponent = () => {
  return (
    <LinearGradient
      colors={['#1f1f1f', '#cfcfcf']} // Adjust these colors for a closer match
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.card}>
      <CustomText style={styles.heading}>CREDIT CARD NUMBER</CustomText>
      <CustomText style={styles.text}>3423 5656 7678 5634</CustomText>
      <View style={styles.text_view}>
        <View>
          <CustomText style={styles.heading}>OWNER NAME</CustomText>
          <CustomText style={[styles.text]}>MIKE DUNN</CustomText>
        </View>
        <View>
          <CustomText style={styles.heading}>VALID TILL</CustomText>
          <CustomText style={styles.text}>03 / 2025</CustomText>
        </View>
        <View>
          <CustomText style={styles.heading}>CVV CODE</CustomText>
          <CustomText style={styles.text}>345</CustomText>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CreditCardComponent;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    justifyContent: 'flex-start',
    marginTop: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: moderateScale(17, 0.6),
    color: Color.white,
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(15, 0.6),
    width: windowWidth * 0.8,
  },
});
