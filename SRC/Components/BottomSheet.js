import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import Color from '../Assets/Utilities/Color'
import CustomText from './CustomText'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomButton from './CustomButton'
import { moderateScale } from 'react-native-size-matters'

const BottomSheet = ({Rbref ,setRbRef  ,text}) => {
  return (
   
<RBSheet
    // closeOnDragDown={true}
      ref={ref => setRbRef(ref)}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      // closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          height: windowHeight * 0.65,
        },
    }}>
      <View
        style={{
            alignItems: 'center',
            backgroundColor: Color.white,
            backgroundColor :'red'
        }}>
        <View
          style={{
            backgroundColor: Color.white,
            width: windowWidth * 0.2,
            height: windowHeight * 0.01,
            borderRadius: 10,
            marginTop: 10,
          }}></View>
        <CustomText style={styles.Text}>What is you rate? </CustomText>
        <CustomText
          style={{
            width: windowWidth * 0.6,
            fontSize: 17,
            textAlign: 'center',
          }}>
          Please share your opinion about the product
        </CustomText>
  

        <CustomButton
          text={'send review'}
          textColor={Color.white}
          width={windowWidth * 0.55}
          height={windowHeight * 0.08}
          marginTop={moderateScale(15, 0.3)}
          onPress={() => {}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
        />
      </View>
    </RBSheet>

  )
}

export default BottomSheet

const styles = StyleSheet.create({})