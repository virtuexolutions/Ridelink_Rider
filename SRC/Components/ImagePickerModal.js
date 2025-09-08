import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  I18nManager,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  // Modal,
  Button,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
};

const ImagePickerModal = props => {
  let {show, setShow, setFileObject, setMultiImages, crop} = props;

  const openGallery = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };

    launchImageLibrary(options, response => {
      if (Platform.OS === 'ios') {
        setShow(false);
      }
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        Alert.alert(response.customButton);
      } else {
        setFileObject &&
          setFileObject({
            uri: response?.assets[0]?.uri,
            type: response?.assets[0]?.type,
            name: response?.assets[0]?.fileName,
          });

        setMultiImages &&
          setMultiImages(x => [
            ...x,
            {
              uri: response?.assets[0]?.uri,
              type: response?.assets[0]?.type,
              name: response?.assets[0]?.fileName,
            },
          ]);
      }
    });
    // }
  };

  const openCamera = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
    if (Platform.OS === 'android') {
      if (PermissionsAndroid.PERMISSIONS.CAMERA) {
      } else {
        await requestCameraPermission();
      }
    }
    launchCamera(options, response => {
       if (response.didCancel) {
      console.log("User cancelled image picker");
      return;
    }
    if (response.errorCode) {
      console.log("ImagePicker Error: ", response.errorMessage);
      return;
    }
    if (!response.assets || response.assets.length === 0) {
      console.log("No image selected");
      return;
    }

    const image = response.assets[0];

    if (Platform.OS === 'ios') {
      setShow(false);
    } else {
      setFileObject &&
        setFileObject({
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });

      setMultiImages &&
        setMultiImages(x => [
          ...x,
          {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          },
        ]);
    }
    });
  };

  return (
    <Modal
      isVisible={show}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Color.white,
      }}
      onBackdropPress={() => {
        setShow(false);
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          height: Dimensions.get('window').height * 0.33,
          width: Dimensions.get('window').width * 0.8,
          paddingHorizontal: moderateScale(10, 0.3),
          paddingVertical: moderateScale(10, 0.3),
          borderRadius: Dimensions.get('window').width * 0.02,
        }}>
        <CustomText style={styles.modalHead}>Upload picture</CustomText>
        <View style={styles.modalContentContianer}>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                setShow(false);
              }
              openGallery();
            }}
            style={styles.modalContentBtn}>
            <Icon
              name={'folder-images'}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.white,
              }}
            />
            <CustomText style={styles.modalBtnText}>Gallery</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                setShow(false);
              }
              openCamera();
            }}
            style={styles.modalContentBtn}>
            <Icon
              name={'camera'}
              as={FontAwesome5}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.white,
              }}
            />
            <CustomText style={styles.modalBtnText}>Camera</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={styles.modalCancelBtn}>
          <CustomText
            style={[
              styles.modalBtnText,
              {
                color: Color.white,
              },
            ]}>
            Cancel
          </CustomText>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          // flex: 1,
          backgroundColor: Color.black,
          height: Dimensions.get("window").height * 0.33,
          width: Dimensions.get("window").width * 0.8,
          paddingHorizontal: moderateScale(10, 0.3),
          paddingVertical: moderateScale(10, 0.3),
          borderRadius: Dimensions.get("window").width * 0.02,
        }}
      >
        <CustomText style={styles.modalHead}>Upload picture</CustomText>
        <View style={styles.modalContentContianer}>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "android") {
                setShow(false);
              }
              openGallery();
            }}
            style={styles.modalContentBtn}
          >
            <Icon
              name={"folder-images"}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.black,
              }}
            />
            <CustomText style={styles.modalBtnText}>Gallery</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "android") {
                setShow(false);
              }
              openCamera();
            }}
            style={styles.modalContentBtn}
          >
            <Icon
              name={"camera"}
              as={FontAwesome5}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.black,
              }}
            />
            <CustomText style={styles.modalBtnText}>Camera</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={styles.modalCancelBtn}
        >
          <CustomText style={styles.modalBtnText}>Cancel</CustomText>
        </TouchableOpacity>
      </View> */}
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalHead: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: 'bold',
    marginBottom: moderateScale(7.5, 0.3),
  },
  modalContentContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    height: windowHeight * 0.21,
    borderBottomColor: Color.themeColor,
    borderBottomWidth: 2,
    borderTopColor: Color.themeColor,
    borderTopWidth: 2,
  },
  modalContentBtn: {
    backgroundColor: Color.themeBlack,
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.08,
    paddingVertical: windowHeight * 0.02,
    borderRadius: 15,
  },
  modalBtnText: {
    fontWeight: 'bold',
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
  },
  modalCancelBtn: {
    backgroundColor: Color.themeBlack,
    paddingVertical: windowHeight * 0.008,
    width: windowWidth * 0.2,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
  },
});

export default ImagePickerModal;
