// RideStatusPlaceholderScreen.js

import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import navigationService from '../navigationService';

const PlaceHolderScreen = () => {
  const navigation = useNavigation();
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();

  useEffect(() => {
    rideRequestList();
  }, [isFocused]);

  const rideRequestList = async () => {
    const url = `auth/rider/ride-request-list?type[0]=ride`;
    setIsLoading(true);

    try {
      const response = await Get(url, token);
      const rides = response?.data?.ride_info;

      console.log(rides, '==========================> rides');

      if (Array.isArray(rides) && rides.length > 0) {
        const activeStatuses = ['accept', 'arrive', 'ontheway', 'riderarrived'];
        const goHomeStatuses = [
          'pending',
          'cancel',
          'complete',
          'reviewed',
          'ride_completed',
          'delivered',
        ];

        const activeRide = rides.find(item =>
          activeStatuses.includes(item?.ride_info?.status?.toLowerCase())
        );
        console.log(activeRide, 'activeRide')

        if (activeRide) {
          navigationService.navigate('RideScreen', {
            data: activeRide.ride_info,
            type: 'details',
          });
        } else {
          navigationService.navigate('Home');
        }
        setRequestList(rides);
      } else {
        setRequestList([]);
        navigationService.navigate('Home');
      }
    } catch (error) {
      console.error('❌ Error fetching ride requests:', error);
      navigationService.navigate('Home');
    }

    setIsLoading(false);
  };



  return (
    <View style={styles.container}>
      <SkeletonPlaceholder borderRadius={8}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginTop={moderateScale(40, 0.6)}>
          <SkeletonPlaceholder.Item
            width={50}
            height={50}
            borderRadius={30}
            position="absolute"
            right={10}
          />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item marginTop={moderateScale(40, 0.6)}>
          <SkeletonPlaceholder.Item
            width="100%"
            height={40}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item
            width="100%"
            height={200}
            borderRadius={10}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item
            width="100%"
            height={50}
            borderRadius={30}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default PlaceHolderScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop : windowHeight *0.1,
    // flex: 1,
    padding: moderateScale(20, 0.6),
    justifyContent: 'center',
  },
});
