import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {color, position} from 'native-base/lib/typescript/theme/styled-system';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import navigationService from '../navigationService';

const CashoutScreen = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  console.log(
    '🚀 ~ CashoutScreen ~ userData:',
    JSON.stringify(userData?.wallet?.balance, null, 2),
  );
  const [amount, setAmount] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const transaction = async ()=>{
  //   const body ={


  //   }
  //   const url =''
  //   setIsLoading(true)
  //   const respose = await Post(url ,body ,apiHeader(token))
  //   setIsLoading(false)
  //   if(respose != undefined){

  //   }
  // }
  // useEffect(() => {
  //   amount != '' && 
  //   amount > userData?.wallet?.balance && Platform.OS == 'android'
  //     ? ToastAndroid.show(
  //         'withdraw amount is greater then  available balance',
  //         ToastAndroid.SHORT,
  //       )
  //     : Alert.alert('withdraw amount is greater then  available balance');
  // }, [amount]);

  return (
    <SafeAreaView>
      <Header showBack={true} title={'Instant Cash Out'} />
      <View style={styles.main_con}>
        <View style={styles.cardStyle}>
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: moderateScale(40, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(16, 0.6),
                color: Color.white,
              }}>
              Available Balance
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
        <TextInputWithTitle
          title={'Amount  :'}
          placeholder={'Amount to Withdraw'}
          setText={setAmount}
          value={amount}
          viewHeight={0.055}
          viewWidth={0.9}
          inputWidth={0.8}
          border={1}
          borderRadius={30}
          backgroundColor={'transparent'}
          borderColor={Color.mediumGray}
          marginTop={moderateScale(8, 0.3)}
          placeholderColor={Color.mediumGray}
          titleStlye={{right: 10}}
        />
        <View style={styles.row}>
          <CustomText style={styles.txt}>Transaction Count</CustomText>
          <CustomText style={styles.count_text}>0/3</CustomText>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.93,
          }}>
          <CustomText style={styles.h1}>select payment method</CustomText>
          <Icon
            name="keyboard-arrow-down"
            as={MaterialIcons}
            size={moderateScale(18, 0.6)}
            color={Color.black}
          />
        </TouchableOpacity>
        <CustomButton
          style={{
            position: 'absolute',
            bottom: 90,
          }}
          onPress={() => {
            navigationService.navigate('ConfirmationScreen')
          }}
          text={'WithDraw now'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderWidth={1.5}
          borderColor={Color.darkBlue}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.8}
          height={windowHeight * 0.075}
          bgColor={Color.darkBlue}
          textTransform={'capitalize'}
          elevation
        />
        {isVisible && (
          <View style={styles.drop_down}>
            <TouchableOpacity
              onPress={() => {
                setSelectedPaymentMethod('bank');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText style={styles.h1}>bank</CustomText>
              <Icon
                name="bank"
                as={FontAwesome}
                size={moderateScale(18, 0.6)}
                color={Color.darkBlue}
              />
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity
              onPress={() => {
                setSelectedPaymentMethod('card');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText style={styles.h1}>card</CustomText>
              <Icon
                name="credit-card"
                as={EvilIcons}
                size={moderateScale(25, 0.6)}
                color={Color.darkBlue}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CashoutScreen;

const styles = StyleSheet.create({
  main_con: {
    height: windowHeight,
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    backgroundColor: Color.white,
  },
  cardStyle: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.18,
    backgroundColor: Color.darkBlue,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10, 0.6),
    justifyContent: 'space-between',
  },
  txt: {
    textAlign: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.6),
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
  },
  count_text: {
    textAlign: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.6),
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
  },
  h1: {
    paddingHorizontal: moderateScale(10, 0.6),
    fontSize: moderateScale(13, 0.6),
    color: Color.black,
  },
  drop_down: {
    marginVertical: moderateScale(4, 0.6),
    padding: moderateScale(10, 0.6),
    // width: windowWidth * 0.92,
    // height: windowHeight * 0.1,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Color.darkBlue,
  },
  line: {
    borderWidth: 0.2,
    marginVertical: moderateScale(3, 0.6),
    borderColor: Color.darkBlue,
  },
});
