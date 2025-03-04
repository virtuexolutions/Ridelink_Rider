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
            key: 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM',
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
        />
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
