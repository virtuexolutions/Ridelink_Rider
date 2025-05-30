import React, {useState, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {scale, moderateScale, ScaledSheet} from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { useSelector } from 'react-redux';
import CustomText from './CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DropDownSingleSelect = ({
  array,
  item,
  setItem,
  placeholder,
  buttonTextAfterSelection,
  rowTextForSelection,
  disabled,
  backgroundColor,
  width,
  iconName,
  iconType,
  extreme,
  inRow,
  myJobs,
  Colors,
  fontSize,
  dropdownStyle,
  placeHolderColor,
  placeHolder,
  btnStyle
}) => {
  console.log("🚀 ~ =================== ssssssssssssssssssssssss >>array:", array ,item)
  const [data , setData] = useState([])
  const isFocused = isFocused()
   const themeColor = useSelector(state => state.authReducer.ThemeColor);

  useEffect(() => {
    setData([])
    array?.map((x , index)=>{
      return(
        typeof(array[0]) == 'object' ? setData((prev)=>[...prev , x?.name]) :setData(prev=>[...prev , x])
      )
    })
  }, [isFocused])
  
  console.log('------------------>> >>> chal rha hu bhaui')

  return (
    // <View
    //   style={[
    //     styles.main,
    //     !iconName && {
    //       paddingLeft: 0,
    //       marginBottom: 10,
    //     },
    //     {
    //       backgroundColor:"red",
    //     },
    //     myJobs && {
    //       backgroundColor: Color.themeInputText,
    //       width: width * 0.5,
    //       marginTop: 0,
    //       alignItems: 'center',
    //       borderRadius: 10,

    //       borderWidth: 0,
    //     },

    //     extreme && {
    //       width: width * 1.13,
    //     },
    //     inRow && {
    //       width: windowWidth * 0.35,
    //       marginTop: 0,
    //       // borderWidth: 0,
    //     },
    //     dropdownStyle,
    //   ]}>
    //   {iconName && (
    //     <Icon
    //       name={iconName}
    //       as={iconType}
    //       size={moderateScale(22, 0.3)}
    //       // style={[
    //       //   styles.icon2,
    //       //   backgroundColor && {color: Color.themeGray},
    //       //   myJobs && {color: '#1296AF'},
    //       // ]}
    //       color={'#1296AF'}
    //     />
    //   )}
    //   <SelectDropdown
    //     data={data}
    //     defaultValue={item}
    //     // dropdownStyle={}
    //     buttonStyle={{
    //       ...styles.dropDownBtn,
    //       width: width * 0.89,
    //       backgroundColor :'black',
    //       ...(btnStyle && btnStyle),

    //       ...(disabled && {backgroundColor: `${Color.veryLightGray}90`}),
    //       ...(myJobs && {
    //         backgroundColor: `${Color.themeInputText}`,
    //         width: windowWidth * 0.35,
    //         borderRadius: 10,
    //       }),
    //       ...(backgroundColor && {
    //         backgroundColor: backgroundColor,
    //       }),
    //       ...(!iconName && {
    //         width: width,
          
          
          
          
          
    //       }),
    //     }}
    //     buttonTextStyle={{
    //       ...styles.dropDownBtnText,
    //       ...(item !== '' && {color: Colors ? Colors : Color.themeBlack}),
    //       ...(backgroundColor && {
    //         color: `${Color.black}`}),
    //         ...(fontSize && {fontSize: fontSize ? fontSize : moderateScale(12, 0.3)})
    //     }}
    //     dropdownStyle={{
    //       width: width,
    //       // height : 120,
    //       borderRadius: moderateScale(10, 0.3),
    //       marginTop: -height * 0.06,
        

    //       ...(iconName && {
    //         position: 'absolute',
    //         left: moderateScale(40, 0.6),
    //       }),
    //     }}
    //     rowStyle={{...styles.dropDownRow}}
    //     rowTextStyle={{
    //       ...styles.dropDownRowText,
    //       // fontSize: fontSize && fontSize
    //     }}
    //     selectedRowStyle={{
    //       backgroundColor: Color.splashBGMiddle,
    //     }}
    //     defaultButtonText={placeholder}
    //     renderDropdownIcon={() => {
    //       return (
    //         <>
    //           <Icon
    //             name="chevron-small-down"
    //             as={Entypo}
    //             size={moderateScale(27, 0.3)}
    //             color={'white'}
    //             style={[
    //               styles.icon,{color:themeColor[1],},
    //               extreme && {
    //                 position: 'absolute',
    //                 left: -8,
    //               },
    //               backgroundColor && {color: 'white'},
    //             ]}
    //           />
    //         </>
    //       );
    //     }}
    //     onSelect={(selectedItem, index) => {
    //       setItem(selectedItem);
    //     }}
    //     renderButton={(selectedItem, isOpened)=>{
    //       return (
    //         <View style={[styles.dropdownButtonStyle, width && { width: width}]}>
         
    //       <CustomText style={[styles.dropdownButtonTxtStyle,  {
    //         color: "black"
    //       }]}>
    //         {(selectedItem  && typeof selectedItem == 'object'? selectedItem.title : selectedItem) || 
    //         ""}
    //       </CustomText>
    //       <Icon 
    //       as={MaterialCommunityIcons}
    //       name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
    //     </View>
    //       )
    //     }}
    //     buttonTextAfterSelection={buttonTextAfterSelection}
    //     rowTextForSelection={rowTextForSelection}
    //     disabled={disabled}
    //     backgroundColor={backgroundColor}
    //   />
    // </View>
    <SelectDropdown
    data={data}
    
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
      setItem(selectedItem);
    }}
    
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={[styles.dropdownButtonStyle, 
          btnStyle && btnStyle,
        width && { width: width}]}>
         
          <CustomText style={[styles.dropdownButtonTxtStyle, placeHolderColor && {
            color:  placeHolderColor 
          }]}>
            {(selectedItem  && typeof selectedItem == 'object'? selectedItem.title : selectedItem) || placeholder}
          </CustomText>
          <Icon 
          color={Color.black}
          size={moderateScale(27,0.2)}
          as={Entypo}
          name={isOpened ? 'chevron-small-up' : 'chevron-small-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      console.log("🚀 ~ item:", item)
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: Color.primary})}}>
          {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
          <CustomText style={styles.dropdownItemTxtStyle}>{typeof  item == "object" ? item.title : item?.trim()}</CustomText>
        </View>
      );
    }}
    // disa
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}

  />

  
  );
};
const styles = ScaledSheet.create({
  dropDownBtn: {
    backgroundColor: Color.white,
    height: height * 0.08,
    borderRadius: moderateScale(25, 0.3),
    // width : 100,
  },
  main: {
    position: 'relative',
    backgroundColor: Color.themeInputText,
    height: height * 0.03,
    borderBottomWidth: moderateScale(1, 0.3),
    borderColor: 'lightgrey',
    marginTop: moderateScale(6, 0.3),
    // borderRadius: moderateScale(20, 0.3),
    paddingLeft: moderateScale(32, 0.3),
    width: width * 0.81,
  },
  dropDownBtnText: {
    //////
    // backgroundColor: "red",
    width: width * 0.75,
    // marginLeft: 38,
    fontSize: moderateScale(12, 0.3),
    color: Color.themeLightGray,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  dropDownRow: {
    backgroundColor: Color.white,
  },
  dropDownRowText: {
    width: width * 0.75,
    fontSize: moderateScale(14, 0.3),
    color: 'black',
    textAlign: 'left',
    textTransform: 'capitalize',
    marginLeft: moderateScale(15, 0.3),
  },
  icon: {
    marginTop: 3,
    
  },
  icon2: {
    // color: themeColor[1],
    position: 'absolute',
    left: moderateScale(10, 0.3),
    top: moderateScale(12, 0.3),
  },
  dropdownButtonStyle:{
    width: windowWidth * 0.9,
    height:windowHeight * 0.045,
    // paddingVertical:moderateScale(11,0.3),
    alignItems:"center",
    paddingHorizontal:moderateScale(5,0.2),
    borderWidth:1,
    marginTop:moderateScale(10,0.2),
    padding:moderateScale(10,0.3),
    backgroundColor:Color.white,
    justifyContent:"space-between",
    flexDirection:"row",
    borderColor:Color.mediumGray,
    borderRadius: moderateScale(25,0.3),
},
dropdownItemStyle:{
  width: '100%',
  // height: windowHeight * 0.03,
  paddingHorizontal:moderateScale(20,0.2),
  paddingVertical:moderateScale(10,0.2),
  alignItems:"flex-start"
},
dropdownButtonTxtStyle:{
    color: Color.mediumGray,
    paddingHorizontal:moderateScale(11,0.2) ,
},
dropdownMenuStyle:{
    // backgroundColor:Color.red,
    // borderColor:Color.mediumGray,
    width: "90%",
    borderWidth:1,
    marginTop:moderateScale(-35,0.2),
    // 
    // position:"absolute",
    // top:-10,
    borderRadius:moderateScale(15,0.2)
} ,
dropdownItemTxtStyle :{
  fontSize : moderateScale(15,.6) ,
  color :Color.black ,
  backgroundColor :'red'
}
});

export default DropDownSingleSelect;
