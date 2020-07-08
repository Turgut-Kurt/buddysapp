import React, { Component } from 'react';
import { View, ActivityIndicator, Alert, Linking, BackHandler, Platform } from 'react-native';
import styles from './styles';
import AuthControl from '../../utils/AuthControl';
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
import DeviceInfo from 'react-native-device-info';
import NavigationService from '../../services/NavigationService';
class AuthLoading extends Component {
  async componentDidMount() {
    /* getAppstoreAppMetadata("com.buddy.appsocialbuddy")
       .then(metadata => {
         if (metadata.version != DeviceInfo.getBuildNumber()) {
           Alert.alert(
             "Güncelle",
             "Uygulamanız gücel değil lütfen güncelleyiniz.",
             [
               {
                 text: 'Tamam', onPress: () => {
                   BackHandler.exitApp()
                   Linking.openURL("https://play.google.com/store/apps/details?id=com.buddy.appsocialbuddy")
                 }
               },
             ],
           )
         }
       })
       .catch(err => {
         console.log("error occurred", err);
       });*/
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.handleOpenURLAndroid(url)
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    await AuthControl.setupAuth();
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL(event) {
    console.log('------------------')
    console.log(event);
    const route = e.url.replace(/.*?:\/\//g, '');
    console.log(route)
    console.log('------------------')
  }
  handleOpenURLAndroid(url) {
    console.log('------------------')
    const parsedUrl = url.split('/')
    console.log(parsedUrl)
    console.log(parsedUrl[parsedUrl.length - 1])
    console.log(parsedUrl[parsedUrl.length - 2]);

    NavigationService.navigate('PassChange', { uid: parsedUrl[parsedUrl.length - 2], token: parsedUrl[parsedUrl.length - 1] })
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

export default AuthLoading;
