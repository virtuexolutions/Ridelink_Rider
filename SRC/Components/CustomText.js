import React from 'react';
import {Text} from 'react-native';
import Color from '../Assets/Utilities/Color';
import {FONTS} from '../Constant/theme';

const CustomText = props => {
  const {children, numberOfLines, textAlign, style, isBold, onPress} = props;
  return (
    <Text
      onPress={onPress}
      style={[
        {
          textTransform: 'capitalize',
          // textTransform: "capitalize",
          color: Color.black,
          textAlign: textAlign,
        },
        style,
        {fontFamily: 'Quicksand-Regular'},
        isBold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'bold',
        },
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default CustomText;
