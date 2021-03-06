import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Image, View} from 'react-native';
import User1 from '../../../../../assets/tab1user1.png';
import User2 from '../../../../../assets/tab1user2.png';
import User3 from '../../../../../assets/tab1user3.png';
class Index extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.45, 1]}
        colors={['#FF62A5', '#FF62A5', 'rgba(246, 29, 69, 0.29)']}
        style={styles.GradientStyle1}>
        <Image source={User1} style={styles.imageStyle1} />
        <Image source={User2} style={styles.imageStyle2} />
        <Image source={User3} style={styles.imageStyle3} />
      </LinearGradient>
    );
  }
}

export default Index;
