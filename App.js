
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';
import {LogBox, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './SRC/Components/CustomImage';
import CustomText from './SRC/Components/CustomText';
import SplashScreen from './SRC/Screens/SplashScreen';
import {persistor, store} from './SRC/Store/index';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
  windowHeight,
  windowWidth,
} from './SRC/Utillity/utils';
import AppNavigator from './SRC/appNavigation';

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey();
    setPublishableKey(key);
  };

  console.reportErrorsAsExceptions = false;
  console.reportErrorsAsExceptions = false;

  const [notification, setNotification] = useState();
  const [notificationModal, setNotificationModal] = useState(false);


    LogBox.ignoreLogs([
    'Warning: ...',
    'VirtualizedLists should never be nested',
  ]);
  LogBox.ignoreAllLogs();
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51NjQZRBqyObuQCkVVZujGGQ9w7PjZegPiZvL9MEH12KsxQmTsLpBxsXdeyN8Tu3mYkN8YZt8WutsTCEexDwIOxaB00a6zjjE12'
      }>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <MainContainer />
          </NativeBaseProvider>
        </PersistGate>
        {notificationModal === true && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setNotificationModal(false)}
            style={{
              width: windowWidth * 0.95,
              height: windowHeight * 0.08,
              backgroundColor: Color.lightGrey,
              alignSelf: 'center',
              borderRadius: moderateScale(15, 0.6),
              position: 'absolute',
              top: 10,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingHorizontal: moderateScale(15, 0.6),
                flexDirection: 'row',
                marginTop: moderateScale(10, 0.6),
              }}>
              <View
                style={{
                  height: moderateScale(40, 0.6),
                  width: moderateScale(40, 0.6),
                  marginRight: moderateScale(10, 0.6),
                }}>
                <CustomImage
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'cover'}
                  // source={require('./SRC/Assets/Images/notification.png')}
                />
              </View>
              <View style={{width: windowWidth * 0.8}}>
                <CustomText isBold style={{fontSize: moderateScale(14, 0.3)}}>
                  {'notification?.title'}
                </CustomText>
                <CustomText
                  numberOfLines={1}
                  style={{fontSize: moderateScale(12, 0.3)}}>
                  {'notification?.body'}
                </CustomText>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  useEffect(() => {
    async function GetPermission() {
      await requestLocationPermission();
      await requestCameraPermission();
      await requestWritePermission();
    }
    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(5000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;
