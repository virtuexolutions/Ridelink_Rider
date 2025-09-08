import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {setWalkThrough} from '../Store/slices/auth-slice';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { StatusBar } from 'react-native';

const WalkThroughScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const slidesref = useRef(null);
  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walk1.jpg'),
      title: 'Accept Rides & Navigate Easily',
      text: 'Get ride requests instantly and start earning on your schedule. Our smart navigation helps you reach your customer quickly and efficiently.',
    },
    {
      key: '2',
      image: require('../Assets/Images/walk2.jpg'),
      title: 'Deliver Parcels & Earn More',
      text: `Expand your earnings by delivering parcels. Whether small packages or urgent documents, we connect you with customers who need fast and secure delivery.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/walk3.jpg'),
      title: 'Pet-Friendly Rides',
      text: `Offer specialized pet transportation services. Ensure a safe and comfortable trip for pets while unlocking extra income opportunities.`,
    },
  ];
  console.log(slidesref.current, 'indexxxxxxx');

  const RenderSlider = ({item}) => {
    return (
      <ImageBackground
        imageStyle={{
          height: '90%',
          width: '100%',
        }}
        resizeMode="stretch"
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: 'white',
        }}
        source={item.image}>
        <StatusBar barStyle="dark-content" backgroundColor={Color.white} />
          
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            position: 'absolute',
            bottom: '46%',
            width: '80%',
            textAlign: 'center',
            marginHorizontal: moderateScale(50, 0.3),
          }}>
          {item?.text}
        </CustomText>
      </ImageBackground>
    );
  };

  const RenderNextBtn = ({onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: windowHeight * 0.09,
          width: windowHeight * 0.09,
          borderRadius: (windowHeight * 0.09) / 2,
          backgroundColor: 'white',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Color.black,
          bottom: 10,
          alignSelf: 'center',
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
          }}>
          NEXT
        </CustomText>
      </TouchableOpacity>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };

  return (
    <View style={styles.container1}>
      <AppIntroSlider
        renderItem={RenderSlider}
        data={slides}
        ref={slidesref}
        renderPagination={activeindex => {
          console.log('activeeeeeee ,index ', activeindex);

          return (
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.21,
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: '23%',
                rowGap: moderateScale(35, 0.6),
              }}>
              <RenderSkipBtn />
              <RenderNextBtn
                onPress={() => {
                  if (slidesref.current) {
                    if (activeindex < slides.length - 1) {
                      slidesref.current.goToSlide(activeindex + 1, true);
                    } else {
                      dispatch(setWalkThrough(true));
                    }
                  }
                }}
              />
            </View>
          );
        }}
        showNextButton={true}
        activeDotStyle={{backgroundColor: Color.themeBlack}}
        dotStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Color.themeBlack,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'white',
  },

  generalBtn: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.themeBlack,
  },
  btnRight: {
    color: Color.white,
  },
});

export default WalkThroughScreen;
const BoldText = ({children}) => {
  return <Text style={{fontWeight: 'bold'}}>{children}</Text>;
};
