import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  textInput: {
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  errorWrapper: {
    marginBottom: -10,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 10,
    color: '#F61D45',
    textAlign: 'center',
    paddingVertical: 4,
  },
});

export default styles;
