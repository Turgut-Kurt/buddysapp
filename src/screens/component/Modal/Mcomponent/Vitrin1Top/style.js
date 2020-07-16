import {StyleSheet} from 'react-native';
import {calculate, calcWidth} from '../../../../../Dimensions';
const styles = StyleSheet.create({
  GradientStyle1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backImageStyle: {height: '100%', width: '100%', flexDirection: 'row'},
  FreeLeftView: {flex: 0.5},
  LeftImageView: {flex: 2.248, paddingTop: calculate(2)},
  FreeRightView: {flex: 2.321},
  RightImageView: {flex: 2.86, justifyContent: 'center'},
  ViewStyle3: {aspectRatio: 1},
  imageStyle1: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: calculate(20),
  },
});
export default styles;
