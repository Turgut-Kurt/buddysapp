import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
class Index extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.Container}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.6, 0.9]}
          colors={['#FF62A5', '#FF8960', '#FF8960']}
          style={styles.GradientStyle1}>
          <Text style={styles.TextStyle}>Hemen Satin Al</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 78,
    marginVertical: 6,
    borderRadius: 10,
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
    fontSize: 15,
    textAlign: 'center',
  },
});
export default Index;
