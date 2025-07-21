import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

const DropDown = ({
  item,
  setData,
  array,
  data,
  labelKey = null,
  placeHolder,
  style,
}) => {
  console.log("🚀 ~ data:",typeof  data)
  console.log('🚀 ~ placeHolder:', placeHolder);
  const [isOpened, setIsOpened] = useState(false);
  const isFocused = useIsFocused();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpened(!isOpened)}
        style={style ? style : styles.mainContainer}>
        <CustomText style={styles.text}>
         {(() => {
    if (!data) return placeHolder || 'select type';
    if (typeof data === 'object') {
      return data?.cabName || data?.name || placeHolder || 'select type';
    }
    return data;
  })()}
        </CustomText>
        <Icon
          style={{paddingTop: moderateScale(3, 0.6)}}
          name={isOpened ? 'up' : 'down'}
          as={AntDesign}
          size={moderateScale(15, 0.6)}
          color={Color.mediumGray}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.con,
          {
            borderWidth: isOpened ? 0.4 : 0.0,
          },
        ]}>
        {isOpened &&
          array?.map((option, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setData(option);
                  setIsOpened(false);
                }}
                style={styles.map_container}>
                <CustomText
                  style={[
                    styles.map_text,
                    {
                      color:
                        labelKey && data === option ? Color.blue : Color.grey,
                    },
                  ]}>
                  {labelKey ? option?.cabName : option}
                </CustomText>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.88,
    backgroundColor: Color.white,
    borderRadius: 30,
    borderWidth: 0.3,
    borderColor: Color.darkGray,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingTop: moderateScale(15, 0.6),
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.grey,
  },
  map_container: {
    alignSelf: 'center',
    width: windowWidth * 0.7,
    backgroundColor: Color.white,
    borderRadius: 10,
    padding: moderateScale(5, 0.6),
    // backgroundColor :'red'
  },
  con: {
    width: windowWidth * 0.75,
    // backgroundColor :'red' ,
    borderWidth: 0.4,
    borderRadius: 10,
    // paddingHorizontal : moderateScale(10,.6),
    borderColor: Color.blue,
    alignSelf: 'center',
    marginTop: moderateScale(5, 0.3),
  },
  map_text: {
    fontSize: moderateScale(13, 0.6),
    color: Color.mediumGray,
    // paddingHorizontal : moderateScale(10,.6)
    // borderBottomWidth: 0.2,
    // borderBottomColor: Color.blue,
  },
});
