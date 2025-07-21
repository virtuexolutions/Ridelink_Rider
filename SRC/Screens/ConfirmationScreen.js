import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import moment from 'moment';

const ConfirmationScreen = props => {
  // const data = props?.route?.params?.data;
  const transaction = props?.route?.params?.id;
  const data = props?.route?.params?.withDraw_amount;
  
  return (
    <SafeAreaView style={{
      height : windowHeight ,
      width : windowWidth ,
      paddingVertical : moderateScale(20,.6),
      backgroundColor : Color.lightGrey
    }}>
      <Header headerColor={Color.lightGrey}   showBack={true} />

      <View style={styles.con}>
        <View style={styles.image_Con}>
          <CustomImage
            style={styles.image}
            source={require('../Assets/Images/check.png')}
          />
        </View>
        <CustomText
          style={{
            fontSize: moderateScale(15, 0.6),
            textAlign: 'center',
            color: Color.black,
            letterSpacing: 0.56,
          }}>
          transaction sucessful
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(11, 0.6),
            textAlign: 'center',
            color: Color.black,
          }}>
          transaction sucessfully {data?.user_info?.wallet?.transaction?.amount}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(15, 0.6),
            paddingTop: moderateScale(15, 0.6),
          }}>
          Details
        </CustomText>
        {/* <View style={styles.row}>t
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            transaction id :
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
           {transaction}
          </CustomText>
        </View> */}

        <View style={styles.row}>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            time :
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            {moment(data?.wallet?.transaction?.created_at).format('LT')}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            date :
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            {moment(data?.wallet?.transaction?.created_at).format('l')}
          </CustomText>
        </View>
        {/* <View style={styles.row}>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            payment methode :
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            {data?.wallet?.transaction?.type}
          </CustomText>
        </View> */}
        <View style={styles.row}>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            total amount
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            {data?.user_info?.wallet?.transaction?.amount} 
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            status :
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'center',
              color: Color.black,
            }}>
            {data?.user_info?.wallet?.transaction?.status} 
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  con: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.45,
    marginVertical: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    marginTop : windowHeight *0.1,
  },
  image_Con: {
    marginTop: windowHeight * 0.03,
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    borderRadius: (windowHeight * 0.07) / 2,
    alignSelf: 'center',
    marginVertical: moderateScale(10, 0.6),
    shadowColor: '#4aa0f0',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: moderateScale(20, 0.6),
    borderBottomColor: Color.mediumGray,
    borderBottomWidth: 0.3,
  },
});
