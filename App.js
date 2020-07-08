import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import AppNavigator from './src/navigations';
import NavigationService from './src/services/NavigationService';
import { Provider } from 'react-redux';
import store from './src/store';

class App extends React.Component {
  componentDidMount = async () => {
    try {
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
      }
      console.warn(1)
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

export default App;
