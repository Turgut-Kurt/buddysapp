import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import MagazinFooterimage from '../../../../../assets/images/footer_image.png';
import {calculate, calcWidth} from '../../../../../Dimensions';

class Index extends Component {
  render() {
    return (
      <View style={styles.MViewStyle3}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          locations={[0.45, 0.48, 0.51]}
          colors={['#F61D45', '#F61F48', '#FA4076']}
          style={styles.GradientStyle1}
        />
        <ImageBackground style={styles.image} source={MagazinFooterimage}>
          <Text style={styles.TextStyle1}>0552 350 9754</Text>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MViewStyle3: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  GradientStyle1: {
    position: 'absolute',
    width: calcWidth(400),
    height: calcWidth(400),
    borderTopRightRadius: 1000,
    borderTopLeftRadius: 1000,
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle1: {
    fontSize: calculate(3.9),
    color: '#ffffff',
  },
});

export default Index;
