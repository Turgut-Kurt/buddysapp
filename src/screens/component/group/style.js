import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundView: {
    width: '100%',
    height: '100%',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F3FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F61D45',
  },

  text: {
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
});

export default styles;
