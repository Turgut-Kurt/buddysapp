import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Container: {width: screenWidth},
  flatStyle: {marginHorizontal: 4},
  backgroundView: {
    width: '100%',
    height: '100%',
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
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default styles;
