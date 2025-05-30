import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import {AirbnbRating} from 'react-native-ratings';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import moment from 'moment';
import navigationService from '../navigationService';

const ReviewModal = ({item, setRef, rbRef, setClientReview}) => {
  console.log('🚀 ~ ReviewModal ~ rbRef:', rbRef);
  const token = useSelector(state => state.authReducer.token);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const sendReview = async () => {
    const body = {
      rating: rating,
      review: review,
      ride_id: item?.type == 'delivery' ? item?.delivery_id : item?.ride_id,
      rider_id: item?.rider?.id,
    };
    if (rating == 0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please give a review', ToastAndroid.SHORT)
        : alert('Please give a review');
    }
    if (review == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please give some feedback', ToastAndroid.SHORT)
        : alert('Please give some feedback');
    }
    const url = 'auth/review';
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ sendReview ~ response:', response?.data);
    setLoading(false);
    if (response != undefined) {
      rbRef.current.close();
      navigationService.navigate('Home');
      // setClientReview({
      //   rating: rating,
      //   description: review,
      //   created_at: moment().format(),
      // });
    }
  };

  return (
    <RBSheet
      ref={rbRef}
      closeOnDragDown={true}
      height={370}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            width: windowWidth * 0.6,
            fontSize: 22,
            textAlign: 'center',
            color: Color.btn_Color,
            marginTop: moderateScale(10, 0.6),
          }}>
          Please share your experience
        </CustomText>
        <AirbnbRating
          reviewColor={Color.btn_Color}
          reviewSize={25}
          size={25}
          count={5}
          reviews={['OK', 'Good', 'Very Good', 'Wow', 'Amazing']}
          defaultRating={0}
          onFinishRating={rating => {
            setRating(rating);
          }}
        />
        <View
          style={{
            marginTop: 10,
          }}
        />

        <TextInputWithTitle
          multiline={true}
          secureText={false}
          placeholder={'Your review'}
          setText={setReview}
          value={review}
          viewHeight={0.15}
          viewWidth={0.75}
          inputWidth={0.66}
          border={1}
          borderColor={Color.btn_Color}
          backgroundColor={'#FFFFFF'}
          color={Color.btn_Color}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(25, 0.3)}
        />

        <CustomButton
          text={
            loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              'send review'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          marginTop={moderateScale(15, 0.3)}
          onPress={() => {
            sendReview();
          }}
          bgColor={Color.btn_Color}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
          //   bgColor={Color.themeColor}
          // isGradient={true}
          borderColor={'white'}
          borderWidth={1}
        />
      </View>
    </RBSheet>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 22,
    color: Color.btn_Color,
    padding: moderateScale(10, 0.3),
  },
  input: {
    paddingHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.8,
    backgroundColor: Color.lightGrey,
    borderRadius: 10,
    height: windowHeight * 0.2,
    marginVertical: moderateScale(20, 0.3),
  },
});
