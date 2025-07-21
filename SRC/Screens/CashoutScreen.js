import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import navigationService from '../navigationService';

const CashoutScreen = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transaction_Count, setTransaction_count] = useState('');
  const [data, setData] = useState({});
  const transaction = async () => {
    const body = {
      amount: amount,
      type: 'withdraw',
    };
    const url = 'auth/withdraw';
    setIsLoading(true);
    const respose = await Post(url, body, apiHeader(token));

    setIsLoading(false);
    if (respose != undefined) {
      console.log(respose?.data);
      // dispatch(setUserData(respose?.data?.user_info));
      setAmount(0);
      setTransaction_count(respose?.data?.withdraw_count_today);

      setData(respose?.data?.user_info);
      navigationService.navigate('ConfirmationScreen', {
        data: data,
        id: respose?.data?.transaction_id,
        withDraw_amount: respose?.data,
      });
    }
  };

  // useEffect(() => {
  //   console.log('bhai use effect toh chl rhaaaaa hai ')
  //   const approvedItems = data?.filter(
  //     item => item.status.toLowerCase() === 'approved',
  //   );
  // return  console.log('🚀 ~ useEffect ~ approvedItems:', approvedItems);
  //   const latestApproved = approvedItems?.sort(
  //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  //   )[0];

  //   // Check if this one is already processed
  //   if (latestApproved.id !== lastProcessedId) {
  //     console.log(
  //       'detect hogya hain apk paiseeeeeeeeeeeeeeeeeeeeeeeeeeeeee  broooooooooooooo',
  //     );
  //     // dispatch(updateWithdrawAmount(latestApproved.amount));
  //     // setLastProcessedId(latestApproved.id);
  //   }
  // }, [data?.length > 0]);
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
    <SafeAreaView style={styles.main_con}>
      <Header showBack={true} title={'Instant Cash Out'} />
      {/* <View style={styles.main_con}> */}
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
        placeholder={
          isLoading ? (
            <ActivityIndicator size={'small'} color={Color.white} />
          ) : (
            'Amount to Withdraw'
          )
        }
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
        keyboardType={'numeric'}
      />
      <View style={styles.row}>
        <CustomText style={styles.txt}>Transaction Count</CustomText>
        <CustomText
          style={styles.count_text}>{`${transaction_Count}/3`}</CustomText>
      </View>
      {/* <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
          style={styles.btn}>
          <CustomText style={styles.h1}>select payment method</CustomText>
          <Icon
            name="keyboard-arrow-down"
            as={MaterialIcons}
            size={moderateScale(18, 0.6)}
            color={Color.black}
          />
        </TouchableOpacity> */}
      <CustomButton
        disabled={amount < 6 || transaction_Count == 3}
        style={{
          position: 'absolute',
          bottom: 50,
        }}
        onPress={() => {
          transaction();
        }}
        text={
          isLoading ? (
            <ActivityIndicator size={'small'} color={Color.white} />
          ) : (
            'WithDraw now'
          )
        }
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
      {/* </View> */}
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
    paddingVertical: moderateScale(30, 0.6),
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
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Color.darkBlue,
  },
  line: {
    borderWidth: 0.2,
    marginVertical: moderateScale(3, 0.6),
    borderColor: Color.darkBlue,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.93,
  },
});
