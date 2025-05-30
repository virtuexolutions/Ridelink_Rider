import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        width: windowWidth,
        minHeight: windowHeight,
        backgroundColor: Color.white,
        paddingBottom: moderateScale(40, 0.6),
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: windowWidth,
          backgroundColor: 'white',
          paddingHorizontal: moderateScale(10, 0.6),
          marginTop : moderateScale(5,.3)
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon
            name="arrowleft"
            as={AntDesign}
            style={styles.icon2}
            color={Color.white}
            size={moderateScale(20, 0.3)}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
            color: Color.black,
            width: windowWidth * 0.8,
            textAlign: 'center',
            paddingTop: moderateScale(8, 0.6),
          }}>
          privacy policy
        </CustomText>
      </View>
      {/* <Header title={'privacy Policy'} showBack={true} hideUser={true} /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: windowHeight,
          width: windowWidth,
        }}>
        <CustomText
          style={{
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
            color: Color.themeBgColor,
            textAlign: 'justify',
            fontSize: moderateScale(12, 0.6),
          }}>
          {
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum \n\n t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). \n \n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32 f fsd fsdf s'
          }
        </CustomText>
      </ScrollView>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = ScaledSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    backgroundColor: Color.themeBlack,
    borderColor: Color.themeBlack,
    // position: 'absolute',
    // left: moderateScale(10, 0.6),
    // top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
