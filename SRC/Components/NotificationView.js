import { Icon } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../Assets/Utilities/Color'
import { windowWidth } from '../Utillity/utils'
import CustomText from './CustomText'

const NotificationView = ({ data }) => {
    return (
        <View style={styles.main_view}>
            <View style={styles.image_view}>
                <Icon as={MaterialIcons} name={'notifications'} size={moderateScale(25, 0.6)} color={Color.white} />
            </View>
            <View style={{ marginLeft: moderateScale(10, 0.6) }}>
                <CustomText isBold style={styles.heading}>{data?.heading}</CustomText>
                <CustomText numberOfLines={2} style={styles.text}>{data?.text}</CustomText>
                <CustomText style={[styles.text, {
                    textAlign: 'right',
                    width: windowWidth * 0.7,
                }]}>12-12-20</CustomText>
            </View>
        </View>
    )
}

export default NotificationView

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.20,
        backgroundColor: Color.lightGrey,
        marginTop: moderateScale(10, 0.6),
        alignSelf: 'center',
        borderRadius: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: moderateScale(5, 0.6)
    },
    image_view: {
        width: moderateScale(50, 0.6),
        height: moderateScale(50, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: windowWidth,
        backgroundColor: 'rgba(64, 64, 65, 0.5)',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    heading: {
        fontSize: moderateScale(14, 0.6),
        width: windowWidth * 0.73,
        color: Color.grey
    },
    text: {
        fontSize: moderateScale(11, 0.6),
        width: windowWidth * 0.73,
        color: Color.grey
    }
})