import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  GradientStyle1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageStyle1: {
    left: 1,
    top: 40,
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 95,
    zIndex: 1,
  },
  imageStyle2: {
    position: 'absolute',
    right: 15,
    top: 50,
    width: 90,
    height: 90,
    borderRadius: 116,
    zIndex: 2,
  },
  imageStyle3: {
    width: 110,
    height: 110,
    borderRadius: 140,
    zIndex: 3,
  },
  imageStyle4: {
    position: 'absolute',
    top: 10,
    width: 60,
    height: 60,
    borderRadius: 116,
    zIndex: 2,
  },
});
export default styles;
