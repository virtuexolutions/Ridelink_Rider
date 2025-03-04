import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';

const Walletscreen = () => {
  return (
    <SafeAreaView>
      <Header textstyle={{fontWeight: 'regular'}} title={'Wallet'} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.cardStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: moderateScale(15, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.white,
                width: windowWidth * 0.45,
              }}>
              Credit Card
            </CustomText>
            <View style={styles.chipBox}></View>
          </View>
          <View style={{marginTop: moderateScale(25, 0.6)}}>
            <CustomText
              style={{
                fontSize: moderateScale(22, 0.6),
                color: Color.white,
                letterSpacing: 4,
              }}>
              **** **** **** 1234
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(40, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.white,
              }}>
              Burgundy Flemming
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.white,
              }}>
              08/24
            </CustomText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: moderateScale(10, 0.6),
            marginTop: moderateScale(15, 0.6),
          }}>
          <CustomButton
            text={'Direct deposit'}
            fontSize={moderateScale(10, 0.6)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.39}
            height={windowHeight * 0.06}
            bgColor={Color.darkBlue}
            textTransform={'capitalize'}
          />
          <CustomButton
            text={'Instant Cashout'}
            fontSize={moderateScale(10, 0.6)}
            textColor={Color.themeDarkGray}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.39}
            height={windowHeight * 0.06}
            bgColor={Color.white}
            textTransform={'capitalize'}
          />
        </View>
        <View style={styles.Amount_BalanceBox}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: windowWidth * 0.53}}>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeDarkGray,
                }}>
                Balances
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(28, 0.6),
                  color: Color.themeBlack,
                }}>
                $45,554.55
              </CustomText>
            </View>
            <CustomButton
              text={'Deposit'}
              fontSize={moderateScale(13, 0.6)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.3}
              height={windowHeight * 0.06}
              bgColor={Color.darkBlue}
              textTransform={'capitalize'}
            />
          </View>
          <View style={styles.chartImageStyle}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/Chartimage.png')}
            />
          </View>
          <View style={styles.weekdaysStyle}>
            <CustomText
              style={{
                fontSize: moderateScale(10, 0.6),
                color: Color.themeDarkGray,
                letterSpacing: 6.5,
              }}>
              Mon Tue Wed Thu Fri Sat Sun
            </CustomText>
          </View>
        </View>
          <ImageBackground
           style={{width:windowWidth *0.89,
            height:windowHeight *0.18,borderRadius:moderateScale(15,0.6),
            top:moderateScale(12,0.6)
           }} imageStyle={{height:'100%',width:'100%',borderRadius:moderateScale(15,0.6)}} source={require('../Assets/Images/graphimage.png')}></ImageBackground>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Walletscreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    paddingHorizontal: moderateScale(15, 0.6),
    alignItems: 'center',
  },
  cardStyle: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.24,
    backgroundColor: Color.black,
    borderRadius: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  chipBox: {
    width: windowHeight * 0.07,
    height: windowHeight * 0.04,
    backgroundColor: Color.grey,
    borderRadius: moderateScale(10, 0.6),
  },
  Amount_BalanceBox: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.34,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    marginTop: moderateScale(10, 0.6),
    // backgroundColor:'red'
  },
  chartImageStyle: {
    width: windowWidth * 0.82,
    height: windowHeight * 0.17,
    // backgroundColor:'green',
    marginTop: moderateScale(20, 0.6),
  },
  weekdaysStyle: {
    width: windowWidth * 0.85,
    // backgroundColor:'green',
  },
  graphimageBox: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.19,
    top: moderateScale(10, 0.6),
    borderRadius:moderateScale(15,0.6),
    backgroundColor: 'red',
  },
});
