import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Image, Text, View} from 'react-native';
import Heart from '../../../../../assets/images/heart.png';
import Star from '../../../../../assets/images/icons-star.png';
import Message from '../../../../../assets/images/messageheader.png';
class Index extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.4, 0.9]}
        colors={['#FF62A5', '#FA4076', '#F61F48']}
        style={styles.GradientStyle1}>
        <View style={styles.MViewStyle6}>
          <Text style={styles.TextStyle1}>Premium Paketler</Text>
        </View>
        <View style={styles.MViewStyle7}>
          <View style={styles.MViewStyle8}>
            <Image source={Heart} style={styles.imageStyle1} />
          </View>
          <View style={styles.MViewStyle8}>
            <Image source={Star} style={styles.imageStyle1} />
          </View>
          <View style={styles.MViewStyle8}>
            <Image source={Message} style={styles.imageStyle1} />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default Index;
