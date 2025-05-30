import {Formik} from 'formik';
import {FlatList, Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import DropDown from '../Components/DropDown';
import Header from '../Components/Header';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {addYourCarSchema} from '../Constant/schema';
import {setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const AddYourCar = props => {
  const dispatch = useDispatch();
  const ref = useRef();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [selectedCabCategory, setSelectedCabCategory] = useState('');
  const [carImages, setCarImages] = useState([]);
  const [registrationImage, setRegistrationImage] = useState([]);
  const [insuranceImage, setInsuranceImage] = useState([]);
  const [ssnImages, setSsnImages] = useState([]);
  const [licenceImages, setLicenceImages] = useState([]);
  const [registrationPicker, setRegistrationPicker] = useState(false);
  const [insurancePicker, setInsurancePicker] = useState(false);
  const [ssnPicker, setSsnPicker] = useState(false);
  const [licencePicker, setLicencePicker] = useState(false);
  const [cabSubCategory, setCabSubCategory] = useState({});
  const [toolTip, setToolTip] = useState(false);
  const [imageLoading, setImageLoading] = useState({
    license: false,
    ssn: false,
    insurance: false,
    registration: false,
    car: false,
  });
  const carType = ['Lynk Standard ', 'Lynk Economy', 'Lynk Premium'];
  const standardCabs = [
    {
      id: 1,
      cabName: 'Lynk X',
      feature: 'Budget-friendly everyday rides.',
    },
    {
      id: 2,
      cabName: 'Lynk Plus',
      feature: 'Spacious, newer vehicles with extra comfort.',
      capacity: 4,
    },
    {
      id: 3,
      cabName: 'Lynk XL',
      feature: 'Budget-friendly larger vehicles for up to 6 passengers.',
    },
  ];

  const economyCabs = [
    {
      id: 1,
      cabName: 'LynkEase',
      feature: 'Smooth, quiet rides with additional comfort.',
    },
    {
      id: 2,
      cabName: 'Lynk Eco',
      feature: 'Eco-friendly rides in hybrid or electric vehicles',
    },
    {
      id: 3,
      cabName: 'Lynk Pet',
      feature: 'Pet-friendly rides for passengers traveling with pets.',
    },
  ];

  const premiumCabs = [
    {
      id: 1,
      cabName: 'Lynk SUV',
      feature: 'High-end luxury rides with professional drivers.',
    },
    {
      id: 2,
      cabName: 'Lynk Max',
      feature: 'Vans or large vehicles for events and group travel.',
    },
    {
      id: 3,
      cabName: 'Taxi',
      feature: 'Traditional friendly Local Taxi.',
    },
    {
      id: 4,
      cabName: 'LynkAccess',
      feature:
        'Wheelchair-accessible vehicles for passengers with disabilities.',
    },
  ];

  const updateVehicle = async values => {
    const formData = new FormData();
    console.log('oressed');
    const body = {
      name: values.carName,
      number: values.carNumber,
      capacity: values.capacity,
      cab_category: selectedCabCategory,
      cab_model: values.carModel,
      status: 'active',
      // cab_type: selected,
      makingyear: values.year,
      cab_subcategory: cabSubCategory?.cabName,
    };
    for (let key in body) {
      if (
        body[key] === '' ||
        body[key] === null ||
        body[key] === undefined ||
        // object.key(body[key]) == 0 ||
        (Array.isArray(body[key]) && body[key].length === 0)
      ) {
        Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }

      formData.append(key, body[key]);
    }
    if (
      Object.keys(carImages).length > 0 &&
      Object.keys(registrationImage).length > 0
    ) {
      carImages?.map((item, index) => {
        formData.append(`image[${index}]`, item);
      });
      registrationImage?.map((item, index) => {
        formData.append(`registration_certificate[${index}]`, item);
      });
      insuranceImage?.map((item, index) => {
        formData.append(`insurance_paper[${index}]`, item);
      });
      licenceImages?.map((item, index) => {
        formData.append(`licence[${index}]`, item);
      });
      ssnImages?.map((item, index) => {
        formData.append(`ssn[${index}]`, item);
      });
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(` image is required`, ToastAndroid.SHORT)
        : Alert.alert(` image is required`);
    }

    const url = 'auth/rider/car_update';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token, true));
   
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Your car is Updated', ToastAndroid.SHORT)
        : Alert.alert('Your car is Updated');
      dispatch(setUserData(response?.data?.user_info));
      navigationService.navigate('Home');
    }
  };

  const prevImagesRef = useRef({
    license: null,
    ssn: null,
    insurance: null,
    registration: null,
    car: null,
  });

  useEffect(() => {
    const imageMap = {
      license: licenceImages,
      ssn: ssnImages,
      insurance: insuranceImage,
      registration: registrationImage,
      car: carImages,
    };

    Object.entries(imageMap).forEach(([key, currentValue]) => {
      const previousValue = prevImagesRef.current[key];

      const isArray = Array.isArray(currentValue);
      const hasNewValue = isArray
        ? currentValue.length > 0 && currentValue !== previousValue
        : currentValue && currentValue !== previousValue;

      if (hasNewValue) {
        setImageLoading(prev => ({...prev, [key]: true}));

        setTimeout(() => {
          setImageLoading(prev => ({...prev, [key]: false}));
        }, 3000);
      }

      prevImagesRef.current[key] = currentValue;
    });
  }, [licenceImages, ssnImages, insuranceImage, registrationImage, carImages]);



  return (
    <SafeAreaView
      style={{
        height: windowHeight,
        width: windowWidth,
        backgroundColor: Color.lightGrey,
      }}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <ScrollView
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: Color.lightGrey,
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        {userData?.car_info ? (
          <Header title={'Update Your Vehicle'} showBack hideUser />
        ) : (
          <CustomText isBold style={styles.text}>
            Add Your vehicle
          </CustomText>
        )}
        <View style={styles.container_field}>
          <Formik
            initialValues={{
              carModel: '',
              carName: '',
              carNumber: '',
              image: {},
              year: 0,
              capacity: 0,
              registration: {},
              category: '',
              cabsubcategory: '',
              cabcategory: '',
              cabtype: '',
            }}
            validationSchema={addYourCarSchema}
            onSubmit={updateVehicle}>
            {({handleChange, handleSubmit, values, errors, touched}) => {
              return (
                <>
                  <TextInputWithTitle
                    title={'company Name'}
                    placeholder={'enter your car name here'}
                    setText={handleChange('carName')}
                    value={values.carName}
                    viewHeight={0.055}
                    viewWidth={0.88}
                    inputWidth={0.85}
                    border={1}
                    fontSize={moderateScale(10, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.darkGray}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.carName && errors.carName && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                        paddingHorizontal: moderateScale(10, 0.6),
                      }}>
                      {errors.carName}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'Car Model'}
                    placeholder={'enter your car model here'}
                    setText={handleChange('carModel')}
                    value={values.carModel}
                    viewHeight={0.055}
                    viewWidth={0.88}
                    inputWidth={0.85}
                    border={1}
                    fontSize={moderateScale(10, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.darkGray}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.carModel && errors.carModel && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.carModel}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'car number'}
                    placeholder={'enter your car number'}
                    setText={handleChange('carNumber')}
                    value={values.carNumber}
                    viewHeight={0.055}
                    viewWidth={0.88}
                    inputWidth={0.85}
                    border={1}
                    fontSize={moderateScale(10, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.darkGray}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.carNumber && errors.carNumber && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.carNumber}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={'capacity'}
                    placeholder={'enter capcity here'}
                    setText={handleChange('capacity')}
                    value={values.capacity}
                    viewHeight={0.055}
                    viewWidth={0.88}
                    inputWidth={0.85}
                    border={1}
                    fontSize={moderateScale(9, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.darkGray}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.capacity && errors.capacity && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.capacity}
                    </CustomText>
                  )}
                  <TextInputWithTitle
                    title={' making year'}
                    placeholder={'enter making year'}
                    setText={handleChange('year')}
                    value={values.year}
                    viewHeight={0.055}
                    viewWidth={0.88}
                    inputWidth={0.85}
                    border={1}
                    fontSize={moderateScale(9, 0.6)}
                    borderRadius={30}
                    backgroundColor={'transparent'}
                    borderColor={Color.darkGray}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{right: 10}}
                  />
                  {touched.year && errors.year && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.year}
                    </CustomText>
                  )}
                  <View style={{marginTop: moderateScale(10, 0.6)}} />
                  {/* <CustomText
                    style={{
                      color: Color.black,
                      fontSize: moderateScale(12, 0.3),
                      textAlign: 'left',
                      width: windowWidth * 0.75,
                    }}>
                    Select car Category
                  </CustomText>
                  <DropDown
                    array={carcategory}
                    data={selected}
                    setData={setSelected}
                    placeHolder={'select car category'}
                  /> */}
                  <DropDown
                    // style={styles.drop}
                    array={carType}
                    data={selectedCabCategory}
                    setData={setSelectedCabCategory}
                    placeHolder={'select car standard'}
                  />
                  <View>
                    {selectedCabCategory !== '' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          backgroundColor: 'white',
                        }}>
                        <DropDown
                          array={
                            selectedCabCategory === 'Lynk Standard '
                              ? standardCabs
                              : selectedCabCategory === 'Lynk Economy'
                              ? economyCabs
                              : premiumCabs
                          }
                          style={styles.drop}
                          data={cabSubCategory}
                          setData={setCabSubCategory}
                          placeHolder={'Select car sub category'}
                          labelKey="name"
                          fromobject={true}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            if (
                              cabSubCategory &&
                              typeof cabSubCategory?.cabName === 'string' &&
                              cabSubCategory?.cabName.trim() !== ''
                            ) {
                              setToolTip(!toolTip);
                            }
                          }}
                          style={{
                            marginTop: moderateScale(30, 0.6),
                            width: '10%',
                            alignItems: 'center',
                          }}>
                          <Icon
                            size={moderateScale(20, 0.6)}
                            color={Color.black}
                            as={AntDesign}
                            name="questioncircle"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {toolTip && (
                      <View style={styles.tooltip}>
                        <CustomText
                          numberOfLines={2}
                          style={{
                            fontSize: moderateScale(11, 0.6),
                            color: Color.white,
                          }}>
                          {cabSubCategory?.feature}
                        </CustomText>
                      </View>
                    )}
                  </View>

                  {touched.category && errors.category && (
                    <CustomText
                      textAlign={'left'}
                      style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.red,
                        alignSelf: 'flex-start',
                      }}>
                      {errors.category}
                    </CustomText>
                  )}
                  <CustomText style={styles.image_headindg}>
                    Add Car Image
                    <CustomText style={styles.sub_heading}>
                      (Front, Back, and Driver Side of the Vehicle) :
                    </CustomText>
                  </CustomText>

                  <View style={styles.imagesContainer}>
                    <FlatList
                      scrollEnabled={false}
                      horizontal
                      data={carImages}
                      showsHorizontalScrollIndicator={false}
                      style={{
                        flexGrow: 0,
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={[
                              styles.addImageContainer,
                              {
                                borderWidth: 0,
                                borderRadius: moderateScale(10, 0.3),
                              },
                            ]}>
                            <Icon
                              name={'close'}
                              as={FontAwesome}
                              color={Color.black}
                              size={moderateScale(12, 0.3)}
                              style={{
                                position: 'absolute',
                                right: 2,
                                top: 2,
                                zIndex: 1,
                              }}
                              onPress={() => {
                                let newArray = [...carImages];
                                newArray.splice(index, 1);
                                setCarImages(newArray);
                              }}
                            />
                            {imageLoading?.car && (
                              <ActivityIndicator
                                style={styles.activty}
                                size={'small'}
                                color={Color.black}
                              />
                            )}
                            <CustomImage
                              source={{
                                uri: item?.uri,
                              }}
                              resizeMode={'stretch'}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    {carImages?.length < 3 && (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Icon
                          name={'plus'}
                          as={AntDesign}
                          color={Color.black}
                          size={moderateScale(30, 0.3)}
                          onPress={() => {
                            setImagePicker(true);
                          }}
                        />
                      </View>
                    )}
                  </View>

                  <CustomText style={styles.image_headindg}>
                    Upload Registration Document
                    <CustomText style={styles.sub_heading}>
                      (Front & Back)
                    </CustomText>
                  </CustomText>

                  <View style={styles.imagesContainer}>
                    <FlatList
                      scrollEnabled={false}
                      horizontal
                      data={registrationImage}
                      showsHorizontalScrollIndicator={false}
                      style={{
                        flexGrow: 0,
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={[
                              styles.addImageContainer,
                              {
                                borderWidth: 0,
                                borderRadius: moderateScale(10, 0.3),
                              },
                            ]}>
                            <Icon
                              name={'close'}
                              as={FontAwesome}
                              color={Color.black}
                              size={moderateScale(12, 0.3)}
                              style={{
                                position: 'absolute',
                                right: 2,
                                top: 2,
                                zIndex: 1,
                              }}
                              onPress={() => {
                                let newArray = [...registrationImage];
                                newArray.splice(index, 1);
                                setRegistrationImage(newArray);
                              }}
                            />
                            {imageLoading?.registration && (
                              <ActivityIndicator
                                style={styles.activty}
                                size={'small'}
                                color={Color.black}
                              />
                            )}
                            <CustomImage
                              source={{
                                uri: item?.uri,
                              }}
                              resizeMode={'stretch'}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    {registrationImage?.length < 2 && (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Icon
                          name={'plus'}
                          as={AntDesign}
                          color={Color.black}
                          size={moderateScale(30, 0.3)}
                          onPress={() => {
                            setRegistrationPicker(true);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <CustomText style={styles.image_headindg}>
                    Upload insurance Document
                    <CustomText style={styles.sub_heading}>
                      (Front & Back)
                    </CustomText>
                  </CustomText>

                  <View style={styles.imagesContainer}>
                    <FlatList
                      scrollEnabled={false}
                      horizontal
                      data={insuranceImage}
                      showsHorizontalScrollIndicator={false}
                      style={{
                        flexGrow: 0,
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={[
                              styles.addImageContainer,
                              {
                                borderWidth: 0,
                                borderRadius: moderateScale(10, 0.3),
                              },
                            ]}>
                            <Icon
                              name={'close'}
                              as={FontAwesome}
                              color={Color.black}
                              size={moderateScale(12, 0.3)}
                              style={{
                                position: 'absolute',
                                right: 2,
                                top: 2,
                                zIndex: 1,
                              }}
                              onPress={() => {
                                let newArray = [...insuranceImage];
                                newArray.splice(index, 1);
                                setInsuranceImage(newArray);
                              }}
                            />
                            {imageLoading?.insurance && (
                              <ActivityIndicator
                                style={styles.activty}
                                size={'small'}
                                color={Color.black}
                              />
                            )}
                            <CustomImage
                              source={{
                                uri: item?.uri,
                              }}
                              resizeMode={'stretch'}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    {insuranceImage?.length < 2 && (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Icon
                          name={'plus'}
                          as={AntDesign}
                          color={Color.black}
                          size={moderateScale(30, 0.3)}
                          onPress={() => {
                            setInsurancePicker(true);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <CustomText style={styles.image_headindg}>
                    Upload licence Document
                    <CustomText style={styles.sub_heading}>
                      (Front & Back)
                    </CustomText>
                  </CustomText>

                  <View style={styles.imagesContainer}>
                    <FlatList
                      scrollEnabled={false}
                      horizontal
                      data={licenceImages}
                      showsHorizontalScrollIndicator={false}
                      style={{
                        flexGrow: 0,
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={[
                              styles.addImageContainer,
                              {
                                borderWidth: 0,
                                borderRadius: moderateScale(10, 0.3),
                              },
                            ]}>
                            <Icon
                              name={'close'}
                              as={FontAwesome}
                              color={Color.black}
                              size={moderateScale(12, 0.3)}
                              style={{
                                position: 'absolute',
                                right: 2,
                                top: 2,
                                zIndex: 1,
                              }}
                              onPress={() => {
                                let newArray = [...licenceImages];
                                newArray.splice(index, 1);
                                setLicenceImages(newArray);
                              }}
                            />
                            {imageLoading?.licenceImages && (
                              <ActivityIndicator
                                style={styles.activty}
                                size={'small'}
                                color={Color.black}
                              />
                            )}
                            <CustomImage
                              source={{
                                uri: item?.uri,
                              }}
                              resizeMode={'stretch'}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    {licenceImages?.length < 2 && (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Icon
                          name={'plus'}
                          as={AntDesign}
                          color={Color.black}
                          size={moderateScale(30, 0.3)}
                          onPress={() => {
                            setLicencePicker(true);
                          }}
                        />
                      </View>
                    )}
                  </View>

                  <CustomText style={styles.image_headindg}>
                    Upload Ssn image
                    <CustomText style={styles.sub_heading}>
                      (Front & Back)
                    </CustomText>
                  </CustomText>

                  <View style={styles.imagesContainer}>
                    <FlatList
                      scrollEnabled={false}
                      horizontal
                      data={ssnImages}
                      showsHorizontalScrollIndicator={false}
                      style={{
                        flexGrow: 0,
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={[
                              styles.addImageContainer,
                              {
                                borderWidth: 0,
                                borderRadius: moderateScale(10, 0.3),
                              },
                            ]}>
                            <Icon
                              name={'close'}
                              as={FontAwesome}
                              color={Color.black}
                              size={moderateScale(12, 0.3)}
                              style={{
                                position: 'absolute',
                                right: 2,
                                top: 2,
                                zIndex: 1,
                              }}
                              onPress={() => {
                                let newArray = [...ssnImages];
                                newArray.splice(index, 1);
                                setSsnImages(newArray);
                              }}
                            />
                            {imageLoading?.ssnImages && (
                              <ActivityIndicator
                                style={styles.activty}
                                size={'small'}
                                color={Color.black}
                              />
                            )}
                            <CustomImage
                              source={{
                                uri: item?.uri,
                              }}
                              resizeMode={'stretch'}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    {ssnImages?.length < 2 && (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Icon
                          name={'plus'}
                          as={AntDesign}
                          color={Color.black}
                          size={moderateScale(30, 0.3)}
                          onPress={() => {
                            setSsnPicker(true);
                          }}
                        />
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      marginVertical: moderateScale(10, 0.6),
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(12, 0.6),
                        color: Color.red,
                        fontWeight: '500',
                      }}>
                      Instructions :
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        color: Color.grey,
                      }}>
                      Please add valid Imformation about your Car add front and
                      clear image.
                    </CustomText>
                  </View>
                  <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator size={'small'} color={Color.white} />
                      ) : (
                        'Submit'
                      )
                    }
                    fontSize={moderateScale(15, 0.3)}
                    textColor={Color.white}
                    borderWidth={0}
                    borderColor={Color.white}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.075}
                    bgColor={Color.darkBlue}
                    textTransform={'capitalize'}
                    onPress={handleSubmit}
                  />
                </>
              );
            }}
          </Formik>
        </View>
        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setMultiImages={setCarImages}
        />
        <ImagePickerModal
          show={registrationPicker}
          setShow={setRegistrationPicker}
          setMultiImages={setRegistrationImage}
        />
        <ImagePickerModal
          show={insurancePicker}
          setShow={setInsurancePicker}
          setMultiImages={setInsuranceImage}
        />
        <ImagePickerModal
          show={ssnPicker}
          setShow={setSsnPicker}
          setMultiImages={setSsnImages}
        />
        <ImagePickerModal
          show={licencePicker}
          setShow={setLicencePicker}
          setMultiImages={setLicenceImages}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(24, 0.6),
    color: Color.themeBlack,
    paddingVertical: moderateScale(10, 0.6),
    paddingTop: windowHeight * 0.02,
    marginTop: moderateScale(20, 0.6),
  },
  container_field: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    marginBottom: moderateScale(10, 0.6),
  },
  feild_container: {
    borderWidth: 0.5,
    borderColor: '#28272369',
    borderRadius: 20,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    marginBottom: moderateScale(10, 0.6),
  },

  fields_box: {
    borderWidth: 0.3,
    borderColor: '#28272369',
    borderRadius: 20,
    height: windowHeight * 0.5,
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingTop: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  addImageContainer: {
    height: windowHeight * 0.12,
    width: windowHeight * 0.1,
    alignSelf: 'flex-start',
    borderRadius: moderateScale(15, 0.6),
    backgroundColor: Color.lightGrey,
    marginBottom: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(5, 0.6),
    shadowColor: Color.lightGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    overflow: 'hidden',
  },
  imagesContainer: {
    marginTop: moderateScale(10, 0.3),
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  image_headindg: {
    color: Color.black,
    fontSize: moderateScale(12, 0.3),
    textAlign: 'left',
    width: '90%',
  },
  sub_heading: {
    color: Color.black,
    fontSize: moderateScale(10, 0.3),
  },
  activty: {
    position: 'absolute',
    right: 30,
    top: 50,
    zIndex: 1,
  },
  drop: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    backgroundColor: Color.white,
    borderRadius: 30,
    borderWidth: 0.3,
    borderColor: Color.darkGray,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingTop: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.3),
  },
  tooltip: {
    position: 'absolute',
    right: 15,
    top: -10,
    marginBottom: moderateScale(10, 0.6),
    backgroundColor: Color.blue,
    padding: moderateScale(5, 0.6),
    width: windowWidth * 0.5,
    zIndex: 1,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'flex-start',
    paddingHorizontal: moderateScale(5, 0.6),
  },
});

export default AddYourCar;
