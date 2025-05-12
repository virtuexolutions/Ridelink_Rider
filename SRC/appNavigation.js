import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationService from './navigationService';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from './Drawer/Drawer';
import LoginScreen from './Screens/LoginScreen';
import Signup from './Screens/Signup';
import VerifyNumber from './Screens/VerifyNumber';
import ChangePassword from './Screens/ChangePassword';
import ResetPassword from './Screens/ResetPassword';
import VerifyEmail from './Screens/VerifyEmail';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import Start from './Screens/Start';
import RequestScreen from './Screens/RequestScreen';
import FareScreen from './Screens/FareScreen';
import MapScreen from './Screens/MapScreen';
import RideScreen from './Screens/RideScreen';
import PaymentScreen from './Screens/PaymentScreen';
import Home from './Screens/Home';
import RateScreen from './Screens/RateScreen';
import RideRequest from './Screens/RideRequest';
import PassengerDetails from './Screens/PassengerDetails';
import GoOnlineScreen from './Screens/GoOnlineScreen';
import SendTripRecieptScreen from './Screens/SendTripRecieptScreen';
import { moderateScale } from 'react-native-size-matters';
import Walletscreen from './Screens/Walletscreen';
import Earningsscreen from './Screens/Earningsscreen';
import ChooseDeclineReasonScreen from './Screens/ChooseDeclineReasonScreen';
import Profile from './Screens/Profile';
import { enableScreens } from 'react-native-screens';
import MyWallet from './Screens/MyWallet';
import AddYourCar from './Screens/AddYourCar';
import History from './Screens/History';
import ReferFriendScreen from './Screens/ReferFriendScreen';
import MessagesScreen from './Screens/MessagesScreen';
import DeliveryScreen from './Screens/DeliveryScreen';
// import ReferFriendScreen from './Screens/ReferFriendScreen';
// import LearningCenter from './Screens/LearningCenter';
// import PrivacyPolicy from './Screens/PrivacyPolicy';

enableScreens();
const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'WalkThroughScreen'
        : token == null
          ? 'LoginScreen'
          : 'MyDrawer';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          // initialRouteName={'Walletscreen'}
          // initialRouteName={'RateScreen'}
          screenOptions={{ headerShown: false }}>
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="Start" component={Start} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="FareScreen" component={FareScreen} />
          <RootNav.Screen name="VerifyEmail" component={VerifyEmail} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="RequestScreen" component={RequestScreen} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="MapScreen" component={MapScreen} />
          <RootNav.Screen name="RideScreen" component={RideScreen} />
          <RootNav.Screen name="PaymentScreen" component={PaymentScreen} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="Profile" component={Profile} />
          <RootNav.Screen name="RateScreen" component={RateScreen} />
          <RootNav.Screen name="AddYourCar" component={AddYourCar} />
          <RootNav.Screen name="MessagesScreen" component={MessagesScreen} />
          <RootNav.Screen name="Home" component={Home} />


          {/* <RootNav.Screen name="History" component={History} /> */}
          {/* <RootNav.Screen name="PrivacyPolicy" component={PrivacyPolicy} /> */}
          {/* <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          /> */}
          {/* <RootNav.Screen name="HelpAndSupport" component={HelpAndSupport} /> */}
          {/* <RootNav.Screen
            name="ReferFriendScreen"
            component={ReferFriendScreen}
          /> */}

          <RootNav.Screen name="MyWallet" component={MyWallet} />

          <RootNav.Screen
            name="PassengerDetails"
            component={PassengerDetails}
          />
          <RootNav.Screen name="GoOnlineScreen" component={GoOnlineScreen} />
          <RootNav.Screen
            name="RecieptScreen"
            component={SendTripRecieptScreen}
          />
          <RootNav.Screen
            name="ChooseDeclineReasonScreen"
            component={ChooseDeclineReasonScreen}
          />
          <RootNav.Screen name="DeliveryScreen" component={DeliveryScreen} />
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
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
          borderTopRightRadius: moderateScale(120, 0.6),
          borderBottomRightRadius: moderateScale(120, 0.6),
        },
      }}>
      <DrawerNavigation.Screen name="Home" component={Home} />
      <DrawerNavigation.Screen name="Walletscreen" component={Walletscreen} />
      <DrawerNavigation.Screen
        name="Earningsscreen"
        component={Earningsscreen}
      />
      <DrawerNavigation.Screen name={'RateScreen'} component={RateScreen} />
      <DrawerNavigation.Screen name="RideRequest" component={RideRequest} />
      <DrawerNavigation.Screen name="RideScreen" component={RideScreen} />
      <DrawerNavigation.Screen name="PaymentScreen" component={PaymentScreen} />
      <DrawerNavigation.Screen name="History" component={History} />
      <DrawerNavigation.Screen name="AddYourCar" component={AddYourCar} />
      <DrawerNavigation.Screen
        name="ReferFriendScreen"
        component={ReferFriendScreen}
      />

      <DrawerNavigation.Screen name="MapScreen" component={MapScreen} />

      <DrawerNavigation.Screen
        name="RecieptScreen"
        component={SendTripRecieptScreen}
      />
      <DrawerNavigation.Screen
        name="PassengerDetails"
        component={PassengerDetails}
      />
      <DrawerNavigation.Screen
        name="GoOnlineScreen"
        component={GoOnlineScreen}
      />
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;
