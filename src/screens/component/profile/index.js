import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import NavigationService from '../../../services/NavigationService';
import NoUserPhoto from '../../../assets/images/no-user.jpg';

export default class Profile extends Component {
  goProfile = () => {
    NavigationService.navigate('Profile', { items: this.props });
  };

  renderItemContent = () => {
    const { username, first_name, similar_rate, profile } = this.props;
    return (
      <>
        <View style={styles.infoView}>
          <ImageBackground
            style={styles.image}
            source={
              profile && profile.photo ? { uri: profile.photo } : NoUserPhoto
            }>
            <View
              style={{
                height: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ width: '100%', alignItems: 'flex-end' }}>

              </View>
            </View>
          </ImageBackground>
        </View>
        {/*<Text style={styles.percentText}>
          {similar_rate && `${Math.ceil(similar_rate)}%`}
            </Text>*/}
        <Text style={styles.nameText}>
          {first_name ? `${first_name}` : username}
        </Text>
        <Text style={styles.locationText} />
      </>
    );
  };

  renderItem = () => {
    const { profile, type, vip } = this.props;
    if (type === 'Vip') {
      return (
        <TouchableOpacity
          style={styles.backgroundView}
          onPress={this.goProfile}
          disabled={!vip}>
          {!vip ? (
            <Image
              style={styles.blurImage}
              source={
                profile && profile.photo ? { uri: profile.photo } : NoUserPhoto
              }
              blurRadius={40}
            />
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
