import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';

const PolicyComponent = ({item}) => {
  return (
    <View
    style={{
      marginTop: 5,
      marginLeft: moderateScale(10, 0.3),
      marginRight: 6,
    }}>
    <CustomText style={styles.heading}>{`${item.id} ${item.heading}`}</CustomText>

    <CustomText style={styles.description}>
      {item.description}
    </CustomText>
    {item.subData.length > 0 &&
      item.subData.map((sd, index) => {
        return (
          <View>
            <CustomText style={styles.subHeading}>
              {sd.heading}
            </CustomText>
            {sd.texts.map((text, index) => {
              return (
                <CustomText
                  style={
                    styles.bulletPoints
                  }>{` \u2022 ${text}`}</CustomText>
              );
            })}
          </View>
        );
      })}
    {item.texts.map((text, index) => {
      return (
        <CustomText style={styles.bulletPoints}>{` ${
          item.id != '11' && '\u2022'
        } ${text}`}</CustomText>
      );
    })}
    {item.endText != '' && (
      <CustomText style={styles.bulletPoints}>
        {item.endText}
      </CustomText>
    )}
  </View>
  )
}

export default PolicyComponent

const styles = StyleSheet.create({
    heading: {
        fontSize: moderateScale(14, 0.25),
        color: Color.themeBgColor,
        textAlign: 'left',
      },
      description: {
        marginTop: moderateScale(5, 0.2),
        fontSize: moderateScale(12, 0.25),
        // lineHeight: moderateScale(12,0,2),
        color: Color.themeBgColor,
        textAlign: 'justify',
      },
      subHeading: {
        fontSize: moderateScale(12, 0.25),
        color: Color.themeBgColor,
        textTransform: 'none',
        marginTop: moderateScale(5, 0.2),
    
        textAlign: 'justify',
      },
      bulletPoints: {
        fontSize: moderateScale(12, 0.25),
        color: Color.themeBgColor,
        marginTop: moderateScale(5, 0.2),
        textAlign: 'left',
      },
})