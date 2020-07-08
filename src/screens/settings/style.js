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
    backgroundColor: 'white',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  titleText: {
    color: '#424649',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
  },
  groupText: {
    height: 50,
    width: '100%',
    textAlignVertical: 'center',
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
