import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginVertical: 30,
  },
  backButton: {
    width: 50,
    height: 50,
    padding: 10,
  },
  backButtonIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    borderColor: '#848484',
    paddingBottom: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  button: {
    backgroundColor: '#F61D45',
    borderRadius: 30,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    color: '#FFFFFF',
  },
  errorWrapper: {
    marginBottom: 10,
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
