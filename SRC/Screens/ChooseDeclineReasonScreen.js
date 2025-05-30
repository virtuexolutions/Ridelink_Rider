import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../Components/Header';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const ChooseDeclineReasonScreen = prop => {
  const data = prop?.route?.params?.data;
  const token = useSelector(state => state.authReducer.token);
  const array = [
    {id: 1, reason: 'Price too High', checked: true},
    {id: 2, reason: 'Long Wait Time', checked: true},
    {id: 3, reason: 'Poor Vehicle Condition', checked: true},
    {id: 4, reason: 'Safety Concerns', checked: true},
    {id: 5, reason: 'Inconvenient Payment Options', checked: true},
    {id: 6, reason: 'Negative Past Experience', checked: true},
    {id: 7, reason: 'Preference for Ride-Hailing Apps', checked: true},
    {id: 8, reason: 'Unfamiliarity with the Service', checked: true},
    {id: 9, reason: 'Route Concerns', checked: true},
    {id: 10, reason: 'Rider no-show', checked: true},
    {id: 11, reason: 'Wrong address', checked: true},
    {id: 12, reason: 'Emergency', checked: true},
    {id: 13, reason: 'Unsafe behavior', checked: true},
    {id: 14, reason: 'App issue / bug', checked: true},


  ];
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState({});

  const rideCancel = async () => {
    const body = {
      ride_status: 'pending',
      // ride_status: data?.status,
      status: 'cancel',
      reason: reason?.reason,
    };
    const url = `auth/ride_cancel/${data?.ride_id}`;
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigationService.navigate('Home');
    }
  };

  return (
    <SafeAreaView>
      <Header
        headerColor={'transparent'}
        title={'Choose Decline Reason'}
        showBack={true}
      />
      <View style={styles.mainView}>
        {array?.map((item, index) => {
          console.log("🚀 ~ {array?.map ~ item:", item)
          return (
            <TouchableOpacity
              onPress={() => {
                setReason(item);
              }}
              style={[styles.reasons]}>
              <CustomText
                style={{color: Color.grey, fontSize: moderateScale(12, 0.2)}}>
                {item?.reason}
              </CustomText>
              <Icon
                color={reason?.id == item?.id ? Color.blue : Color.mediumGray}
                name={'check'}
                as={Entypo}
              />
            </TouchableOpacity>
          );
        })}
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Submit'
            )
          }
          fontSize={moderateScale(15, 0.3)}
          textColor={Color.white}
          borderColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          bgColor={Color.darkBlue}
          isBold
          marginTop={moderateScale(32, 0.3)}
          onPress={() => {
            rideCancel();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseDeclineReasonScreen;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  reasons: {
    width: windowWidth,
    paddingHorizontal: 15,
    marginTop: moderateScale(21, 0.2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
