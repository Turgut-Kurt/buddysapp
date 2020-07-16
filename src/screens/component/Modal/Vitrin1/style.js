import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth, calculate} from '../../../../Dimensions';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginHorizontal: calculate(5.3),
    marginVertical: calculate(6.4),
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  TopView: {flex: 1.472},
  TopCenterImageView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  ImageViewFlex1: {flex: 1},
  ImageViewFlex2: {
    flex: 1.5,
    justifyContent: 'flex-end',
    paddingBottom: calculate(8),
  },
  ImageViewFlex2inView: {
    aspectRatio: 1,
    zIndex: 2,
  },
  ImageViewFlex2inViewImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: calculate(20),
  },
  absView: {
    width: '100%',
    zIndex: 6,
    position: 'absolute',
    height: calculate(11),
    overflow: 'visible',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  absViewImage: {
    width: '100%',
    resizeMode: 'contain',
    overflow: 'visible',
  },
  backimgTextStyle: {
    position: 'absolute',
    marginHorizontal: calculate(6.1),
    lineHeight: calculate(5.8),
    fontSize: calculate(6),
    fontFamily: 'Montserrat-ExtraBoldItalic',
    textAlign: 'center',
    color: '#EF0061',
  },
  tacImageStyle: {
    position: 'absolute',
    top: -calculate(3),
    right: calculate(5),
    zIndex: 5,
    width: calculate(6.3),
    height: calculate(4.8),
    transform: [{ rotate: '20deg' }]
  },
  MViewStyle2: {flex: 1, overflow: 'hidden'},
  FreeView: {flex: 0.2},

  CenterTextView: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: calculate(3.5),
    alignItems: 'center',
  },
  TextStyle2: {
    fontSize: calculate(2.6),
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  ekTextStyle2: {paddingTop: calculate(3.4)},
  PacketView: {flex: 1.111},
  extraPacketView: {
    overflow: 'hidden',
    marginHorizontal: calculate(1.3),
    flexDirection: 'row',
  },
  BottomView: {flex: 1.166},
  GradientStyle1: {
    flex: 1,
  },
  MViewStyle6: {flex: 1},
  TextStyle1: {fontSize: 35, textAlign: 'center', color: '#ffffff'},
  MViewStyle7: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  MViewStyle8: {
    width: calcWidth(16),
    height: calcWidth(16),
    borderRadius: calcWidth(16),
    backgroundColor: '#ffffff',
    marginHorizontal: calcWidth(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageStyle1: {
    width: calcWidth(12),
    height: calcWidth(12),
    resizeMode: 'contain',
  },

  MViewStyle4: {
    flex: 1.47,
    overflow: 'hidden',
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  MViewStyle9: {
    flex: 1,
    paddingHorizontal: 4,
    justifyContent: 'flex-end',
  },
  MViewStyle10: {
    borderWidth: 0.1,
    paddingTop: 3,
    paddingBottom: 20,
    marginBottom: 6,
    borderRadius: 20,
  },
  TextStyle3: {
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextStyle4: {fontSize: 15, color: '#F61F48'},
  TextStyle5: {
    fontSize: 13,
    color: '#626260',
    textAlign: 'center',
    marginVertical: 3,
  },
  TextStyle6: {
    zIndex: 1,
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: 'black',
    textAlign: 'center',
    padding: 3,
    borderRadius: 15,
  },
  MViewStyle11: {
    flex: 1,
    paddingHorizontal: calcWidth(1.6),
    justifyContent: 'center',
  },
  MViewStyle12: {
    borderWidth: 0.1,
    paddingTop: 3,
    paddingBottom: 20,
    borderRadius: 20,
  },
  TextStyle7: {
    zIndex: 1,
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#0A916D',
    textAlign: 'center',
    padding: 3,
    borderRadius: 15,
    bottom: 50,
  },
  MViewStyle5: {
    flex: 1.1,
    overflow: 'hidden',
  },
  MViewStyle13: {
    flex: 1,
  },
  MViewStyle14: {
    flex: 0.5,
  },
});
export default styles;
