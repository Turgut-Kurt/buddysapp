import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundView: {
    width: '100%',
    height: '100%',
  },
  topView: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  titleText: {
    color: '#424649',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  newMessageButton: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  rowBack: {
    backgroundColor: '#F61D45',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  refresh: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;
