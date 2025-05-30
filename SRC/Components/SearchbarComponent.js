import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowWidth, windowHeight} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';

const SearchbarComponent = ({
  setNewData,
  placeholderName,
  placeHolderColor,
  array,
  arrayItem,
  fontSize,
  SearchStyle,
  search,
  setSearch,
  disable,
  isLeftIcon,
  isRightIcon,
  as,
  color,
  size,
  name,
}) => {
  return (
    <View
      style={[
        {
          width: windowWidth * 0.9,
          height: windowHeight * 0.06,
          borderWidth: 0.3,
          borderColor: Color.veryLightGray,
          marginTop: moderateScale(5, 0.6),
          borderRadius: moderateScale(20, 0.3),
          paddingHorizontal: moderateScale(10, 0.6),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
        },
        SearchStyle,
      ]}>
      {isLeftIcon && <Icon as={as} name={name} size={size} color={color} />}
      <TextInput
        style={{color: 'black'}}
        placeholder={placeholderName ? placeholderName : 'Search'}
        placeholderTextColor={
          placeHolderColor ? placeHolderColor : Color.veryLightGray
        }
        fontSize={fontSize ? fontSize : 14}
        numberOfLines={1}
        value={search}
        onChangeText={text => {}}
        editable={disable}
      />
      {isRightIcon && <Icon as={as} name={name} size={size} color={color} />}
    </View>
  );
};

export default SearchbarComponent;
