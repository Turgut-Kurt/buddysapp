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
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  titleText: {
    color: '#424649',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabPage: {
    width: screenWidth,
    alignItems: 'center',
  },
  groupView: {
    width: '100%',
    paddingVertical: 10,
  },
  groupViewHeader: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#7755CD',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    height: '100%',
    textAlignVertical: 'center',
  },
  horizontalScrollView: {},
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F61D45',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  filterIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;
