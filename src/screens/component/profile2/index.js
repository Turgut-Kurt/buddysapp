import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import NavigationService from '../../../services/NavigationService';
import Config from '../../../utils/Config';
const NoUserPhoto = require('../../../assets/images/no-user.jpg');
import { connect } from 'react-redux';
import { axiosInstance } from '../../../utils/Api';
import { ILiked } from '../../../store/Actions/ILiked';
import { BlurView } from "@react-native-community/blur";

class Profile extends React.Component {
  goProfile = () => NavigationService.navigate('Profilenew', { items: this.props });
  goShop = () => NavigationService.navigate('Shop');
  onLike = async id => {
    console.log(id);
    try {
      await axiosInstance.post('action/like/', { user_id: id });
      this.props.ILiked();
    } catch (e) {
      console.log(e);
    }
  };
  async sendChat(first_name, username, profile, id) {
    const { userId } = await this.props.SignInReducer;
    const user = await axiosInstance.get(`api/users/${userId}/`);
    console.log(username)
    NavigationService.navigate('Chat', {
      User: {
        username: username,
        otherId: id,
      },
    })
  }
  render() {
    const {
      id,
      first_name,
      last_name,
      username,
      profile,
      similar_rate,
      isBlur,
    } = this.props;
    if (profile) {
      return (
        <TouchableOpacity
          style={styles.backgroundView}
          onPress={isBlur ? this.goShop : this.goProfile}>
          <View style={styles.infoView}>
            <ImageBackground
              style={styles.image}
              source={profile.photo ? { uri: profile.photo } : NoUserPhoto}
              blurRadius={isBlur ? 10 : 0}
            />

          </View>
          <View style={styles.cardView}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={isBlur ? this.goShop : () =>
                    this.sendChat(first_name, username, profile, id)

                  }>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../../assets/images/message.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={isBlur ? this.goShop : () => this.onLike(id)}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require('../../../assets/images/like_white.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.nameText}>
              {isBlur ? '-' : (first_name
                ? `${first_name}`
                : username)}
            </Text>
            <Text style={styles.locationText}>
              {Config.getAge(profile.birth_date)}
            </Text>
            <Text style={styles.percentText}>{Math.ceil(similar_rate)}%</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  }
}
const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  ILiked,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
