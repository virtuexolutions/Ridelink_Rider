import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
import {Rating} from 'react-native-ratings';
import {getDistance} from 'geolib';
import {baseUrl} from '../Config';

const RequestModal = ({
  isVisible,
  onBackdropPress,
  data,
  onPressAccept,
  onPressDecline,
}) => {
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const riderOrigin = {
    lat: parseFloat(data?.ride_info?.rider?.lat),
    lng: parseFloat(data?.ride_info?.rider?.lng),
  };
  const riderDistination = {
    lat: parseFloat(data?.ride_info?.pickup_location_lat),
    lng: parseFloat(data?.ride_info?.pickup_location_lng),
  };
  useEffect(() => {
    if (riderOrigin && riderDistination != null) {
      const checkDistanceBetween = getDistance(riderOrigin, riderDistination);
      let km = Math.round(checkDistanceBetween / 1000);
      setDistance(km);
      const getTravelTime = async () => {
        // const apikey ='AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM'
        const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${riderOrigin.lat},${riderOrigin.lng}&destinations=${riderDistination.lat},${riderDistination.lng}&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            return setTime(travelTime);
          } else {
            console.error('Error fetching travel time:', data.status);
            return null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getTravelTime();
    }
  }, [riderDistination]);
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        aligndatas: 'center',
      }}
      onBackdropPress={onBackdropPress}>
      <View style={styles.main_view}>
        <View style={styles.sub_view}>
          <View style={styles.header_view}>
            <View style={styles.image_view}>
              <CustomImage
                style={styles.image}
                source={{uri: `${baseUrl}/${data?.ride_info?.rider?.photo}`}}
              />
            </View>
            <View style={styles.text_view}>
              <CustomText isBold style={styles.name}>
                {data?.ride_info?.rider?.name}
              </CustomText>
              <Rating
                type="custom"
                //   readonly
                startingValue={55}
                ratingCount={5}
                ratingColor={Color.yellow}
                imageSize={moderateScale(10, 0.3)}
                tintColor={Color.white}
                style={{alignSelf: 'flex-start'}}
              />
              <CustomText style={styles.text}>
                fdf
                {/* {data?.ride_info?.rider?.} */}
              </CustomText>
            </View>
            <View>
              <CustomText
                style={[
                  styles.text,
                  {
                    // marginRight :moderateScale(50 ,0.3),
                    width: '80%',
                  },
                ]}>
                {time} time
              </CustomText>
              <CustomText style={[styles.text]}>{distance} km</CustomText>
            </View>
          </View>
          <View style={styles.seatView}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: moderateScale(5, 0.6),
                }}>
                <View style={styles.icon_view}>
                  <Icon
                    name="battery-charging"
                    as={MaterialCommunityIcons}
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                </View>
                <View>
                  <CustomText isBold style={[styles.text1]}>
                    PickUp
                  </CustomText>
                  <CustomText
                    numberOfLines={2}
                    style={[
                      styles.text1,
                      {
                        width: windowWidth * 0.72,
                      },
                    ]}>
                    {data?.ride_info?.location_from}
                  </CustomText>
                </View>
              </View>
              <CustomText
                isBold
                style={[
                  styles.text1,
                  {
                    position: 'absolute',
                    color: 'black',
                    top: 35,
                    marginLeft: moderateScale(-3, 0.6),
                    transform: [{rotate: '-90deg'}],
                  },
                ]}>
                -----
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: moderateScale(10, 0.6),
                }}>
                <View style={styles.icon_view}>
                  <Icon
                    name="battery-charging"
                    as={MaterialCommunityIcons}
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                </View>
                <View>
                  <CustomText isBold style={[styles.text1]}>
                    DropOff
                  </CustomText>
                  <CustomText
                    numberOfLines={2}
                    style={[
                      styles.text1,
                      {
                        width: windowWidth * 0.72,
                      },
                    ]}>
                    {data?.ride_info?.location_to}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              aligndatas: 'center',
              marginTop: moderateScale(8, 0.6),
            }}>
            <CustomText isBold style={{fontSize: moderateScale(16, 0)}}>
              Total
            </CustomText>
            <CustomText isBold style={{fontSize: moderateScale(16, 0)}}>
              {`$${data?.ride_info?.amount}`}
            </CustomText>
          </View>
        </View>
        <CustomButton
          width={windowWidth * 0.92}
          height={windowHeight * 0.075}
          bgColor={Color.themeBlack}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.white}
          textTransform={'none'}
          text={'See The Rider'}
          isBold
          style={{top: moderateScale(-35)}}
          marginBottom={moderateScale(10, 0.6)}
          onPress={onPressAccept}
        />
        {/* <CustomButton
          width={windowWidth * 0.92}
          height={windowHeight * 0.075}
          bgColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          textColor={Color.black}
          isBold
          textTransform={'none'}
          text={'DEClINE'}
          style={{top: moderateScale(-40)}}
          marginBottom={moderateScale(10, 0.6)}
          borderWidth={2}
          onPress={onPressDecline}
        /> */}
      </View>
    </Modal>
  );
};

export default RequestModal;

const styles = StyleSheet.create({
  main_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'rgba(225, 225, 225, 0.20)',
    alignSelf: 'center',
  },
  sub_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    marginHorizontal: moderateScale(18, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(13, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image_view: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
    borderRadius: windowWidth,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    aligndatas: 'center',
    paddingVertical: moderateScale(10, 0.6),
    borderBottomWidth: 0.6,
    borderBottomColor: Color.grey,
  },
  text_view: {
    marginLeft: moderateScale(10, 0.6),
    width: '70%',
  },
  name: {
    fontSize: moderateScale(14, 0.6),
  },
  text: {
    fontSize: moderateScale(11, 0.6),
    // backgroundColor :'red'
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    borderBottomColor: Color.grey,
    borderBottomWidth: 0.2,
    marginTop: moderateScale(12, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'left',
    marginLeft: moderateScale(10, 0.6),
  },
  icon_view: {
    width: moderateScale(15, 0.6),
    height: moderateScale(15, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowWidth,
    justifyContent: 'center',
    // aligndatas: 'center',
    alignItems: 'center',
  },
});
