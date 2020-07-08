import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
class Index extends Component {
  render() {
    return (
      <View style={styles.ViewStyle1}>
        <View style={styles.ViewStyle2} />
        <View style={styles.ViewStyle3}>
          <Text style={styles.TextStyle1}>Veya</Text>
        </View>
        <View style={styles.ViewStyle2} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ViewStyle1: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  ViewStyle2: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.16)',
  },
  TextStyle1: {fontSize: 15, color: '#C1C0C9'},

  ViewStyle3: {width: '20%', alignItems: 'center', justifyContent: 'center'},
});
export default Index;
