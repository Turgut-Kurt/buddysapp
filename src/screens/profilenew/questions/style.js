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
  percentText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
    color: '#424649',
    fontSize: 25,
    fontWeight: 'bold',
  },
  actionsView: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#7755CD',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonSelected: {
    width: 50,
    height: 50,
    backgroundColor: '#f61d45',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  tabPage: {
    width: screenWidth,
    padding: 20,
  },
});

export default styles;
