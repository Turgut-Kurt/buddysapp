import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
class Index extends Component {
  renderItem = () => {
    const {price, packageText, packageName} = this.props;
    return (
      <View style={styles.MViewStyle1}>
        <View style={styles.MViewStyle2}>
          <Text style={styles.TextStyle1}>{price} TL</Text>
        </View>
        <View style={styles.MViewStyle3}>
          <View style={styles.MViewStyle4}>
            <Text style={styles.TextStyle2}>{packageName}</Text>
          </View>
          <View style={styles.MViewStyle5}>
            <Text style={styles.TextStyle5}>{packageText}</Text>
          </View>
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
    paddingHorizontal: 70,
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
  TextStyle1: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#0A916D',
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  MViewStyle3: {
    zIndex: 1,
    width: '100%',
    height: '98%',
    marginBottom: 10,
    borderRadius: 20,
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
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#111111',
  },
  TextStyle4: {fontSize: 17, color: '#F61F48'},
  MViewStyle5: {flex: 1.5, paddingHorizontal: 30},
  TextStyle5: {
    fontSize: 13,
    color: '#626260',
    textAlign: 'center',
  },
});
export default Index;
