import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Image, ImageBackground, View} from 'react-native';
import User1 from '../../../../../assets/tab1user1.png';
import User2 from '../../../../../assets/tab1user2.png';
import User3 from '../../../../../assets/tab1user3.png';
import back from '../../../../../assets/images/Burst.png';
import {calculate} from '../../../../../Dimensions';
class Index extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.45, 1]}
        colors={['#FF62A5', '#FF62A5', 'rgba(246, 29, 69, 0.29)']}
        style={styles.GradientStyle1}>
        <ImageBackground source={back} style={styles.backImageStyle}>
          <View style={styles.FreeLeftView} />
          <View style={styles.LeftImageView}>
            <View style={styles.ViewStyle3}>
              <Image source={User1} style={styles.imageStyle1} />
            </View>
          </View>
          <View style={styles.FreeRightView} />
          <View style={styles.RightImageView}>
            <View style={styles.ViewStyle3}>
              <Image source={User2} style={styles.imageStyle1} />
            </View>
          </View>
          {/*<View style={styles.ViewStyle1}>*/}
          {/*  <View style={styles.ViewStyle3}>*/}
          {/*    <Image source={User1} style={styles.imageStyle1} />*/}
          {/*  </View>*/}
          {/*</View>*/}
          {/*<View style={styles.ViewStyle2}>*/}
          {/*  <View style={styles.ViewStyle4} />*/}
          {/*  <View style={styles.ViewStyle5}>*/}
          {/*    <View style={[styles.ViewStyle3]}>*/}
          {/*      <Image source={User3} style={styles.imageStyle1} />*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*  <View style={styles.ViewStyle4} />*/}
          {/*</View>*/}
          {/*<View style={styles.ViewStyle1}>*/}
          {/*  <View style={styles.ViewStyle3}>*/}
          {/*    <Image source={User2} style={styles.imageStyle1} />*/}
          {/*  </View>*/}
          {/*</View>*/}
        </ImageBackground>
      </LinearGradient>
    );
  }
}

export default Index;
