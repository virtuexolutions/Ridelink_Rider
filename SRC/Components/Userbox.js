import moment from 'moment';
import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {baseUrl} from '../Config';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import CustomText from './CustomText';

const Userbox = ({data, onPress, onPressDetails}) => {
  console.log('🚀 ~ Userbox ~ data:', data);
  const userData = useSelector(state => state.commonReducer.userData);

  return (
    <TouchableOpacity onPress={onPress} style={styles.details_Style}>
      <View style={styles.text_Style}>
        <View style={styles.image_Style}>
          <CustomImage
            style={{width: '100%', height: '100%'}}
            source={
              userData?.photo
                ? {uri: `${baseUrl}/${userData?.photo}`}
                : require('../Assets/Images/user.png')
            }
          />
        </View>
        <View style={styles.container}>
          <CustomText style={styles.h1}>{/* {userData?.name} */}</CustomText>
          <CustomText style={styles.status}>{data?.type}</CustomText>
        </View>
        <CustomText style={styles.time}>
          {moment(data?.created_at).format('LT')}
        </CustomText>
      </View>
      {/* <View style={{flexDirection:'row'}}> */}
      <View
        style={[
          styles.locationStyle,
          {
            marginLeft: moderateScale(10, 0.6),
          },
        ]}>
        <View style={{flexDirection: 'row', left: moderateScale(2, 0.6)}}>
          <View style={styles.fromLocationStyle}>
            <View style={styles.toLocationStyle}></View>
          </View>
          <CustomText
            numberOfLines={1}
            style={{
              fontSize: moderateScale(12, 0.6),
              color: Color.themeDarkGray,
              marginLeft: moderateScale(5, 0.6),
            }}>
            {data?.location_from}
          </CustomText>
        </View>
        <View
          style={{
            transform: [{rotate: '90deg'}],
            position: 'absolute',
            width: windowWidth * 0.1,
            top: moderateScale(25, 0.6),
            left: moderateScale(-4, 0.6),
          }}>
          <CustomText style={{color: Color.black}}>........</CustomText>
        </View>
        <View style={{flexDirection: 'row', marginTop: moderateScale(20, 0.6)}}>
          <Icon
            name="location-outline"
            as={Ionicons}
            size={moderateScale(18, 0.6)}
          />
          <CustomText
            numberOfLines={1}
            style={{
              fontSize: moderateScale(12, 0.6),
              color: Color.themeDarkGray,
              marginLeft: moderateScale(5, 0.6),
            }}>
            {data?.location_to}
          </CustomText>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.priceView}>
          <CustomText isBold style={styles.txt}>
            price :
          </CustomText>
          <CustomText style={styles.txt}>{`${data?.amount} $`}</CustomText>
        </View>
        <View style={styles.priceView}>
          <CustomText isBold style={styles.txt}>
            distance :
          </CustomText>
          <CustomText
            style={[
              styles.txt,
              {
                marginHorizontal: moderateScale(5, 0.3),
              },
            ]}>
            {data?.distance}
          </CustomText>
        </View>
      </View>

      <View style={styles.buttonBox}>
        <CustomButton
          text={data?.status == 'ontheway' ? 'track your ride' : 'Details'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          bgColor={Color.black}
          textTransform={'capitalize'}
          onPress={onPressDetails}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Userbox;

const styles = StyleSheet.create({
  details_Style: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.28,
    borderRadius: moderateScale(17, 0.6),
    borderRadius: moderateScale(17, 0.6),
    borderWidth: 1.8,
    borderColor: Color.boxgrey,
    alignSelf: 'center',
    paddingHorizontal: moderateScale(19, 0.6),
    paddingVertical: moderateScale(7, 0.6),
    marginVertical: moderateScale(10, 0.6),
  },
  image_Style: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    overflow: 'hidden',
  },
  text_Style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromLocationStyle: {
    width: windowWidth * 0.038,
    height: windowWidth * 0.038,
    borderRadius: (windowWidth * 0.038) / 2,
    backgroundColor: Color.circleblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toLocationStyle: {
    width: windowWidth * 0.02,
    height: windowWidth * 0.02,
    borderRadius: (windowWidth * 0.02) / 2,
    backgroundColor: Color.white,
  },
  locationStyle: {
    width: windowWidth * 0.55,
    height: windowHeight * 0.08,
    marginLeft: moderateScale(40, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
  buttonBox: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  priceView: {
    flexDirection: 'row',
    marginLeft: moderateScale(17, 0.6),
  },
  row: {
    flexDirection: 'row',
  },
  txt: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeDarkGray,
  },
  container: {
    width: windowWidth * 0.55,
    marginLeft: moderateScale(20, 0.6),
  },
  h1: {fontSize: moderateScale(20, 0.6), color: Color.themeBlack},
  status: {
    fontSize: moderateScale(10, 0.6),
    color: Color.themeDarkGray,
  },
  time: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeDarkGray,
    marginLeft: moderateScale(-10, 0.6),
  },
});
