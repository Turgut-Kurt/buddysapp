import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {calculate} from '../../../../../Dimensions';
class Index extends Component {
  renderItem = () => {
    return (
      <View style={styles.MViewStyle1}>
        <View style={styles.TextView}>
          <Text style={styles.TextStyle6}>Firsati kacirma</Text>
        </View>
        <TouchableOpacity
          style={styles.MViewStyle3}
          onPress={this.props.onPress}>
          <View style={styles.ViewStyleG}>
            <View style={styles.MViewStyle4}>
              <Text style={styles.TextStyle2}>Hepsi Burada Paket</Text>
            </View>
            <View style={styles.MViewStyle5}>
              <Text adjustsFontSizeToFit={true} style={styles.TextStyle5}>
                Sadece
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.MViewStyle2}>
          <Text
            style={
              this.props.pressStatus === false
                ? styles.TextStyle1
                : styles.TextStyle10
            }>
            399,99 TL
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return this.renderItem();
  }
}
const styles = StyleSheet.create({
  MViewStyle1: {
    flex: 1,
    paddingHorizontal: calculate(5),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TextView: {
    flex: 11,
    width: '100%',
  },
  TextStyle6: {
    fontSize: calculate(5.5),
    color: '#F6481F',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: calculate(6),
  },

  MViewStyle3: {flex: 25, width: '100%'},
  ViewStyleG: {
    height: '85%',
    width: '100%',
    borderRadius: calculate(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: 'white',
  },
  MViewStyle4: {flex: 1, alignItems: 'center', width: '100%'},
  TextStyle2: {fontSize: calculate(3.1), textAlign: 'center', color: '#111111'},
  MViewStyle5: {flex: 1.62, alignItems: 'center', justifyContent: 'center'},
  TextStyle5: {
    fontSize: calculate(5.7),
    color: '#F61F48',
    textAlign: 'center',
    lineHeight: calculate(5.6),
  },

  MViewStyle2: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  TextStyle1: {
    fontSize: calculate(3.3),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#000000',
    textAlign: 'center',
    paddingHorizontal: calculate(1.8),
    borderRadius: 50,
  },
  TextStyle10: {
    fontSize: calculate(3.3),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#0A916D',
    textAlign: 'center',
    paddingHorizontal: calculate(1.8),
    borderRadius: 50,
  },
});
export default Index;
