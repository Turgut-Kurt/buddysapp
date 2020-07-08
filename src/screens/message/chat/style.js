import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  profile: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  me: {
    minHeight: 50,
    flex: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#CDCDCF',
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
  },
  to: {
    minHeight: 50,
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#F3F3FB',
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
  },
  boxView: {
    borderTopWidth: 0.5,
    borderTopColor: '#E6E6E6',
    height: 75,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  errorText: {
    color: '#F61D45',
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 20,
  },
  commentSave: {
    backgroundColor: '#28a745',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    marginRight: 4,
  },
  commentSaveText: {
    fontSize: 14,
    color: 'white',
    padding: 6,
  },
  earlier: {
    marginBottom: 20,
  },
  earlierText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  messageWrapper: {
    width: screenWidth,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  messageBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  messageLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  messageRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  messageContent: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    paddingTop: 5,
    color: '#000',
  },
});

export default styles;
