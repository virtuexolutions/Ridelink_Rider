import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Drawer from './Drawer/Drawer';
import navigationService from './navigationService';
import AccountVerificationScreen from './Screens/AccountVerificationScreen';
import AddYourCar from './Screens/AddYourCar';
import CashoutScreen from './Screens/CashoutScreen';
import ChangePassword from './Screens/ChangePassword';
import ChooseDeclineReasonScreen from './Screens/ChooseDeclineReasonScreen';
import ConfirmationScreen from './Screens/ConfirmationScreen';
import DeliveryScreen from './Screens/DeliveryScreen';
import FareScreen from './Screens/FareScreen';
import History from './Screens/History';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
// import MapScreen from './Screens/MapScreen';
import MessagesScreen from './Screens/MessagesScreen';
import PassengerDetails from './Screens/PassengerDetails';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceHolderScreen from './Screens/PlaceHolderScreen';
import Profile from './Screens/Profile';
import RateScreen from './Screens/RateScreen';
import ReferFriendScreen from './Screens/ReferFriendScreen';
import ResetPassword from './Screens/ResetPassword';
import RideRequest from './Screens/RideRequest';
import RideScreen from './Screens/RideScreen';
import SendTripRecieptScreen from './Screens/SendTripRecieptScreen';
import Signup from './Screens/Signup';
import VerifyEmail from './Screens/VerifyEmail';
import VerifyNumber from './Screens/VerifyNumber';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import Walletscreen from './Screens/Walletscreen';
import TermsAndConditions from './Screens/TermsAndConditions';
import HelpAndSupport from './Screens/HelpAndSupport';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import PhoneRegistration from './Screens/PhoneRegistration';
import Notification from './Screens/Notification';
// import ReferFriendScreen from './Screens/ReferFriendScreen';
// import LearningCenter from './Screens/LearningCenter';
// import PrivacyPolicy from './Screens/PrivacyPolicy';

enableScreens();
const AppNavigator = () => {
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ AppNavigator ~ token:', token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ AppNavigator ~ userData: ===================', userData?.car_info);
  const RootNav = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'WalkThroughScreen' :
        [null ,'' ,undefined].includes(token)
        // : token == null
        ? 'LoginScreen'
        : userData?.car_info == null
        ? 'AddYourCar'
        : userData?.acc_active == 'pending'
        ? 'AccountVerificationScreen'
        : 'MyDrawer';
    console.log('🚀 ~ AppNavigatorContainer ~ firstScreen:', firstScreen);

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="FareScreen" component={FareScreen} />
          <RootNav.Screen name="VerifyEmail" component={VerifyEmail} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          {/* <RootNav.Screen name="ChangePassword" component={ChangePassword} /> */}
          <RootNav.Screen name="Signup" component={Signup} />
          {/* <RootNav.Screen name="MapScreen" component={MapScreen} /> */}
          <RootNav.Screen name="RideRequest" component={RideRequest} />
          <RootNav.Screen name="PaymentScreen" component={PaymentScreen} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          {/* <RootNav.Screen name="Profile" component={Profile} /> */}
          <RootNav.Screen name="RateScreen" component={RateScreen} />
          <RootNav.Screen name="MessagesScreen" component={MessagesScreen} />
          <RootNav.Screen
            name="PlaceHolderScreen"
            component={PlaceHolderScreen}
          />
          {/* <RootNav.Screen name="Home" component={Home} /> */}
          <RootNav.Screen
            name="AccountVerificationScreen"
            component={AccountVerificationScreen}
          />
          <RootNav.Screen name="AddYourCar" component={AddYourCar} />
          <RootNav.Screen name="Walletscreen" component={Walletscreen} />
          <RootNav.Screen name="RideScreen" component={RideScreen} />
          <RootNav.Screen
            name="PhoneRegistration"
            component={PhoneRegistration}
          />

          {/* <RootNav.Screen name="History" component={History} /> */}
          {/* <RootNav.Screen name="PrivacyPolicy" component={PrivacyPolicy} /> */}

          <RootNav.Screen name="HelpAndSupport" component={HelpAndSupport} />
          {/* <RootNav.Screen
            name="ReferFriendScreen"
            component={ReferFriendScreen}
          /> */}

          <RootNav.Screen
            name="PassengerDetails"
            component={PassengerDetails}
          />
          <RootNav.Screen
            name="RecieptScreen"
            component={SendTripRecieptScreen}
          />
          <RootNav.Screen
            name="ChooseDeclineReasonScreen"
            component={ChooseDeclineReasonScreen}
          />
          <RootNav.Screen name="DeliveryScreen" component={DeliveryScreen} />
          <RootNav.Screen name="CashoutScreen" component={CashoutScreen} />
          <RootNav.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
          />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

