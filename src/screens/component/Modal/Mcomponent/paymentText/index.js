import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
class Index extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.TextStyle1}>
          Odeme Islemleriniz icin 7/24 Whatsaptan ilesime gecebilirsiniz
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle1: {fontSize: 10, color: '#262628', textAlign: 'center'},
});
export default Index;
