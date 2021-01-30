import {get} from 'mobx';
import React from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {colors, images, scaleSize, statusBarPadding} from 'src/themes';

interface AppBarProps {
  preset?: 'auth' | 'main';
  leftComponent?: any;
  rightComponent?: any;
}

export const AppBar = ({
  leftComponent,
  rightComponent,
  preset,
}: AppBarProps) => {
  return (
    <View style={preset == 'auth' ? containerStyleAuth : containerStyle}>
      <View style={leftComponentContainer}>{leftComponent}</View>
      <FastImage
        source={preset == 'auth' ? images.authHeaderIcon : images.logo}
        style={iconStyle}
        resizeMode="contain"
      />
      <View style={rightComponentContainer}>{rightComponent}</View>
    </View>
  );
};

const containerStyle: ViewStyle = {
  backgroundColor: colors.primary,
  height: scaleSize(52) + statusBarPadding(),
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const containerStyleAuth: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderBottomColor: colors.palette.grey,
  borderBottomWidth: StyleSheet.hairlineWidth,
  paddingTop: statusBarPadding(),
  height: scaleSize(60) + statusBarPadding(),
  justifyContent: 'center',
  alignItems: 'center',
};

const iconStyle: ViewStyle = {
  height: scaleSize(34),
  width: scaleSize(110),
  marginBottom: scaleSize(8),
};

const leftComponentContainer: ViewStyle = {
  position: 'absolute',
  left: scaleSize(8),
  top: getStatusBarHeight(),
  bottom: scaleSize(4),
  justifyContent: 'flex-end',
};

const rightComponentContainer: ViewStyle = {
  position: 'absolute',
  right: scaleSize(8),
  top: getStatusBarHeight(),
  bottom: scaleSize(4),
  justifyContent: 'flex-end',
};
