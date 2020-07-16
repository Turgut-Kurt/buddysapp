import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {calculate} from '../../../../../Dimensions';
class Index extends Component {
  renderItem = () => {
    const {price, packageText, packageName} = this.props;
    return (
      <TouchableOpacity style={styles.MViewStyle1} onPress={this.props.onPress}>
        <View style={styles.MViewStyle2}>
          <Text
            style={
              this.props.pressStatus === false
                ? styles.TextStyle10
                : styles.TextStyle1
            }>
            {price} TL
          </Text>
        </View>
        <View style={styles.MViewStyle3}>
          <View style={styles.MViewStyle4}>
            <Text style={styles.TextStyle2}>{packageName}</Text>
          </View>
          <View style={styles.MViewStyle5}>
            <Text style={styles.TextStyle5}>{packageText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return this.renderItem();
  }
}
const styles = StyleSheet.create({
  MViewStyle1: {
    flex: 1,
    paddingHorizontal: calculate(9),
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  MViewStyle3: {
    zIndex: 1,
    width: '100%',
    height: '90%',
    marginBottom: calculate(2),
    borderRadius: calculate(4),
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
  MViewStyle4: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  TextStyle2: {
    fontSize: calculate(4.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#111111',
  },
  MViewStyle5: {
    flex: 1.5,
    paddingHorizontal: calculate(3),
    justifyContent: 'center',
  },
  TextStyle5: {
    fontSize: calculate(2.2),
    color: '#626260',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  TextStyle1: {
    fontSize: calculate(2.4),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#0A916D',
    textAlign: 'center',
    paddingHorizontal: calculate(2),
    paddingVertical: calculate(0.7),
    borderRadius: calculate(5),
  },
  TextStyle10: {
    fontSize: calculate(2.4),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: 'black',
    textAlign: 'center',
    paddingHorizontal: calculate(2),
    paddingVertical: calculate(0.7),
    borderRadius: calculate(5),
  },
});
export default Index;
