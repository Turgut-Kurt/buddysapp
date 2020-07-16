import {Dimensions, PixelRatio} from 'react-native';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const calcHeight = (x: number) =>
  PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);
export const calcWidth = (x: number) =>
  PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);

export const calculate = (x: number) => {
  return (calcWidth(x) + calcHeight(x)) / 2;
};
