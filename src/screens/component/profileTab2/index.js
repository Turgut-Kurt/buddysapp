import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import NavigationService from '../../../services/NavigationService';
import NoUserPhoto from '../../../assets/images/no-user.jpg';
import Voman from '../../../assets/images/Gender-woman.png';
import Man from '../../../assets/images/Gender-man.png';
import Tab from '../../../assets/tab1user3.png';
import PremiumSmall from '../../../assets/images/premiumsmall.png';
class ProfileTab2 extends Component {
  goProfile = () => {
    NavigationService.navigate('Profilenew', {items: this.props});
  };
  renderItemContent = () => {
    const {username, first_name, similar_rate, profile} = this.props;
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return (
      <>
        <View style={styles.infoView}>
          <ImageBackground
            style={styles.image}
            source={
              profile && profile.photo ? {uri: profile.photo} : NoUserPhoto
            }>
            <View style={styles.itemContentStyle}>
              <View style={styles.itemContentStyle1}>
                <Text style={styles.nameText}>
                  {first_name ? `${first_name}` : username}
                </Text>
                <View style={styles.itemContentStyle2}>
                  {profile.gender_choices === 'WM' ? (
                    <LinearGradient
                      start={{x: 0.0, y: 1.0}}
                      end={{x: 1.0, y: 1.0}}
                      locations={[0.2, 0.6, 0.9]}
                      colors={['#FF8960', '#FF7583', '#FF62A5']}
                      style={styles.linearGradient}>
                      <View style={styles.itemContentStyle3}>
                        <Image style={styles.genderImage} source={Voman} />
                      </View>
                      <Text style={styles.buttonText}>
                        {getAge(profile.birth_date)}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <LinearGradient
                      start={{x: 0.0, y: 1.0}}
                      end={{x: 1.0, y: 1.0}}
                      locations={[0.2, 0.6, 0.9]}
                      colors={['#3A63FF', '#4FB2FF', '#62F9FF']}
                      style={styles.linearGradient}>
                      <View style={styles.itemContentStyle3}>
                        <Image style={styles.genderImage} source={Man} />
                      </View>
                      <Text style={styles.buttonText}>
                        {getAge(profile.birth_date)}
                      </Text>
                    </LinearGradient>
                  )}
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </>
    );
  };
  renderItem = () => {
    const {profile, type, vip, is_vip} = this.props;
    if (is_vip === true) {
      return (
        <TouchableOpacity
          style={styles.backgroundView}
          onPress={this.goProfile}
          disabled={!vip}>
          {!vip ? (
            <ImageBackground style={styles.image1} source={Tab}>
              <View style={styles.ViewStyle1}>
                <View style={styles.ViewStyle2}>
                  <View style={styles.ViewStyle3}>
                    <Image source={PremiumSmall} style={styles.image2} />
                  </View>
                </View>
                <View style={styles.ViewStyle4}>
                  <Text style={styles.textStyle1}>Vitrine Katil</Text>
                </View>
                <View style={styles.ViewStyle5}>
                  <LinearGradient
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 1.0}}
                    locations={[0.1, 0.4, 0.9]}
                    colors={['#FF62A5', '#FB4076', '#F61D45']}
                    style={styles.linearGradient2}>
                    <Text style={styles.textStyle2}>Satin Al</Text>
                  </LinearGradient>
                </View>
              </View>
            </ImageBackground>
          ) : (
            this.renderItemContent()
          )}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.backgroundView}
          onPress={this.goProfile}>
          {this.renderItemContent()}
        </TouchableOpacity>
      );
    }
  };

  render() {
    return this.renderItem();
  }
}

export default ProfileTab2;
