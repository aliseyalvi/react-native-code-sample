import React from 'react';
import {Dimensions, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, scaleSize} from 'src/themes';

export const AdBanner = ({link}: {link: string}) => {
  return (
    <>
      {link !== '' && (
        <FastImage
          style={containerStyle}
          source={{uri: link}}
          resizeMode={'contain'}
        />
      )}
    </>
  );
};

const screenWidth = Dimensions.get('screen').width;
const containerStyle: ViewStyle = {
  height: (screenWidth * 76) / 588,
  width: screenWidth,
};
