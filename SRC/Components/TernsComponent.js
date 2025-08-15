import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { moderateScale } from 'react-native-size-matters'

const TernsComponent = ({termData}) => {
  return (
    <View style={styles.container}>
    <CustomText style={styles.heading}>{`${termData.id}  ${termData.heading}`}</CustomText>
    {termData.description != '' && (
      <CustomText style={styles.description}>
        {termData.description}
      </CustomText>
    )}
    {termData.subTerms.length > 0 &&
      termData.subTerms.map((st, index) => (
        <CustomText
        
          style={styles.bulletPoints}>{`\u2022  ${st}`}</CustomText>
      ))}
  </View>
  )
}

export default TernsComponent

const styles = StyleSheet.create({
    container: {
        paddingLeft: moderateScale(12, 0.2),
        paddingRight: moderateScale(5, 0.2),
        marginTop: moderateScale(5, 0.2),
      },
      heading: {
        fontWeight: '600',
        textAlign: 'left',
    
        fontSize: moderateScale(14, 0.2),
      },
      description: {
        marginTop:moderateScale(5,0.2),
        fontSize: moderateScale(13, 0.2),
        textAlign: 'left',
        textTransform:"none"
      },
      bulletPoints: {
        marginTop:moderateScale(5,0.2),
        fontSize: moderateScale(12, 0.3),
        textAlign: 'left',
        paddingLeft:7,
        marginRight:moderateScale(11,0.2),
        textTransform:"none"
        // textTransform:"none"
      },
})
