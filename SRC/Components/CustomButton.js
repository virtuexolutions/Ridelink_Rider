import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import {windowWidth} from '../Utillity/utils';

const CustomButton = props => {
  const {
    activeOpacity,
    onPress,
    width,
    height,
    bgColor,
    borderWidth,
    borderColor,
    marginTop,
    marginBottom,
    justifyContent,
    borderRadius,
    isGradient,
    fontSize,
    loader,
    loaderColor,
    iconName,
    iconType,
    iconStyle,
    textColor,
    textTransform,
    text,
    isBold,
    disabled = false,
    alignSelf,
    elevation,
    marginRight,
    textstyle,
    iconIsImage,
    image,
    fontcase,
    style,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : 0.9}
      onPress={onPress}
      style={[
        styles.mainBtn,
        {
          width: width,
          height: height,
          borderWidth: borderWidth,
          backgroundColor: bgColor,
          borderColor: borderColor,
          marginTop: marginTop || 0,
          marginBottom: marginBottom || 0,
        },
        elevation && {
          shadowColor: Color.themeBlack,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        },
        alignSelf && {
          alignSelf: alignSelf,
        },
        justifyContent && {
          justifyContent: justifyContent,
        },
        marginRight && {
          marginRight: marginRight,
        },
        borderRadius && {
          borderRadius: borderRadius,
        },
        borderWidth && {
          borderWidth: borderWidth,
        },
        disabled && {
          backgroundColor: Color.themeLightGray,
          borderColor: Color.themeLightGray,
          color: Color.white,
        },
        style,
      ]}
      disabled={disabled}>
      {disabled == false && isGradient ? (
        <LinearGradient
          style={{
            flexDirection: 'row',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: moderateScale(30, 0.3),
          }}
          start={{x: 1, y: 0.2}}
          end={{x: 1, y: 1}}
          colors={bgColor}>
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor ? loaderColor : Color.white}
            />
          )}
          {iconIsImage && (
            <View
              style={{
                width: windowWidth * 0.1,
                height: windowWidth * 0.1,
                overflow: 'hidden',
              }}>
              <CustomImage
                source={require('../Assets/Images/goal.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          )}
          {iconName && (
            <Icon
              name={iconName}
              as={iconType}
              style={[styles.iconCustom, iconStyle && iconStyle]}
            />
          )}
          <CustomText
            style={[
              styles.text,
              // textStyle && textStyle,
              {
                color: textColor,
                fontSize: fontSize ? fontSize : moderateScale(13, 0.3),
              },
              textTransform && {
                textTransform: textTransform,
              },
            ]}
            isRegular={isBold ? false : true}
            isBold={isBold ? true : false}>
            {text}
          </CustomText>
        </LinearGradient>
      ) : (
        <>
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor ? loaderColor : Color.white}
            />
          )}
          {iconIsImage && (
            <View
              style={{
                width: windowWidth * 0.07,
                marginRight: moderateScale(5, 0.2),
                height: windowWidth * 0.07,
                overflow: 'hidden',
              }}>
              <CustomImage
                source={require('../Assets/Images/goal.png')}
                style={{width: '100%', height: '100%', tintColor: 'black'}}
              />
            </View>
          )}
          {iconName && (
            <Icon
              name={iconName}
              as={iconType}
              style={[styles.iconCustom, iconStyle && iconStyle]}
            />
          )}
          <CustomText
            style={[
              styles.text,
              textstyle,
              {
                color: textColor,
              },
              textTransform && {
                textTransform: textTransform,
              },
              disabled && {
                color: Color.white,
                opacity: 0.6,
              },
            ]}
            isRegular={isBold ? false : true}
            isBold={isBold ? true : false}>
            {text}
          </CustomText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    // marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(2, 0.3),
  },
  text: {
    color: 'white',
    // fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 0.9,
    // ...FONTS.Medium11
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  iconCustom: {
    color: 'white',
    fontSize: moderateScale(17, 0.6),
    marginRight: moderateScale(5, 0.3),
    // paddingRight: 10,
    // paddingLeft: I18nManager.isRTL ? 20 : 0,
  },
});

export default CustomButton;
