import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomText from './CustomText';
// import Constants from "../Assets/Utilities/Constants";
import Color from '../Assets/Utilities/Color';
import TextInputWithTitle from './TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchContainer = ({
  width,
  text,
  input,
  onPress,
  data,
  setData,
  style,
  places,
  inputStyle,
  placeHolder,
  rightIcon,
  height
}) => {
  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View
          style={[
            styles.container,
            height && {height: height},
            width && {width: width},
            input && {padding: 0},
            style && style,
          ]}>
          {text && (
            <>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.black,
                  lineHeight: moderateScale(20, 0.3),
                }}>
                {'Where to? \n'}
                <CustomText style={{fontSize: moderateScale(10, 0.6)}}>
                  Anytime anyWhere
                </CustomText>
              </CustomText>
              <Icon
                name="search"
                as={FontAwesome}
                size={moderateScale(20)}
                style={{alignSelf: 'center'}}
                color={Color.themeColor}
              />
            </>
          )}
          {/* {places && (
          <GooglePlacesAutocomplete
            placeholder="Enter location"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              let lat = details?.geometry?.location?.lat;
              let lng = details?.geometry?.location?.lng;
              console.log(lat, lng);
              setData({ latitute: lat, longitute: lng });
            }}
            query={{
              key: "AIzaSyDa3hGQ1LsGw7cyjCwCKx6rxU62g6vt0b8",
              language: "en",
            }}
            />
            )} */}

          {input && (
            <>
              <Icon
                name={'search'}
                as={FontAwesome}
                size={moderateScale(17, 0.3)}
                color={'#E7DFDC'}
                // style={{backgroundColor : 'red'}}
              />

              <TextInput
                placeholder={placeHolder ? placeHolder : 'Search here'}
                placeholderTextColor={'#E7DFDC'}
                numberOfLines={1}
                value={data}
                onChangeText={text => {
                  setData(text);
                }}
                style={[
                  {
                    marginLeft: moderateScale(10, 0.3),
                    width: windowWidth * 0.61,
                    // backgroundColor:'black',
                    // height : windowHeight * 0.05,
                    // fontSize: moderateScale(15, 0.3),
                    color: Color.black,
                    // backgroundColor : 'red'
                  },
                  inputStyle && inputStyle,
                ]}
              />
              {/* <Icon
              name={'filter'}
              as={Ionicons}
              size={moderateScale(20,0.3)}
              color={'#FF6E2E'}
              // style={{backgroundColor : 'red'}}
              /> */}

              {/* <View
                style={{
                  height: windowWidth * 0.09,
                  width: windowWidth * 0.09,
                  overflow: 'hidden',
                  borderRadius: (windowWidth * 0.09) / 2,
                  // borderRadius:moderateScale(20,.6),
                  backgroundColor: '#fbb824',
                  padding: moderateScale(5, 0.6),
                }}>
                <CustomImage
                  source={require('../Assets/Images/filter.png')}
                  style={{height: '100%', width: '100%'}}
                />
              </View> */}
            </>
          )}
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flexGrow: 0,
    flexDirection: 'row',
    // justifyContent: "space-between",
    // marginTop: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: '#EAEBEC',
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    paddingVertical: moderateScale(8, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),

    //  elevation: 5,
    alignItems: 'center',
  },
});

export default SearchContainer;
