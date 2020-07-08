import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width / 3 - 10;
const screenHeight = Dimensions.get('window').height / 3 - 50;

const styles = StyleSheet.create({
  backgroundView: {
    width: screenWidth,
    height: screenHeight,
    borderWidth: 0.5,
    borderColor: 'rgba(112,112,112,0.5)',
    borderTopRightRadius: screenWidth / 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  blurImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9,
    resizeMode: 'cover',
  },
  infoView: {
    borderBottomLeftRadius: screenWidth / 4,
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  information: {
    width: '100%',
    flexDirection: 'row',
    height: '20%',
    backgroundColor: 'rgba(30,30,30,0.1)',
  },
  percentText: {
    color: '#7755CD',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nameText: {
    marginTop: 10,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  locationText: {
    color: '#cdcdcd',
    width: '100%',
    textAlign: 'center',
  },
  online: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    marginRight: screenWidth / 8,
  },
});

export default styles;
