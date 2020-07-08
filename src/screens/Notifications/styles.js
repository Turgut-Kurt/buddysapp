import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#d4d4d4',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  backButton: {
    width: 60,
    height: 60,
    padding: 10,
  },
  backButtonIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  notificationIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  notificationTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2e2e2e',
    paddingLeft: 20,
  },
  users: {
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  userItemWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  userItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
    marginRight: 6,
    backgroundColor: '#4a4a4a',
  },
  userItemContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#222222',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#4a4a4a',
    fontWeight: '600',
  },
  noNotifications: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7755CD',
    paddingVertical: 30,
  },
});

export default styles;
