import { Icon } from 'native-base';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';
import ReviewModal from '../Components/ReviewModal';

const RateScreen = props => {
  const data = props?.route?.params?.data;
  console.log('🚀 ~ data:', data);
  const rbRef = useRef();

  return (
    <SafeAreaView
      style={{
        paddingVertical: moderateScale(30, 0.6),
        flex: 1,
        backgroundColor:Color.white
      }}>
      <View style={styles.mainContainer}>
        <Header
          showBack={true}
          textstyle={{ fontWeight: 'regular' }}
          title={'rate Rider'}
        />
        <View style={styles.box}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.image_Style}>
              <CustomImage
                style={{
                  width: windowHeight * 0.06,
                  height: windowHeight * 0.06,
                }}
                source={require('../Assets/Images/riderphoto.png')}
              />
            </View>
            <CustomText style={styles.name}>{data?.rider?.name}</CustomText>
            <TouchableOpacity style={styles.button}>
              <CustomText style={styles.ride_status}>COMPLETE</CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: moderateScale(20, 0.6) }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.Circle}>
                <Icon
                  style={{ color: Color.white }}
                  as={FontAwesome5}
                  name="car"
                  size={moderateScale(12, 0.6)}
                />
              </View>
              <View style={styles.loca_con}>
                <CustomText style={styles.text}>Pickup</CustomText>
                <CustomText numberOfLines={2} style={styles.value}>
                  {data?.location_from}
                </CustomText>
              </View>
            </View>
            <View style={styles.rotate_View}>
              <CustomText style={{ color: Color.black }}>.........</CustomText>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: moderateScale(20, 0.6) }}>
              <View style={styles.Circle}>
                <Icon
                  style={{ color: Color.white }}
                  as={FontAwesome5}
                  name="car"
                  size={moderateScale(12, 0.6)}
                />
              </View>
              <View style={styles.loca_con}>
                <CustomText style={styles.text}>Drop Off</CustomText>
                <CustomText numberOfLines={2} style={styles.value2}>
                  {data?.location_to}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.amountBox}>
          <View style={{ gap: moderateScale(10, 0.6) }}>
            <View style={styles.row}>
              <CustomText style={styles.trip_t}>Trip Fare Breakdown</CustomText>
              <CustomText style={styles.h1}>${data?.amount}</CustomText>
            </View>
            <View style={styles.row}>
              <CustomText
                style={[
                  styles.h1,
                  {
                    fontWeight: '600',
                  },
                ]}>
                Subtotal
              </CustomText>
              <CustomText style={styles.h1}>${data?.amount}</CustomText>
            </View>
            <View style={styles.row}>
              <CustomText
                style={[
                  styles.h1,
                  {
                    fontWeight: '600',
                  },
                ]}>
                Promo Code
              </CustomText>
              <CustomText style={styles.h1}>$ {data?.amount}</CustomText>
            </View>
          </View>
          <View style={styles.container1} />
          <View style={styles.row2}>
            <CustomText isBold style={styles.h1}>
              Total
            </CustomText>
            <CustomText isBold style={styles.h1}>
              ${data?.amount}
            </CustomText>
          </View>
        </View>
        {/* <Rating
          type="custom"
          startingValue={55}
          ratingCount={5}
          ratingColor={Color.yellow}
          imageSize={moderateScale(35, 0.3)}
          tintColor={Color.white}
          style={{marginTop: moderateScale(30, 0.6)}}
        /> */}
        <View style={styles.btn_view}>
          <CustomButton
            text={'complete'}
            fontSize={moderateScale(15, 0.3)}
            textColor={Color.white}
            borderWidth={1.5}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.9}
            height={windowHeight * 0.075}
            bgColor={Color.btn_Color}
            textTransform={'capitalize'}
            elevation={false}
            onPress={() => {
              navigationService.navigate('Home');
              // rbRef.current.open();
            }}
          />

          {/* <ReviewModal setRef={rbRef} rbRef={rbRef} item={data} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RateScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    // paddingVertical: moderateScale(20, .6)
  },
  box: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.89,
    // paddingHorizontal:moderateScale(15,0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(18, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image_Style: {
    width: windowHeight * 0.055,
    justifyContent: 'center',
    alignItems: 'center',

    height: windowHeight * 0.055,
  },
  button: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.04,
    borderRadius: moderateScale(20, 0.6),
    backgroundColor: Color.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Circle: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderRadius: (windowWidth * 0.05) / 2,
    backgroundColor: Color.themeBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountBox: {
    height: windowHeight * 0.16,
    width: windowWidth * 0.89,
    // backgroundColor:'green',
    alignSelf: 'center',
    marginTop: moderateScale(25, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
  },
  name: {
    fontSize: moderateScale(14, 0.6),
    fontWeight: 'bold',
    color: Color.themeBlack,
    width: windowWidth * 0.45,
    marginLeft: moderateScale(13, 0.6),
  },
  ride_status: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
    fontWeight: 'bold',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeBlack,
    fontWeight: 'bold',
    width: windowWidth * 0.5,

    // backgroundColor :'red'
  },
  value: {
    fontSize: moderateScale(10, 0.6),
    color: Color.themeBlack,
    width: windowWidth * 0.75,
    fontWeight: 'bold',
  },
  rotate_View: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    width: windowWidth * 0.1,
    top: moderateScale(40, 0.6),
    left: moderateScale(-4, 0.6),
  },
  value2: {
    fontSize: moderateScale(10, 0.6),
    color: Color.themeBlack,
    fontWeight: 'bold',
    width: windowWidth * 0.75,
  },
  trip_t: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeBlack,
    fontWeight: '600',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  h1: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeBlack,
  },
  container1: {
    width: windowWidth * 0.8,
    backgroundColor: Color.lightGrey,
    borderColor: Color.lightGrey,
    borderWidth: 0.5,
    marginTop: moderateScale(10, 0.6),
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(15, 0.6),
  },
  btn_view: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: moderateScale(20, 0.6)
  },
  loca_con: { marginLeft: moderateScale(10, 0.6) },
});
