import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  okButton: {
    backgroundColor: '#F61D45',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: 140,
    marginTop: 100,
  },
  okButtonTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
  },
  text: {
    textAlign: 'center',
    color: '#355eff',
    fontWeight: '600',
    fontSize: 18,
  },
  note: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#dedede',
    borderWidth: 1,
    borderColor: '#a2a2a2',
    borderRadius: 10,
    color: '#000000',
    fontSize: 14,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 100,
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
  buyGooglePlay: {},
  buyGooglePlayText: {},
});

export default styles;
