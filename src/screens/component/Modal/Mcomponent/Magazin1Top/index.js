import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Image, ImageBackground, Text, View} from 'react-native';
import Heart from '../../../../../assets/images/heart.png';
import Star from '../../../../../assets/images/icons-star.png';
import Message from '../../../../../assets/images/messageheader.png';
import back from '../../../../../assets/images/Burst.png';
class Index extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.4, 0.9]}
        colors={['#FF62A5', '#FA4076', '#F61F48']}
        style={styles.GradientStyle1}>
        <ImageBackground source={back} style={styles.backImageStyle}>
          <View style={styles.MTextView}>
            <Text style={styles.MTextViewinText}>Premium Paketler</Text>
          </View>
          <View style={styles.MImageView}>
            <View style={styles.MImageViewinView}>
              <Image source={Heart} style={styles.MImageViewinViewinImage} />
            </View>
            <View style={styles.MImageViewinView}>
              <Image source={Star} style={styles.MImageViewinViewinImage} />
            </View>
            <View style={styles.MImageViewinView}>
              <Image source={Message} style={styles.MImageViewinViewinImage} />
            </View>
          </View>
          <View style={styles.MFreeView} />
        </ImageBackground>
      </LinearGradient>
    );
  }
}

export default Index;
