import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {calculate} from '../../../../../Dimensions';
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
    alignItems: 'center',
  },
  TextStyle1: {
    fontSize: calculate(1.54),
    color: '#262628',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});
export default Index;
