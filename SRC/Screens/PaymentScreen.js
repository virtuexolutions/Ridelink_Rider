import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import PaymentMethodCard from '../Components/PaymentMethodCard';
import CreditCardComponent from '../Components/CreditCardComponent';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {CardField, createToken} from '@stripe/stripe-react-native';
import LinearGradient from 'react-native-linear-gradient';

const PaymentScreen = props => {
  const data = props?.route?.params?.data;
  const [loading, setLoading] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);

  const strpieToken = async () => {
    setLoading(true);
    const responsetoken = await createToken({
      type: 'Card',
    });

    if (responsetoken != undefined) {
      setStripeToken(responsetoken?.token?.id);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.safe_area}>
      <Header showBack={true} title={'Offer Your Fare'} />
      <View style={styles.main_view}>
        <PaymentMethodCard
          fare={data?.ride_info?.amount}
          paymentMethod={data?.ride_info?.payment_method}
          isEnabled={data?.ride_info?.nearest_cab}
        />
        {/* <CreditCardComponent /> */}
        <LinearGradient
          colors={['#1f1f1f', '#cfcfcf']} // Adjust these colors for a closer match
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.addcard}
          // style={styles.modal}
        >
          {/* <View style={styles.modal}> */}
          <View style={styles.header}>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(13, 0.6),
              }}>
              Add Card Details
            </CustomText>
          </View>

          <CardField
            postalCodeEnabled={false}
            placeholderColor={Color.darkGray}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            // placeholdersColor={'black'}
            cardStyle={{
              backgroundColor: Color.white,
              borderRadius: moderateScale(15, 0.6),
              width: windowWidth * 0.5,
              borderRadius: moderateScale(35, 0.6),
              // placeholderColor:'red',
              textColor: 'black',
              placeholderColor: Color.darkGray,
            }}
            style={{
              width: '95%',
              height: windowHeight * 0.06,
              marginVertical: moderateScale(10, 0.3),
            }}
            onCardChange={cardDetails => {}}
            onFocus={focusedField => {}}
          />
          <CustomButton
            textColor={Color.black}
            text={
              loading ? (
                <ActivityIndicator color={'black'} size={'small'} />
              ) : (
                'add'
              )
            }
            onPress={() => {
              strpieToken();
            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            bgColor={'white'}
            // isGradient={true}
            isBold
            disabled={loading}
          />
          {/* </View> */}
        </LinearGradient>

        <CustomText isBold style={styles.heading}>
          Details
        </CustomText>
        <View style={styles.card}>
          <View style={[styles.text_view, {marginTop: 0}]}>
            <CustomText style={styles.heading_text}>Sub Total</CustomText>
            <CustomText
              style={styles.text}>{`$${data?.ride_info?.amount}`}</CustomText>
          </View>
          <View style={styles.text_view}>
            <CustomText style={styles.heading_text}>Sub Total</CustomText>
            <CustomText
              style={styles.text}>{`$${data?.ride_info?.amount}`}</CustomText>
          </View>
          <View style={styles.text_view}>
            <CustomText style={styles.heading_text}>Sub Total</CustomText>
            <CustomText
              style={styles.text}>{`$${data?.ride_info?.amount}`}</CustomText>
          </View>
        </View>
        <View style={styles.text_view}>
          <CustomText isBold style={[styles.heading, {marginTop: 0}]}>
            Total
          </CustomText>
          <CustomText
            style={styles.text}>{`$${data?.ride_info?.amount}`}</CustomText>
        </View>
        <CustomButton
          width={windowWidth * 0.9}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'PAY NOW'}
          marginTop={moderateScale(25, 0.6)}
          marginBottom={moderateScale(10, 0.6)}
          onPress={() => navigationService.navigate('RateScreen', {data: data})}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safe_area: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
  },
  main_view: {
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    height: windowHeight,
    width: windowWidth,
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  heading: {
    fontSize: moderateScale(16, 0.6),
    color: Color.grey,
    marginTop: moderateScale(15, 0.6),
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, 0),
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    Color: Color.black,
    fontWeight: '700',
  },
  heading_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  addcard: {
    borderRadius: moderateScale(14, 0.4),
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6),
    overflow: 'hidden',
    // paddingHorizontal: moderateScale(15, 0.6),
    // paddingVertical: moderateScale(20, 0.6),
  },
  header: {
    width: '100%',
    height: windowHeight * 0.05,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: moderateScale(10, 0.6),
  },
  modal: {
    // backgroundColor: Color.black,
    // backgroundColor: 'rgba(109, 106, 108, 0.72)',
    // // backgroundColor: 'rgba(76, 73, 75, 0.79)',
    // // backgroundColor: 'rgba(36, 35, 36, 0.53)',
    backgroundColor: 'red',

    borderRadius: moderateScale(14, 0.4),
    borderWidth: 2,
    borderColor: Color.themeBlack,
    width: windowWidth * 0.9,
    // height: windowHeight * 0.3,
    paddingBottom: moderateScale(20, 0.6),
    flexDirection: 'column',
    // alignItems: 'center',
    // paddingTop: windowHeight * 0.03,
    // gap: 12,
    overflow: 'hidden',
  },
});
