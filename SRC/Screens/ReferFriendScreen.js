import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';

const ReferFriendScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon
            name="arrowleft"
            as={AntDesign}
            style={styles.icon2}
            color={Color.white}
            size={moderateScale(20, 0.3)}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <CustomText style={styles.ht}>refer friends </CustomText>
      </View>
      <View style={styles.secContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            style={{height: '100%', width: '100%'}}
            source={require('../Assets/Images/refer.png')}
          />
        </View>
        <CustomText
          style={[
            styles.text,
            {
              paddingVertical: moderateScale(10, 0.6),
              color: Color.blue,
              textAlign: 'center',
            },
          ]}>
          {'https://dribbble.com/tags/opportunities'}
        </CustomText>
        <CustomText style={styles.text}>
          RideLink Your reliable cab booking app for safe, affordable, and
          hassle-free rides anytime, anywhere!"
        </CustomText>
        <CustomButton
          text={'SHARE NOW'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.85}
          marginTop={moderateScale(40,.6)}
          height={windowHeight * 0.07}
          bgColor={Color.themeBlack}
          textTransform={'capitalize'}
          isBold
          onPress={() => {}}
        />
      </View>
      {/* <Text>ReferFriendScreen</Text> */}
    </View>
  );
};

export default ReferFriendScreen;

const styles = StyleSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    // position: 'absolute',
    // left: moderateScale(10, 0.6),
    // top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    justifyContent: 'center',
  },
  mainContainer: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  secContainer: {
    alignItems: 'center',
    paddingTop: windowWidth * 0.3
  },

  ht: {
    fontSize: moderateScale(18, 0.6),
    color: Color.black,
    width: windowWidth * 0.8,
    textAlign: 'center',
    paddingTop: moderateScale(8, 0.6),
  },
  header: {
    flexDirection: 'row',
    width: windowWidth,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  imageContainer: {
    height: windowHeight * 0.17,
    width: windowWidth * 0.44,
  },
  text: {
    fontSize: moderateScale(13, 0.6),
    color: Color.themeBlack,
    width: windowWidth * 0.8,
  },
});
