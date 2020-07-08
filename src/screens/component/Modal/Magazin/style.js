import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../Dimensions';

const styles = StyleSheet.create({
  MViewStyle1: {
    flex: 1,
    marginHorizontal: calcWidth(9.6),
    marginVertical: calcHeight(4.7),
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  MViewStyle2: {flex: 1, overflow: 'hidden'},
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
  MViewStyle3: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  TextStyle2: {fontSize: 18, textAlign: 'center'},

  MViewStyle4: {
    flex: 1.2,
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
  absView: {
    width: '100%',
    justifyContent: 'center',
    zIndex: 2,
    alignItems: 'center',
    position: 'absolute',
    height: '44%',
  },
});
export default styles;
