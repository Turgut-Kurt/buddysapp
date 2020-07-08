import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  BackHandler,
} from 'react-native';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import AuthControl from '../../utils/AuthControl';
import ShopButton from '../Shop/components/ShopButton';
import Share from 'react-native-share';
const gizililik_sozlesmesi = 'http://www.buddyapptr.com';
const kullanim_sozlesmesi = 'http://www.buddyapptr.com';

export default class Settings extends React.Component {
  logout = () => {
    AuthControl.removeToken();
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButton();
      return true;
    });
  }
  handleBackButton() {
    this.props.navigation.goBack();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    const {goBack, navigate} = this.props.navigation;
    return (
      <View style={styles.backgroundView}>
        <View style={styles.topView}>
          <Text style={styles.titleText}>Ayarlar</Text>

          <TouchableOpacity
            style={{
              width: 40,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              goBack();
            }}>
            <Image
              style={{width: 30, height: 30, resizeMode: 'contain'}}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            <Text style={styles.groupText}>Hesap</Text>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Shop')}>
              <Text style={{ flex: 1 }}>Mağaza</Text>
              <Image
                source={require('../../assets/images/next.png')}
                style={{ width: 20, height: 20 }}
              />
           </TouchableOpacity>*/}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('InfoChange')}>
              <Text style={{flex: 1}}>İsim & Durum & Hikaye</Text>
              <Image
                source={require('../../assets/images/next.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('PassChange')}>
              <Text style={{flex: 1}}>Şifremi Değiştir</Text>
              <Image
                source={require('../../assets/images/next.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('InstagramChange')}>
              <Text style={{flex: 1}}>İnstagram Bağla</Text>
              <Image
                source={require('../../assets/images/next.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <Text style={styles.groupText}>Diğer</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(gizililik_sozlesmesi)}>
              <Text style={{flex: 1}}>Gizlilik Politikası</Text>
              <Image
                source={require('../../assets/images/next.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(kullanim_sozlesmesi)}>
              <Text style={{flex: 1}}>Kullanım Sözleşmesi</Text>
              <Image
                source={require('../../assets/images/next.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <ShopButton
            text="Mağaza"
            color="#533B8F"
            fontColor={'white'}
            icon={false}
            onPress={() => navigate('Shop')}
          />
          <ShopButton
            text="Paylaş"
            color="#533B8F"
            fontColor={'white'}
            icon={false}
            onPress={() => {
              const shareOptions = {
                message:
                  "Sen de Buddy'e gel ve insanlarla tanış. https://play.google.com/store/apps/details?id=com.buddy.appsocialbuddy",
                title: 'Buddy',
              };
              Share.open(shareOptions)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
            }}
          />
          <ShopButton
            text="Çıkış Yap"
            color="#533B8F"
            fontColor={'white'}
            icon={false}
            onPress={() => {
              this.logout();
            }}
          />
          <Text style={{width: '100%', textAlign: 'center'}}>
            Destek için info@buddyapptr.com
          </Text>
        </ScrollView>
      </View>
    );
  }
}
