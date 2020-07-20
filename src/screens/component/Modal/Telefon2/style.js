import {StyleSheet} from 'react-native';
import {calcHeight, calculate, calcWidth} from '../../../../Dimensions';

const styles = StyleSheet.create({
  MViewStyle1: {
    flex: 1,
    marginHorizontal: calculate(6),
    marginVertical: calculate(13.6),
    backgroundColor: '#ffffff',
    borderRadius: calculate(2.2),
    overflow: 'hidden',
  },
  TopView: {flex: 1.2},

  absView: {
    width: '98%',
    zIndex: 3,
    position: 'absolute',
    height: calculate(11),
    overflow: 'visible',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: calculate(4),
  },
  absViewImage: {
    width: '100%',
    height: '100%',
    overflow: 'visible',
    alignSelf: 'center',
  },
  MViewStyle2: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  GradientStyle2: {
    position: 'absolute',
    width: calculate(100),
    height: calculate(100),
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    top: -calculate(80),
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  backImageinView1: {flex: 1, justifyContent: 'center'},
  backImageinView1inView1: {
    flex: 1.1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  phoneSyle: {width: calculate(8), height: calculate(8)},
  backImageinView1inView2: {flex: 0.9},
  backImageinView2: {flex: 4.5, paddingTop: calculate(3)},
  TextStyleHeader: {
    fontSize: calculate(6.3),
    color: '#ffffff',
    fontFamily: 'Montserrat-ExtraBoldItalic',
  },
  FreeView1: {flex: 0.2},
  MViewStyle3: {
    flex: 0.8,
    overflow: 'hidden',
    paddingHorizontal: calculate(3.3),
    alignItems: 'center',
  },
  TextStyle2: {
    fontSize: calculate(3),
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  MViewStyle4: {
    flex: 1.225,
    overflow: 'hidden',
    marginHorizontal: calculate(1.4),
    flexDirection: 'row',
  },
  MViewStyle5: {
    flex: 1.075,
    overflow: 'hidden',
  },
  MViewStyle13: {
    flex: 1,
  },
  MViewStyle14: {
    flex: 0.5,
  },
  PhoneTextStyle: {
    fontSize: calculate(4),
    color: '#F61F48',
    textAlign: 'center',
  },
  FreeStyle: {flex: 0},
});
export default styles;
