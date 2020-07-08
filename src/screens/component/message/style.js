import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundView: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginRight: 10,
  },
  infoView: {
    width: screenWidth - 120,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  name: {
    fontSize: 20,
    color: '#424649',
    width: '100%',
    flex: 1,
    textAlignVertical: 'center',
  },
  name2: {
    fontSize: 20,
    color: '#707070',
    width: '100%',
    flex: 1,
    textAlignVertical: 'center',
  },
  message: {
    fontSize: 16,
    color: '#CDCDCF',
    width: '100%',
    textAlignVertical: 'center',
    textAlign: 'right',
    flex: 1,
  },
  messageCount: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7755CD',
  },
});

export default styles;
