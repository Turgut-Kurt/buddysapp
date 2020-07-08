import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#F61D45',
  },
  splash1Image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  descriptionText: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  tabPage: {
    paddingTop: 50,
    width: screenWidth,
    alignItems: 'center',
  },
  button: {
    flex: 0.5,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F87878',
  },
  circleWhite: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default styles;
