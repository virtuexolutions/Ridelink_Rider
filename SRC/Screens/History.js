import {Icon} from 'native-base';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';

const History = () => {
  const user_list = [
    {
      id: 1,
      name: 'Dominic Ement',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
      date: '17 March 2022',
      image: require('../Assets/Images/user_Image.png'),
      price: '150',
    },
    {
      id: 2,
      name: 'Dominic Ement',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
      date: '17 March 2022',
      // image: require('../Assets/Images/user_image2.png'),
      price: '150',
    },
    {
      id: 3,
      name: 'Dominic Ement',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image3.png'),
      price: '150',
    },
    {
      id: 4,
      name: 'Dominic Ement',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
      date: '17 March 2022',
      image: require('../Assets/Images/user_image4.png'),
      price: '150',
    },
    {
      id: 5,
      name: 'Dominic Ement',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
      date: '17 March 2022',
      image: require('../Assets/Images/user_Image.png'),
      price: '150',
    },
    {
      id: 6,
      name: 'Dominic Ement',
      fromLocation: 'Mississippi, Jackson',
      toLocation: 'New Hampshire, Manchester',
      date: '17 March 2022',
      // image: require('../Assets/Images/user_image2.png'),
      price: '150',
    },
  ];
  const getHistory = async() =>{
  }
  return (
    <SafeAreaView style={styles.safe_area}>
      <Header title={'Rides history'} />
      <View style={styles.main_Container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id}
          data={user_list}
          contentContainerStyle={{marginBottom: moderateScale(100, 0.6)}}
          style={{marginBottom: moderateScale(20, 0.6)}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card}>
                <View style={styles.image_view}>
                  <CustomImage source={item.image} style={styles.image} />
                </View>
                <View style={styles.locationStyle}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.fromLocationStyle}>
                      <View style={styles.toLocationStyle}></View>
                    </View>
                    <CustomText
                      style={{
                        fontSize: moderateScale(12, 0.6),
                        color: Color.themeDarkGray,
                        marginLeft: moderateScale(5, 0.6),
                      }}>
                      {item.fromLocation}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      transform: [{rotate: '90deg'}],
                      position: 'absolute',
                      width: windowWidth * 0.1,
                      top: moderateScale(25, 0.6),
                      left: moderateScale(-4, 0.6),
                    }}>
                    <CustomText style={{color: Color.black}}>
                      ........
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: moderateScale(20, 0.6),
                    }}>
                    <Icon
                      name="location-outline"
                      as={Ionicons}
                      size={moderateScale(18, 0.6)}
                    />
                    <CustomText
                      style={{
                        fontSize: moderateScale(12, 0.6),
                        color: Color.themeDarkGray,
                        marginLeft: moderateScale(5, 0.6),
                      }}>
                      {item.toLocation}
                    </CustomText>
                  </View>
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
        <View style={{height: moderateScale(50, 0.6), marginTop: 10}} />
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  safe_area: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    // backgroundColor : 'red' ,
  },
  card: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.15,
    borderRadius: moderateScale(20, 0.6),
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
  fromLocationStyle: {
    width: windowWidth * 0.038,
    height: windowWidth * 0.038,
    borderRadius: (windowWidth * 0.038) / 2,
    backgroundColor: Color.circleblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toLocationStyle: {
    width: windowWidth * 0.02,
    height: windowWidth * 0.02,
    borderRadius: (windowWidth * 0.02) / 2,
    backgroundColor: Color.white,
    // left:moderateScale(2,0.6)
  },
  date: {
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
  },
  locationStyle: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.08,
    marginTop: moderateScale(15, 0.6),
  },
  buttonBox: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
  },
});
