import { Dimensions } from "react-native";
// import { RFValue } from "react-native-responsive-fontsize";

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius_sm: 4,
    radius: 30,
    padding: 20,
    padding2: 12,

    // font sizes
    h8: 8,
    h9: 9,
    h10: 10,
    h11: 11,
    h12: 12,
    h13: 13,
    h14: 14,
    h16: 16,
    h18: 18,
    h20: 20,
    h24: 24,
    h22: 22,
    h23: 23,
    h24: 24,
    h26: 26,
    // screen width Height

    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height,
};

const appTheme = { SIZES };

export default appTheme;
