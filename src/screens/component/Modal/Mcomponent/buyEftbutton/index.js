import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {calculate} from '../../../../../Dimensions';
class Index extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.Container}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.6, 0.9]}
          colors={['#FF62A5', '#F61F48', '#F61F48']}
          style={styles.GradientStyle1}>
          <Text style={styles.TextStyle}>Havale/EFT ile Satin Al</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  GradientStyle1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: calculate(3.4),
    paddingVertical: calculate(1.2),
    borderRadius: calculate(10),
  },
  TextStyle: {
    color: '#ffffff',
    fontSize: calculate(2.5),
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
});
export default Index;
