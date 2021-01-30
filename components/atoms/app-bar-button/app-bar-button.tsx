import React from 'react';
import {ViewStyle, ImageStyle, TextStyle, Image, View} from 'react-native';
import {scaleSize, colors, scaleFont} from 'src/themes';
import {Text} from '..';
import {Touchable} from 'src/components/atoms/touchable/touchable';

interface AppBarButtonProps {
  onPress: () => void;
  iconSource: any;
  title: string;
  iconPosition: 'left' | 'right';
  fontSize?: number;
  iconSize?: number;
}

export const AppBarButton = ({
  onPress,
  iconSource,
  title,
  iconPosition,
  ...props
}: AppBarButtonProps) => {
  const iconStyleOverride = {...iconStyle};
  if (props.iconSize) {
    iconStyleOverride.width = props.iconSize;
    iconStyleOverride.height = props.iconSize;
  }

  const titleStyleOverride = {...titleStyle};
  if (props.fontSize) {
    titleStyleOverride.fontSize = props.fontSize;
  }

  const imgComponent = (
    <Image
      style={iconStyleOverride}
      source={iconSource}
      resizeMode={'contain'}
    />
  );
  const titleComponent = <Text style={titleStyleOverride}>{title}</Text>;

  return (
    <Touchable onPress={onPress}>
      <View style={appBarButtonContainer}>
        {iconPosition == 'left' ? (
          <>
            {imgComponent}
            {titleComponent}
          </>
        ) : (
          <>
            {titleComponent}
            {imgComponent}
          </>
        )}
      </View>
    </Touchable>
  );
};

const appBarButtonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: scaleSize(8),
};

const iconStyle: ImageStyle = {
  height: scaleSize(16),
  width: scaleSize(16),
  paddingHorizontal: scaleSize(16),
};

const titleStyle: TextStyle = {
  color: colors.palette.white,
  fontWeight: '400',
  fontSize: scaleFont(14),
};
