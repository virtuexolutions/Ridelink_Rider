import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';

const CountdownTimer = ({initialTime, onComplete, addTime}) => {
  const extractMinutes = timeString => {
    const minutes = parseInt(timeString, 10);
    return isNaN(minutes) ? 0 : minutes;
  };
  const [timeLeft, setTimeLeft] = useState(extractMinutes(initialTime) * 60);
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete && onComplete(initialTime);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View
      style={[
        styles.waiting_card,
        {
          height: windowHeight * 0.15,
          bottom: 100,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <CustomText isBold style={styles.time}>
        {formatTime(timeLeft)}
      </CustomText>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  waiting_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingHorizontal: moderateScale(15, 0.6),
    // paddingVertical: moderateScale(15, 0.6),
    // position :  'absolute'
    // bottom: 20,
  },
  time: {
    fontSize: moderateScale(35, 0.6),
    color: Color.black,
    textAlign: 'center',
  },
});
