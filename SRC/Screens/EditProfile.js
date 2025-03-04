import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ReviewComponent from '../Components/ReviewComponent';

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: moderateScale(150, 0.6),
        // paddingHorizontal :moderateScale(20,.6)
      }}
      showsVerticalScrollIndicator={false}
      style={{
        minHeight: windowHeight,
        backgroundColor: 'white',
      }}>
      <Header
        showBack={true}
        title={'Edit Profile'}
        headerColor={['white', 'white']}
      />
      <View style={styles.info}>
        {/* <View style={styles.imageContainer}>
          <CustomImage
            source={require('../Assets/Images/dummyUser1.png')}
            style={styles.image}
          />
        </View> */}
        <TouchableOpacity
          style={styles.camera}
          onPress={() => {
            // setModalVisible(true);
          }}>
          <Icon
            as={FontAwesome}
            name="camera"
            size={moderateScale(14, 0.3)}
            onPress={() => {
              // setModalVisible(true);
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.names}>
          <CustomText style={styles.text}>Parsley Montana</CustomText>
          <CustomText style={styles.subText}>San Francisco</CustomText>
        </View>
      </View>
      <View style={styles.profileDetails}>
        <View style={styles.field}>
          <CustomText>Phone Number</CustomText>
          <CustomText style={styles.value}>584-490-9153</CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Email</CustomText>
          <CustomText style={styles.value}>@Gmail.Com</CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Gender</CustomText>
          <CustomText style={styles.value}>Male/Female</CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Birthday</CustomText>
          <CustomText style={styles.value}>July 29,2024</CustomText>
        </View>
      </View>
      {/* <ReviewComponent show={modalVisible} setShow={setModalVisible} /> */}
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  info: {
    width: windowWidth,
    paddingHorizontal: moderateScale(13, 0.2),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12, 0.4),
  },
  imageContainer: {
    width: windowWidth * 0.30,
    height: windowWidth * 0.30,
    borderRadius: (windowWidth * 0.35) / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  camera: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: (windowWidth * 0.09) / 2,
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#72AFED',
    position: 'absolute',
    left: moderateScale(100, 0.4),
    bottom: moderateScale(4, 0.4),
  },
  icon: {
    color: 'blue',
  },
  text: {
    color: '#636363',
    fontWeight: 'bold',
    fontSize: moderateScale(18, 0.3),
  },
  subText: {
    color: '#989898',
    fontSize: moderateScale(12, 0.4),
  },
  profileDetails: {
    alignItems: 'center',
    paddingVertical: moderateScale(12, 0.3),
    gap: moderateScale(12, 0.3),
  },
  field: {
    width: windowWidth * 0.90,
    borderColor: '#093AA429',
    borderWidth: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(24, 0.3),
    paddingVertical: moderateScale(14, 0.2),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  value: {
    color: '#000000',
    opacity: 0.47,
  },
});
