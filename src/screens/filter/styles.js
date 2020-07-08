import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F61D45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#424649',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonSelected: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F61D45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected2: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7755CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    width: '100%',
    height: screenHeight - 100,
    padding: 10,
  },
});

export default styles;
