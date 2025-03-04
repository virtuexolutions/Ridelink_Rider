import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';

const Earningsscreen = () => {
  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.imagebackgroundStyle}
        imageStyle={{
          height: '100%',
          width: '100%',
        }}
        source={require('../Assets/Images/background.png')}>
        <Header headerColor={'transparent'} />
        <View style={styles.orderBox}>
          <View style={styles.riderImage}>
            <CustomImage
              // source={require('../Assets/Images/user_image2.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />

            <View
              style={{
                height: windowHeight * 0.019,
                width: windowHeight * 0.019,
                borderRadius: (windowHeight * 0.019) / 2,
                backgroundColor: '#04FF3F',
                position: 'absolute',
                bottom: moderateScale(0, 0.6),
                left: moderateScale(4, 0.6),
              }}></View>
          </View>
          <View
            style={{
              marginLeft: moderateScale(12, 0.6),
              justifyContent: 'center',
            }}>
            <View style={{ height: moderateScale(18, 0.6) }}>
              <CustomText
                style={{
                  fontSize: moderateScale(16, 0.6),
                  color: Color.white,
                  fontWeight: 'bold',
                }}>
                PAT H. JOHNSON
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: moderateScale(30, 0.6),
              }}>
              <CustomText
                style={{
                  fontSize: moderateScale(22, 0.6),
                  color: Color.white,
                  fontWeight: 'bold',
                }}>
                $100.00
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(10, 0.6),
                  color: Color.white,
                  top: moderateScale(3, 0.6),
                  marginLeft: moderateScale(5, 0.6),
                }}>
                Total Earning
              </CustomText>
            </View>
            <View style={{ bottom: moderateScale(8, 0.6) }}>
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.white,
                }}>
                We're looking for rides.
              </CustomText>
            </View>
          </View>
        </View>
        <View style={{ bottom: moderateScale(25, 0.6) }}>
          <CustomButton
            isBold
            text={'Instant Cashout'}
            fontSize={moderateScale(10, 0.6)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.69}
            height={windowHeight * 0.07}
            bgColor={Color.darkBlue}
            textTransform={'capitalize'}
          />
        </View>
        <CustomButton
          isBold
          text={'Unlock Platinum'}
          textColor={Color.btntextColor}
          borderRadius={moderateScale(20, 0.3)}
          width={windowWidth * 0.88}
          height={windowHeight * 0.07}
          bgColor={Color.white}
          textTransform={'capitalize'}
          iconName={'star-outlined'}
          elevation={true}
          iconType={Entypo}
          textstyle={{
            fontSize: moderateScale(20, 0.6),
          }}
          style={{
            justifyContent: 'flexStart',
          }}
          iconStyle={{
            fontSize: moderateScale(17, 0.6),
            color: Color.darkBlue,
            marginRight: moderateScale(10, 0.6),
            // backgroundColor:'red',
            // width:moderateScale(40,0.6),
            // height:moderateScale(40,0.3),
          }}
        />
        <CustomButton
          isBold
          text={'Earnings Goal'}
          textColor={Color.btntextColor}
          borderRadius={moderateScale(20, 0.3)}
          width={windowWidth * 0.88}
          height={windowHeight * 0.07}
          bgColor={Color.white}
          textTransform={'capitalize'}
          // iconName={'star-outlined'}
          elevation={true}
          // iconType={Entypo}
          iconIsImage={true}
          // image={require('')}
          textstyle={{
            fontSize: moderateScale(20, 0.6),
          }}
          style={{
            justifyContent: 'flexStart',
            marginTop: moderateScale(15, 0.6),
          }}
        // iconStyle={{
        //   fontSize: moderateScale(17, 0.6),
        //   color: Color.darkBlue,
        //   marginRight: moderateScale(20, 0.6),
        //   // backgroundColor:'red',
        //   // width:moderateScale(40,0.6),
        //   // height:moderateScale(40,0.3),
        // }}
        />
        <View style={styles.reviewBox}>
          <View style={{ width: windowWidth * 0.75 }}>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.btntextColor,
                fontWeight: 'bold',
              }}>
              Review update to terms and conditions.
            </CustomText>
          </View>
          <View style={{ width: windowWidth * 0.75 }}>
            <CustomText
              style={{
                fontSize: moderateScale(11, 0.6),
                color: Color.darkGray,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed
              est sed mauris vehicula accumsan nec vel quam. Duis ac nibh sed
              quam.
            </CustomText>
          </View>
        </View>
        <View style={styles.graphBox}>
          <CustomText
            style={{
              fontSize: moderateScale(16, 0.6),
              fontWeight: 'bold',
              color: Color.black,
              marginLeft: moderateScale(20, 0.6),
            }}>
            Earnings
          </CustomText>
          <ImageBackground
            style={{
              width: windowWidth * 0.88,
              height: windowHeight * 0.18,
              borderRadius: moderateScale(15, 0.6),
              top: moderateScale(12, 0.6),
            }}
            imageStyle={{
              height: '100%',
              width: '100%',
              borderRadius: moderateScale(15, 0.6),
            }}
            source={require('../Assets/Images/graphimage.png')}></ImageBackground>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Earningsscreen;

const styles = StyleSheet.create({
  imagebackgroundStyle: {
    width: windowWidth,
    height: windowHeight,
  },
  orderBox: {
    width: windowWidth * 0.84,
    height: windowHeight * 0.17,
    backgroundColor: Color.btn_Color,
    borderRadius: moderateScale(30, 0.6),
    alignSelf: 'center',
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  riderImage: {
    width: windowHeight * 0.1,
    height: windowHeight * 0.1,
    // backgroundColor: 'red',
  },
  reviewBox: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.15,
    backgroundColor: Color.white,
    marginTop: moderateScale(15, 0.6),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    justifyContent: 'center',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  graphBox: {
    width: windowWidth * 0.88,
    backgroundColor: Color.white,
    // backgroundColor:'red',
    marginTop: moderateScale(15, 0.6),
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
