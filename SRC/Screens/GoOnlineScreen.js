import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import SearchbarComponent from '../Components/SearchbarComponent';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { Icon, ScrollView } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RiderRideAccept from '../Components/RiderRideAccept';
import navigationService from '../navigationService';

const GoOnlineScreen = () => {
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
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
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
