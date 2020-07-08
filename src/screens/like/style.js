import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundView: {
    width: '100%',
    height: '100%',
  },
  topView: {
    height: '20%',
    width: '100%',
  },
  imageBackgroundView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  tabView1: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
  tabView2: {
    flex: 1.3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },

  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabTextSelected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  tabPage: {
    width: screenWidth,
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
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    height: '100%',
    textAlign: 'center',
  },
});

export default styles;
