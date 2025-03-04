import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, s} from 'react-native-size-matters';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import SearchbarComponent from '../Components/SearchbarComponent';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

import DeliveryBox from '../Components/DeliveryBox';
import CustomButton from '../Components/CustomButton';
import Userbox from '../Components/Userbox';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon, ScrollView} from 'native-base';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import RiderRideAccept from '../Components/RiderRideAccept';

const GoOnlineScreen = () => {
  const [activebutton, setactivebutton] = useState('current');
  const {user_type} = useSelector(state => state.authReducer);
  const deliveryList = [
    {
      id: 1,
      image: require('../Assets/Images/carimage.png'),
      title: 'Ride',
    },
    {
      id: 2,
      image: require('../Assets/Images/parcelimage.png'),
      title: 'Parcel Delivery',
    },
    {
      id: 3,
      image: require('../Assets/Images/catimage.png'),
      title: 'Pets',
    },
  ];
  const userBox = [
    {
      id: 1,
      image: require('../Assets/Images/headerPhoto.png'),
      userID: 'Y3I4USQ2',
      subtext: 'Natalya Undergrowth',
      time: '07:30am',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
    },
    {
      id: 2,
      image: require('../Assets/Images/headerPhoto.png'),
      userID: 'Y3I4USQ2',
      subtext: 'Natalya Undergrowth',
      time: '07:30am',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
    },
  ];

  const user_list = [
    {
      id: 1,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_Image.png'),
    },
    {
      id: 2,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      // image: require('../Assets/Images/user_image2.png'),
    },
    {
      id: 3,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image3.png'),
    },
    {
      id: 4,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image4.png'),
    },
    {
      id: 5,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      image: require('../Assets/Images/user_Image.png'),
    },
    {
      id: 6,
      name: 'Dominic Ement',
      location: 'Mercedes (ET YL421)',
      date: '17 March 2022',
      // image: require('../Assets/Images/user_image2.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={'Go Online Again'} />
      <SearchbarComponent
        SearchStyle={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.058,
          backgroundColor: Color.white,
        }}
        placeholderName={null}
        isRightIcon={true}
        name={'search'}
        as={Feather}
        color={Color.grey}
      />
      <View style={styles.main_Container}>
        <RiderRideAccept
          isuserCard
          name={'Theodora J. Gardner'}
          pickuplocation={'Fannie Street San Angelo, Texas'}
          dropofflocation={'Fannie Street San Angelo, Texas'}
          // image={require('../Assets/Images/user_image2.png')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            data={user_list}
            contentContainerStyle={{marginBottom: moderateScale(100, 0.6)}}
            style={{marginBottom: moderateScale(20, 0.6)}}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigationService.navigate('RideScreen')}>
                  <View style={styles.image_view}>
                    <CustomImage source={item.image} style={styles.image} />
                  </View>
                  <View style={styles.text_view}>
                    <CustomText style={styles.text}>{item.name}</CustomText>
                    <CustomText style={styles.location}>
                      {item.location}
                    </CustomText>
                    <CustomText style={styles.date}>{item.date}</CustomText>
                  </View>
                  <View style={styles.icon_view}>
                    <Icon
                      name="right"
                      as={AntDesign}
                      size={moderateScale(14, 0.6)}
                      color={Color.white}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GoOnlineScreen;

const styles = StyleSheet.create({
  safe_area: {
    width: windowWidth,
    height: windowHeight,
    bac: Color.white,
  },
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    // backgroundColor:"red",
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  ridelink_Box: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.255,
    // backgroundColor:'red',
    alignSelf: 'center',
    borderRadius: moderateScale(17, 0.6),
    borderWidth: 1.8,
    borderColor: Color.boxgrey,
  },
  link_Image: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.25,
    borderRadius: moderateScale(17, 0.6),
    alignSelf: 'center',
  },
  second_Image: {
    height: windowHeight * 0.32,
    width: windowWidth * 0.52,
    right: moderateScale(25, 0.6),
    top: moderateScale(15, 0.6),
  },
  container_Style: {
    // marginTop:moderateScale(10,0.6),
    paddingVertical: moderateScale(40, 0.6),
    // marginLeft:moderateScale(10,0.6),
    // backgroundColor:'green',
    // height:windowHeight *0.15
  },
  button_Box: {
    width: windowWidth * 0.88,
    height: moderateScale(50, 0.6),
    borderWidth: 1,
    borderRadius: moderateScale(30, 0.6),
    borderColor: Color.boxgrey,
    bottom: moderateScale(20, 0.6),
    flexDirection: 'row',
    gap: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
    backgroundColor: Color.lightGrey,
    // backgroundColor:'green',
    // position:'absolute'
  },
  card: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.1,
    borderRadius: windowWidth,
    marginTop: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Color.white,
    alignSelf: 'center',
  },
  image_view: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text_view: {
    width: '60%',
  },
  icon_view: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    backgroundColor: Color.black,
    borderRadius: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black,
  },
  location: {
    fontSize: moderateScale(12, 0.6),
    color: Color.grey,
  },
  date: {
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
  },
});
