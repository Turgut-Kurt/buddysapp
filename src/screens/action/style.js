import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
  },
  topView: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#424649',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageButton: {
    flex: 1,
    width: screenWidth * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardView: {
    marginTop: -30,
    width: screenWidth * 0.9,
    height: screenHeight * 0.75,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0)'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    flexDirection: 'column-reverse'
  },
  navigatorView: {
    marginTop: screenHeight * 0.1,
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  icon: {
    width: 30,
    height: 30,
  },
  percentView: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F61D45',
  },
  text: {
    color: '#ddd',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    width: screenWidth,
    textAlign: 'center'
  },
  infoView: {
    paddingHorizontal: 10,
  },
  noLikeUsers: {
    fontSize: 16,
    color: '#F61D45',
    paddingVertical: 30,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F61D45',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  filterIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;
