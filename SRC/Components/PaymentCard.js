import React, { useState } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import { Code, Icon } from 'native-base';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import Feather from 'react-native-vector-icons/Feather';

const PaymentCard = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: moderateScale(55, 0.6),
          width: moderateScale(55, 0.6),
          borderRadius: moderateScale(30, 0.6),
          position: 'absolute',
          top: moderateScale(-20, 0.3),
        }}>
        <CustomImage
          style={{ width: '100%', height: '100%' }}
          resizeMode={'cover'}
          source={data?.profilepic}
        />
      </View>
      <CustomText
        style={{
          fontSize: moderateScale(14, 0.6),
          marginTop: moderateScale(20, 0.6),
        }}>
        {data?.name}
      </CustomText>
      <View style={styles.text_view}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="map-pin" as={Feather} color={Color.orange} />
            <CustomText
              isBold={true}
              style={{
                fontSize: 10,
                paddingHorizontal: moderateScale(5, 0.6),
              }}>
              pickupLocatoion
            </CustomText>
            <CustomText
              isBold
              style={[
                styles.text1,
                {
                  position: 'absolute',
                  color: 'black',
                  paddingVertical: moderateScale(10, 0.6),
                  top: 11,
                  // marginLeft: moderateScale(-3, 0.6),
                  transform: [{ rotate: '-90deg' }],
                },
              ]}>
              - - -
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: 10,
              width: windowWidth * 0.4,
              marginLeft: moderateScale(18, 0.6),
            }}>
            {data?.pickupLocatoion}
          </CustomText>

          <View
            style={{ flexDirection: 'row', marginTop: moderateScale(7, 0.6) }}>
            <Icon name="map-pin" as={Feather} color={Color.cartheme} />
            <CustomText
              isBold={true}
              style={{
                fontSize: 10,
                paddingHorizontal: moderateScale(5, 0.6),
              }}>
              drop off location
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: 10,
              width: windowWidth * 0.4,
              marginLeft: moderateScale(18, 0.6),
            }}>
            {data?.pickupLocatoion}
          </CustomText>
        </View>
        <View
          style={{
            marginLeft: moderateScale(30, 0.6),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText style={{ color: Color.grey }}>{data?.distance}</CustomText>
          <CustomText>{'$ ' + data?.price}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    height: windowHeight * 0.2,
    width: windowWidth * 0.8,
    marginTop: moderateScale(20, 0.6),
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(30, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 6,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 3,
    marginHorizontal: moderateScale(20, 0.6)
  },
  text_view: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: moderateScale(15, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
  },
});
