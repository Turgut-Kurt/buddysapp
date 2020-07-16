import {StyleSheet} from 'react-native';
import {calculate, calcWidth} from '../../../../../Dimensions';
const styles = StyleSheet.create({
  GradientStyle1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backImageStyle: {height: '100%', width: '100%', flexDirection: 'row'},
  ViewStyle1: {flex: 1, justifyContent: 'center'},
  ViewStyle2: {flex: 1.2, flexDirection: 'row'},
  ViewStyle4: {flex: 1},
  ViewStyle5: {flex: 2.3, paddingTop: calculate(1.2)},
  ViewStyle3: {aspectRatio: 1},
  imageStyle1: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: calculate(20),
  },

});
export default styles;
