import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
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
  titleBottomText: {
    color: '#424649',
    fontSize: 15,
    marginLeft: 10,
  },
  contentView: {
    flex: 1,
  },
  actionBar: {
    position: 'absolute',
    left: 16,
    top: 0,
    flex: 1,
    padding: 10,
    backgroundColor: '#7755CD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
  },
  group: {
    paddingBottom: 5,
  },
  groupTitle: {
    fontSize: 20,
    color: '#7755CD',
    width: '100%',
    paddingBottom: 5,
  },
  groupDescription: {
    fontSize: 16,
    color: '#B8B8B8',
  },
  page: {
    height: screenHeight,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalClose: {
    marginVertical: 10,
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    alignSelf: 'center',
  },
  modalCloseText: {
    paddingVertical: 10,
    fontSize: 14,
    color: '#222222',
    textAlign: 'center',
  },
  modalImage: {
    flex: 1,
    resizeMode: 'contain',
    width: screenWidth,
    height: screenHeight
  },
});

export default styles;
