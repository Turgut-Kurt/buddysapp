import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../Dimensions';

const styles = StyleSheet.create({
  backgroundView: {
    width: calcWidth(46.82),
    height: calcHeight(28.4),
    marginTop: calcWidth(2.12),
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  image1: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
  },
  linearGradient: {
    borderRadius: 15,
    paddingVertical: 3,
    flexDirection: 'row',
  },
  genderImage: {width: 17, height: 17},
  buttonText: {
    fontSize: 13,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
  },
  infoView: {
    flex: 1,
    overflow: 'hidden',
  },
  image2: {
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 150,
  },
  itemContentStyle: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemContentStyle1: {
    width: '92%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContentStyle2: {width: '30%'},
  itemContentStyle3: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle1: {fontSize: 15, textAlign: 'center', color: '#262628'},
  linearGradient2: {
    borderRadius: 15,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle2: {
    fontSize: 13,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  ViewStyle1: {
    width: '92%',
    height: '92%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    padding: calcWidth(8),
  },
  ViewStyle2: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewStyle3: {
    width: calcWidth(9.1),
    height: calcWidth(9.1),
    borderRadius: calcWidth(9.1),
    borderWidth: 1,
    borderColor: '#F35F99',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  ViewStyle4: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
  },
  ViewStyle5: {
    height: '30%',
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default styles;
