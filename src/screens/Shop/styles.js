import { Dimensions, StyleSheet, Platform } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === 'android' ? 20 : 5,
    flex: 1,
  },
  scrollViewContentContainer: {
    width: deviceWidth,
  },
  flatListWrapper: {
    paddingLeft: 20,
  },
  topView: {
    width: '100%',
    height: 50,
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
});

export default styles;
