import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
// import 'react-native-get-random-values

import {useDispatch} from 'react-redux';
import {setDropoffLocation} from '../Store/slices/common';

const SearchLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  setAddress,
  locationType,
  setPickupLocation,
  setdropOffLocation,
  onPressCurrentLocation,
  isyourLocation = false,
  setcurrentPossition,
  onPress,
  addLocation,
  setAdditionalLocation,
  additionalLocation,
  setUserAddress,
  setZipCode,
  setState,
  setCity,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.maincontainer}>
        <CustomText
          style={{
            color: Color.themeBlack,
            marginBottom: moderateScale(10, 0.3),
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
          Select Location
        </CustomText>
        {locationType == 'pickup' && (
          <TouchableOpacity
            onPress={onPressCurrentLocation}
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.05,
              backgroundColor: Color.white,
              paddingHorizontal: moderateScale(10, 0.3),
              marginVertical: moderateScale(12, 0.2),
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <CustomText>Use Your Current Location</CustomText>
          </TouchableOpacity>
        )}
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          fetchDetails={true}
          debounce={200}
          enablePoweredByContainer={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          timeout={10000}
          keyboardShouldPersistTaps="handled"
          listViewDisplayed="auto"
          keepResultsAfterBlur={false}
          currentLocation={false}
          currentLocationLabel="Current location"
          enableHighAccuracyLocation={true}
          onFail={() => console.warn('Google Places Autocomplete failed')}
          onNotFound={() => console.log('No results found')}
          onTimeout={() => console.warn('Google Places request timeout')}
          predefinedPlaces={[]}
          predefinedPlacesAlwaysVisible={false}
          styles={{
            textInputContainer: {
              width: windowWidth * 0.85,
              height: windowHeight * 0.055,
              // alignItems: 'center',
              justifyContent: 'center',
              borderRadius: moderateScale(30, 0.6),
              borderWidth: 0.3,
              alignSelf: 'center',
              // marginHorizontal: 20,
              // position: 'relative',
              shadowColor: '#d4d4d4',
            },
            textInput: {
              // backgroundColor: 'white',
              fontWeight: '600',
              fontSize: moderateScale(16, 0.6),
              // marginTop: 5,
              width: '100%',
              height: '100%',
              borderRadius: moderateScale(30, 0.6),
              borderWidth: 0.3,
              fontFamily: 'JakartaSans-Medium',
              // color: '#000',
            },
            listView: {
              position: 'relative',
              top: 0,
              width: '100%',
              zIndex: 99,
              borderRadius: 10,
              shadowColor: '#d4d4d4',
            },
          }}
          query={{
            key: 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8',
            language: 'en',
            // types: 'geocode',
          }}
          onPress={(data, details = null) => {
            console.log('Selected data:', data?.description);
            console.log(
              'Details:',
              details?.geometry?.location?.lat,
              details?.geometry?.location?.lng,
              data?.description,
            );
            const components = details.address_components;
            const state = components.find(c =>
              c.types.includes('administrative_area_level_1'),
            )?.long_name;
            const city = components.find(c =>
              c.types.includes('locality'),
            )?.long_name;
            const zip = components.find(c =>
              c.types.includes('postal_code'),
            )?.long_name;
            setZipCode(zip);
            setState(state);
            setCity(city);

            console.log('======================== >>>>>', state, city, zip);
            const location = {
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
            };

            console.log('Location ========>>>>', location);

            if (locationType === 'pickup') {
              setPickupLocation(location);
            } else if (locationType === 'destination') {
              setdropOffLocation(location);
            } else if (locationType === 'address') {
              setUserAddress(location);
            }

            setIsModalVisible(false);
            // if (!details?.geometry?.location) {
            //   console.warn('Missing geometry details!');
            //   return;
            // }

            // handlePress({
            //   latitude: details?.geometry?.location?.lat,
            //   longitude: details?.geometry?.location?.lng,
            //   address: data.description,
            // });
          }}
          // GooglePlacesSearchQuery={{
          //   rankby: 'distance',
          //   radius: 1000, // <-- REQUIRED if using 'distance'
          // }}
          // renderLeftButton={() => (
          //   <View className="justify-center items-center w-6 h-6">
          //     <Image
          //       source={icon || icons.search}
          //       className="w-6 h-6"
          //       resizeMode="contain"
          //     />
          //   </View>
          // )}
          textInputProps={{
            placeholderTextColor: 'gray',
            placeholder: 'search',
          }}
        />
        {/* <GooglePlacesAutocomplete
          onFail={error => console.error(error, 'errrrrrorrrr')}
          placeholder="Search"
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
            // value: inputValue,
          }}
          onPress={(data, details = null) => {
            // console.log('Location ========>>>>', {
            //   name: data?.description,
            //   lat: details?.geometry?.location?.lat,
            //   lng: details?.geometry?.location?.lng,
            // });
            setIsModalVisible(false);
            locationType == 'pickup'
              ? dispatch(
                  setPickupLocation({
                    name: data?.description,
                    lat: details?.geometry?.location?.lat,
                    lng: details?.geometry?.location?.lng,
                  }),
                )
              : dispatch(
                  setDropoffLocation({
                    name: data?.description,
                    lat: details?.geometry?.location?.lat,
                    lng: details?.geometry?.location?.lng,
                  }),
                );
            locationType == 'pickup'
              ? setPickupLocation({
                  name: data?.description,
                  lat: details?.geometry?.location?.lat,
                  lng: details?.geometry?.location?.lng,
                })
              : setdropOffLocation({
                  name: data?.description,
                  lat: details?.geometry?.location?.lat,
                  lng: details?.geometry?.location?.lng,
                });
          }}
          query={{
            key: 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8',
            language: 'en',
          }}
          isRowScrollable={true}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
            },
            textInput: {
              height: windowHeight * 0.06,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 2,
              borderColor: Color.lightGrey,
              borderRadius: moderateScale(20, 0.6),
            },
            listView: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Color.veryLightGray,
            },
            description: {
              color: 'black',
            },
          }}
        /> */}
      </View>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColor,
  },
});
