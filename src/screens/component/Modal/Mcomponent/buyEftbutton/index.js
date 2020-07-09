import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
class Index extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.Container} >
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
    marginHorizontal: 56,
    marginVertical: 2,
    borderRadius: 40,
    overflow: 'hidden',
  },
  GradientStyle1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    color: '#ffffff',
    fontSize: 17,
    textAlign: 'center',
  },
});
export default Index;
