import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width / 3 - 10;
const screenHeight = Dimensions.get('window').height / 3 - 50;

const styles = StyleSheet.create({
  backgroundView: {
    width: screenWidth,
    height: screenHeight,
    borderTopRightRadius: screenWidth / 2,
    borderTopLeftRadius: screenWidth / 2,
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 10,
  },
  blurView: {
    width: screenWidth,
    height: screenHeight,
    borderTopRightRadius: screenWidth / 2,
    borderTopLeftRadius: screenWidth / 2,
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 10,
    position: 'absolute'
  },
  infoView: {
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
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  locationText: {
    color: '#cdcdcd',
    width: '100%',
    textAlign: 'center',
  },
  cardView: {
    marginTop: -20,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(112,112,112,0.5)',
  },
  likeButton: {
    width: 30,
    height: 30,
    backgroundColor: '#7755CD',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
