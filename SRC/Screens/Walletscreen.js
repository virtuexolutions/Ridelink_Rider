import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {Get} from '../Axios/AxiosInterceptorFunction';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';

const Walletscreen = () => {
  const firstCashout = useSelector(state => state.commonReducer.cashout);
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const [isVisible, setIsVisible] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [finalAmount, setfinalAmount] = useState(false);

  const [data, setData] = useState([]);
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
  ];

  const transactionhistory = async () => {
    const url = 'auth/transaction';
    const response = await Get(url, token);
    if (response != undefined) {
      setIsHistory(!isHistory);
      setData(response?.data?.date?.transactions);
    }
  };

  useEffect(() => {
    data?.map((item, index) => {
      const wallet_amount = userData?.wallet?.balance - item?.amount;
      setfinalAmount(wallet_amount);
    });
  }, [data?.status === 'approved' && userData.wallet.balance > data?.amount]);
  return (
    <SafeAreaView
      style={{
        height: windowHeight,
        width: windowWidth,
        // paddingVertical : moderateScale(25,.6),
        backgroundColor: Color.white,
      }}>
      <Header
        headerColor={Color.white}
        showBack={false}
        textstyle={{fontWeight: 'regular'}}
        title={' your Wallet'}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
              transactionhistory();
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
            data={data}
            // data={[]}
            style={
              {
                // backgroundColor :'red'
              }
            }
            contentContainerStyle={{
              paddingBottom: moderateScale(80, 0.6),
            }}
            renderItem={({item, index}) => {
              console.log('================== >>>', item);
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
                      {moment(item?.created_at).format('l')}
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
                      {moment(data?.wallet?.transaction?.created_at).format(
                        'LT',
                      )}
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
                      {item?.type}
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
            ListEmptyComponent={
              <CustomText
                style={{
                  height: '100%',
                  width: '100%',
                  color: Color.black,
                  textAlign: 'center',
                  paddingTop: windowHeight * 0.15,
                  fontSize: moderateScale(12, 0.6),
                }}>
                No transaction yet !{' '}
              </CustomText>
            }
          />
        )}
      </View>
      {/* </ScrollView> */}
      <CashoutModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </SafeAreaView>
  );
};

export default Walletscreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    paddingVertical: moderateScale(25, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    alignItems: 'center',
  },
  cardStyle: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
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
