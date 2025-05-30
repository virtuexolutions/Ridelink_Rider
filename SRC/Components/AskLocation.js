import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import SearchLocationModal from './SearchLocationModal';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import AskLocationComponent from './AskLocationComponent';

const AskLocation = ({
  setCurrentPosition,
  currentPosition,
  address,
  setAddress,
  islocation,
  isIcon,
  main_view_style,
  heading,
  renderView,
  setPickupLocation,
  setIsModalVisible,
  setDropLocation,
  isModalVisible,
  setLocationType,
  locationType,
  dropLocation,
  pickupLocation,
  onPress,
  onPressCurrentLocation,
  fromfareScreen,
  pickupLocationName,
  dropLocationName,
  setMultipleLocation,
  multipleLocation,
  onUpdateLocation,
  additionalLocation,
  setAdditionalLocation,
  fromrequest,
}) => {
  const [addLocation, setAddLocation] = useState(false);
  return (
    <View style={[styles.location_View, main_view_style]}>
      <View style={styles.location_subview}>
        <CustomText style={styles.location_head}>{heading}</CustomText>
        {isIcon && (
          <View style={styles.icon_view}>
            <Icon
              name="keyboard-arrow-down"
              as={MaterialIcons}
              size={moderateScale(12, 0.6)}
              color={Color.black}
            />
          </View>
        )}
      </View>
      {fromrequest && (
        <CustomText
          onPress={() => {
            setAddLocation(true);
          }}
          isBold
          style={{
            fontSize: moderateScale(10, 0.6),
            top: 10,
            left: 235,
          }}>
          add multiple location
        </CustomText>
      )}
      {renderView}
      {islocation && (
        <View style={styles.seatView}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: moderateScale(5, 0.6),
              }}>
              <Icon
                name="map-marker"
                as={FontAwesome}
                size={moderateScale(16, 0.6)}
                color={Color.yellow}
              />
              <CustomText
                numberOfLines={1}
                style={[
                  styles.text1,
                  {
                    paddingBottom: moderateScale(10, 0.6),
                    fontSize: moderateScale(10, 0.6),
                    width: windowWidth * 0.7,
                    textAlign: 'left',
                  },
                ]}>
                {pickupLocationName
                  ? pickupLocationName
                  : pickupLocation?.name || 'I’m going from ....'}
              </CustomText>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: -10,
                  marginTop: moderateScale(10, 0.6),
                }}>
                <Icon
                  onPress={() => {
                    setLocationType('pickup');
                    setIsModalVisible(true);
                  }}
                  name="plus"
                  as={FontAwesome}
                  size={moderateScale(12, 0.6)}
                  color={Color.black}
                />
              </TouchableOpacity>
            </View>
            <CustomText
              isBold
              style={[
                styles.text1,
                {
                  position: 'absolute',
                  color: 'black',
                  top: 29,
                  marginLeft: moderateScale(-5, 0.6),
                  transform: [{rotate: '-90deg'}],
                },
              ]}>
              -----
            </CustomText>
            <View
              style={{
                width: windowWidth * 0.75,
                height: moderateScale(0.5, 0.5),
                backgroundColor: Color.grey,
                marginLeft: moderateScale(14, 0.6),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: moderateScale(10, 0.6),
              }}>
              <Icon
                name="map-marker"
                as={FontAwesome}
                size={moderateScale(16, 0.6)}
                color={Color.red}
              />
              <CustomText
                numberOfLines={1}
                style={[
                  styles.text1,
                  {
                    fontSize: moderateScale(10, 0.6),
                    width: windowWidth * 0.7,
                    textAlign: 'left',
                  },
                ]}>
                {dropLocationName
                  ? dropLocationName
                  : dropLocation?.name || 'I’m going to ....'}
              </CustomText>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: -10,
                  marginTop: moderateScale(10, 0.6),
                }}>
                <Icon
                  onPress={() => {
                    setLocationType('dropoff');
                    setIsModalVisible(true);
                  }}
                  name="plus"
                  as={FontAwesome}
                  size={moderateScale(12, 0.6)}
                  color={Color.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <SearchLocationModal
        onPressonPressCurrentLocation={onPressCurrentLocation}
        setcurrentPossition={setCurrentPosition}
        currentPosition={currentPosition}
        setAddress={setAddress}
        address={address}
        locationType={locationType}
        setLocationType={setLocationType}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setPickupLocation={setPickupLocation}
        setdropOffLocation={setDropLocation}
        setAdditionalLocation={setAdditionalLocation}
        additionalLocation={additionalLocation}
        addLocation={addLocation}
      />
      <AskLocationComponent
        visible={addLocation}
        setIsVisible={setAddLocation}
        onUpdateLocation={onUpdateLocation}
        multipleLocation={multipleLocation}
        setMultipleLocation={setMultipleLocation}
      />
    </View>
  );
};

export default AskLocation;

const styles = StyleSheet.create({
  main_view: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    backgroundColor: Color.lightGrey,
  },
  location_View: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    backgroundColor: Color.lightGrey,
    bottom: 20,
    borderRadius: moderateScale(15, 0.6),
  },
  location_subview: {
    width: windowWidth * 0.9,
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  location_head: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
  },
  icon_view: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
    textAlign: 'center',
  },
});
