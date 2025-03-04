import {Icon} from 'native-base';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {setWalkThrough} from '../Store/slices/auth-slice';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';


const WalkThroughScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const slidesref =useRef(null)
  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walk1.jpg'),
      title: 'CHEVY CRUZ',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur consectetur ligula eget ultrices. Cras ac risus sodales, posuere nibh et, molestie',
    },
    {
      key: '2',
      image: require('../Assets/Images/walk2.jpg'),
      // image1: require('../Assets/Images/icon2.png'),
      title: 'LOREM IPSUM DOLOR SIT',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/walk3.jpg'),
      // image1: require('../Assets/Images/icon2.png'),
      title: 'DODGE CARAVAN',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    },
  ];
  console.log(slidesref.current ,'indexxxxxxx')

  const RenderSlider = ({item}) => {
    return (
        <ImageBackground
        imageStyle={{
          height:'90%',
          width:'100%'
        }}
      resizeMode='stretch'
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor : 'white'
                    }}
          source={item.image}>
            <CustomText style={{
              fontSize : moderateScale(11,.6),
              position:'absolute',
              bottom:'46%',
              width:'80%',
              textAlign:'center',
              marginHorizontal:moderateScale(50,.3)
            }}>{item?.text}</CustomText>
          
        </ImageBackground>
    );
  };

  const RenderNextBtn = ({onPress}) => {
    return (
      <TouchableOpacity 
      onPress={onPress}

      // onPress={() =>{
      //   slidesref.current.goToSlide(activeindex + 1) 

      // }}
        style={{
          height: windowHeight * 0.09,
          width: windowHeight * 0.09,
          borderRadius: (windowHeight * 0.09) / 2,
          backgroundColor: 'white',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Color.black,
          // position: 'absolute',
          bottom: 10,
          alignSelf : 'center'
          // left: windowWidth* 0.5,
        }}>
       <CustomText style={{
        fontSize : moderateScale(14,0.6)
       }} >NEXT</CustomText>
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
      // onPress={onPress}
        onPress={() => {
          dispatch(setWalkThrough(true));

        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  // const RenderBackBtn = () => {
  //   return (
  //     <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
  //   );
  // };
  return (

      <View style={styles.container1}>
        {/* <CustomImage
          source={backgroundImage}
          resizeMode="contain"
          style={styles.bgImage}
        /> */}
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          ref={slidesref}

        renderPagination={(activeindex)=>{
          console.log('activeeeeeee ,index ' ,activeindex) 

          return(

            <View style={{
              width : windowWidth ,
              height : windowHeight * 0.21,
              backgroundColor : 'transparent',
              position : 'absolute',
              bottom : '23%',
              rowGap : moderateScale(35,0.6),
            }}>
              <RenderSkipBtn />
              <RenderNextBtn onPress={() => {
              if (slidesref.current) {
                if (activeindex < slides.length - 1) {
                  slidesref.current.goToSlide(activeindex + 1, true); // Navigate to next slide
                } else {
                  dispatch(setWalkThrough(true)); // Final action
                }}}}
                // slidesref.current.goToSlide(activeindex < 2 ?  activeindex + 1 : dispatch(setWalkThrough(true)))
                />
            </View>
          )
        }}
        // onPress={() => slidesref.current.goToSlide(1, true)}
          // showDoneButton={false}
          // showSkipButton={true}
          // showPrevButton={true}
          showNextButton={true}
          activeDotStyle={{backgroundColor: Color.themeBlack}}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.themeBlack,
          }}
          // renderDoneButton={RenderDoneBtn}
          // renderNextButton={RenderNextBtn}
          // renderSkipButton={RenderSkipBtn}
          // renderPrevButton={RenderBackBtn}
        />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  container1: {
    height:windowHeight,
    width:windowWidth,
    backgroundColor:'white'
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.themeColor2,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.themeColor2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
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
