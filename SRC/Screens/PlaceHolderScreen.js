// RideStatusPlaceholderScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';

const PlaceHolderScreen = () => {
    const navigation = useNavigation();
    const [requestList, setRequestList] = useState([]);
    console.log("🚀 ~ PlaceHolderScreen ~ requestList:", requestList)
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.authReducer.token);
    const isFocused = useIsFocused();

    useEffect(() => {
        rideRequestList()
    }, [])

    const rideRequestList = async () => {
        const url = `auth/rider/ride-request-list?type[0]=ride`;
        setIsLoading(true);
        console.log('🚀 ~ rideRequestList ~ url: >>>>>', url);
        try {
            const response = await Get(url, token);
            const rides = response?.data?.ride_info;
            console.log('🚀 ~ rideRequestList ~ response:', JSON.stringify(rides, null, 2));
            if (Array.isArray(rides) && rides.length > 0) {
                const ride = rides[0]?.ride_info;
                console.log("🚀 ~ rideRequestList ~ ride:", ride)
                const status = ride?.status?.toLowerCase();
                console.log("🚀 ~ rideRequestList ~ status:", status)
                const goHomeStatuses = ['pending', 'cancelled', 'completed', 'reviewed'];
                console.log("🚀 ~ rideRequestList ~ goHomeStatuses:", goHomeStatuses.includes(status))
                if (goHomeStatuses.includes(status)) {
                    navigationService.navigate('Home');
                } else {
                    navigationService.navigate('RideScreen', {
                        data: ride,
                        type: 'details',
                    });
                }

                setRequestList(rides);
            } else {
                setRequestList([]);
                navigationService.navigate('Home');
            }
        } catch (error) {
            console.error('Error fetching ride requests:', error);
            navigationService.navigate('Home');
        }

        setIsLoading(false);
    };


    // useEffect(() => {
    //     const checkRideStatus = async () => {
    //         try {
    //             const response = await axios.get('https://your-api-url.com/api/ride/status');

    //             if (response.data.status === 'on_the_way') {
    //                 navigation.replace('TrackingScreen');
    //             } else {
    //                 navigation.replace('HomeScreen');
    //             }

    //         } catch (error) {
    //             console.error('Ride status check failed:', error);
    //             navigation.replace('HomeScreen');
    //         }
    //     };

    //     const timeout = setTimeout(() => {
    //         checkRideStatus();
    //     }, 1000);

    //     return () => clearTimeout(timeout);
    // }, []);

    return (
        <View style={styles.container}>
            <SkeletonPlaceholder borderRadius={8} >
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item marginTop={6} width={180} height={20} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item marginTop={30}>
                    <SkeletonPlaceholder.Item width="100%" height={200} borderRadius={10} />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item marginTop={30}>
                    <SkeletonPlaceholder.Item width="100%" height={200} borderRadius={10} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
};

export default PlaceHolderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});
