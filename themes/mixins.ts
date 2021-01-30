import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';

export const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const statusBarPadding = () =>
  Platform.OS === 'ios' ? getStatusBarHeight() : scaleSize(4);

export const scaleFont = (size: number) => RFValue(size, 812);

function dimensions(
  top: number,
  right = top,
  bottom = top,
  left = right,
  property: any,
) {
  let styles: any = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color?: 'rgba(71, 121, 131, 0.1)',
  offset = {height: 0, width: 0},
  radius = 18,
  opacity = 0.05,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
