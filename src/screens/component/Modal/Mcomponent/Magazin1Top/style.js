import {StyleSheet} from 'react-native';
import {calculate, calcWidth} from '../../../../../Dimensions';

const styles = StyleSheet.create({
  GradientStyle1: {
    flex: 1,
  },
  backImageStyle: {height: '100%', width: '100%'},
  MTextView: {flex: 1},
  MTextViewinText: {
    fontSize: calculate(6),
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Montserrat-ExtraBoldItalic',
  },
  MImageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  MImageViewinView: {
    width: calculate(10),
    height: calculate(10),
    borderRadius: calcWidth(16),
    backgroundColor: '#ffffff',
    marginHorizontal: calcWidth(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  MImageViewinViewinImage: {
    width: calculate(6.5),
    height: calculate(6.5),
    resizeMode: 'contain',
  },
  MFreeView: {flex: 0.8},
});
export default styles;
