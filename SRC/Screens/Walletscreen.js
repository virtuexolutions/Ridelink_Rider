import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CashoutModal from '../Components/CashoutModal';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';

const Walletscreen = () => {
  const firstCashout = useSelector(state => state.commonReducer.cashout);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ Walletscreen ~ userData:', userData?.wallet);
  const [isVisible, setIsVisible] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  const dummyarray = [
    {
      id: 1,
      date: '4-5-2025',
      transfer_methode: 'card',
      time: '4:50 pm ',
      status: 'completed',
      amount: '60$',
    },
    {
      id: 2,
      date: '4-5-2025',
      transfer_methode: 'card',
      time: '4:50 pm ',
      status: 'completed',
      amount: '60$',
    },
    {
      id: 3,
      date: '4-5-2025',
      transfer_methode: 'card',
      time: '4:50 pm ',
      status: 'completed',
      amount: '60$',
    },
    {
      id: 4,
      date: '4-5-2025',
      transfer_methode: 'card',
      time: '4:50 pm ',
      status: 'completed',
      amount: '60$',
    },
  ];
  return (
    <SafeAreaView>
      <Header
        showBack={true}
        textstyle={{fontWeight: 'regular'}}
        title={' your Wallet'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.cardStyle}>
            {/* <View
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
            </View> */}
            <View
              style={{
                // flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(40, 0.6),
              }}>
              <CustomText
                style={{
                  fontSize: moderateScale(16, 0.6),
                  color: Color.white,
                }}>
                total Balance
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(22, 0.6),
                  color: Color.white,
                  textAlign: 'center',
                }}>
                {userData?.wallet?.balance}
              </CustomText>
              <CustomText
                style={{
                  paddingTop: moderateScale(12, 0.6),
                  fontSize: moderateScale(10, 0.6),
                  color: Color.white,
                  textAlign: 'center',
                }}>
                lorem ipsum
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
              onPress={() => {
                firstCashout == true
                  ? navigationService.navigate('CashoutScreen')
                  : setIsVisible(true);
              }}
              text={'instant cashout'}
              fontSize={moderateScale(10, 0.6)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.39}
              height={windowHeight * 0.06}
              bgColor={Color.darkBlue}
              textTransform={'capitalize'}
              elevation
            />
            <CustomButton
              onPress={() => {
                setIsHistory(!isHistory);
              }}
              text={'Cashout history '}
              fontSize={moderateScale(10, 0.6)}
              textColor={Color.themeDarkGray}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.39}
              height={windowHeight * 0.06}
              bgColor={Color.white}
              textTransform={'capitalize'}
              elevation
            />
          </View>
          {isHistory && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dummyarray}
              contentContainerStyle={{
                paddingBottom: moderateScale(80, 0.6),
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.card}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <CustomText>date :</CustomText>
                      <CustomText
                        style={{paddingHorizontal: moderateScale(10, 0.6)}}>
                        {item?.date}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <CustomText>time :</CustomText>
                      <CustomText
                        style={{paddingHorizontal: moderateScale(10, 0.6)}}>
                        {item?.time}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <CustomText>Transfer Method :</CustomText>
                      <CustomText
                        style={{paddingHorizontal: moderateScale(10, 0.6)}}>
                        {item?.transfer_methode}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <CustomText>status :</CustomText>
                      <CustomText
                        style={{paddingHorizontal: moderateScale(10, 0.6)}}>
                        {item?.status}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <CustomText>amount :</CustomText>
                      <CustomText
                        style={{paddingHorizontal: moderateScale(10, 0.6)}}>
                        {item?.amount}
                      </CustomText>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
      <CashoutModal isVisible={isVisible} setIsVisible={setIsVisible} />
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
    height: windowHeight * 0.18,
    backgroundColor: Color.darkBlue,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    // paddingHorizontal: moderateScale(10, 0.6),
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
    borderRadius: moderateScale(15, 0.6),
    backgroundColor: 'red',
  },
  card: {
    width: windowWidth * 0.8,
    borderWidth: 0.4,
    borderColor: Color.darkBlue,
    padding: moderateScale(10, 0.6),
    // height: windowHeight * 0.2,
    marginVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
});