// export const TabNavigation = () => {
//   const Tabs = createBottomTabNavigator();
//   return (
//     <Tabs.Navigator
//       // tabBar={(props) => {
//       //   return (
//       //     <LinearGradient
//       //       colors={['red', 'blue']}

//       //       start={[1, 0]}
//       //       end={[0, 0]}
//       //     >
//       //       <BottomTabBar
//       //         {...props}
//       //         style={{ backgroundColor: 'transparent' }}
//       //       />
//       //     </LinearGradient>
//       //   );
//       // }}
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           // backgroundColor:'pink',
//           // backgroundColor: Color.red,
//           // borderTopLeftRadius:15,
//           // borderTopRightRadius:15,
//           // paddingVertical:5
//         },
//         tabBarIcon: ({focused}) => {
//           let iconName;
//           let color = Color.theme2;
//           let size = moderateScale(20, 0.3);
//           let type = Ionicons;

//           // if (route.name === 'HomeScreen') {
//           //   iconName = focused ? 'home' : 'home-outline';

//           //   color = focused ? Color.theme2 : Color.white;
//           //   size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           // } else
//           if (route.name === 'Donation') {
//             iconName = focused ? 'donate' : 'donate';
//             type = FontAwesome5;
//             color = focused ? Color.theme2 : Color.white;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'StoreScreen') {
//             iconName = focused ? 'cart' : 'cart';
//             color = focused ? Color.theme2 : Color.white;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route?.name == 'Campaigns') {
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else {
//             iconName = focused ? 'settings-sharp' : 'settings-outline';
//             color = focused ? Color.theme2 : Color.white;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           }
//           return route.name == 'Campaigns' ? (
//             <View
//               style={{
//                 borderWidth: 5,
//                 borderColor: Color.lightGrey,
//                 height: moderateScale(60, 0.3),
//                 width: moderateScale(60, 0.3),
//                 borderRadius: moderateScale(30, 0.3),
//                 backgroundColor: Color.theme2,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: moderateScale(-30, 0.3),
//               }}>
//               <Icon
//                 name={'search'}
//                 as={Feather}
//                 color={Color.white}
//                 size={size}
//               />
//             </View>
//           ) : (
//             <Icon name={iconName} as={type} color={color} size={size} />
//           );
//         },
//         tabBarShowLabel: false,
//         tabBarBackground: () => (
//           <View style={{flex: 1}}>
//             <LinearGradient
//               start={{x: 0, y: 0}}
//               end={{x: 0, y: 1}}
//               colors={Color.tabBarGradient}
//               style={{height: windowHeight * 0.1}}
//             />
//           </View>
//         ),
//       })}>
//       {/* <Tabs.Screen name={'HomeScreen'} component={HomeScreen} /> */}
//       {/* <Tabs.Screen name={'Donation'} component={Donation} />
//       <Tabs.Screen name={'Campaigns'} component={Campaigns} />
//       {/* <Tabs.Screen name={'BibleCategories'} component={BibleCategories} /> */}
//       {/* <Tabs.Screen name={'StoreScreen'} component={StoreScreen} /> */}
//       <Tabs.Screen name={'Settings'} component={Settings} />
//     </Tabs.Navigator>
//   );
// };

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const firstScreen = 'HomeScreen';
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'PlaceHolderScreen'}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
          borderTopRightRadius: moderateScale(120, 0.6),
          borderBottomRightRadius: moderateScale(120, 0.6),
        },
      }}>
      <DrawerNavigation.Screen name="Home" component={Home} />
      <DrawerNavigation.Screen
        name="PlaceHolderScreen"
        component={PlaceHolderScreen}
      />
      <DrawerNavigation.Screen name="Walletscreen" component={Walletscreen} />

      <DrawerNavigation.Screen name={'RateScreen'} component={RateScreen} />
      <DrawerNavigation.Screen name="RideRequest" component={RideRequest} />
      <DrawerNavigation.Screen name="RideScreen" component={RideScreen} />
      <DrawerNavigation.Screen name="PaymentScreen" component={PaymentScreen} />
      <DrawerNavigation.Screen name="History" component={History} />
      <DrawerNavigation.Screen name="AddYourCar" component={AddYourCar} />
      <DrawerNavigation.Screen name="Notification" component={Notification} />
      <DrawerNavigation.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
      <DrawerNavigation.Screen name="Profile" component={Profile} />

      <DrawerNavigation.Screen
        name="ReferFriendScreen"
        component={ReferFriendScreen}
      />
      <DrawerNavigation.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

      <DrawerNavigation.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />

      {/* <DrawerNavigation.Screen name="MapScreen" component={MapScreen} />             */}

      <DrawerNavigation.Screen
        name="RecieptScreen"
        component={SendTripRecieptScreen}
      />
      <DrawerNavigation.Screen
        name="PassengerDetails"
        component={PassengerDetails}
      />
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;
