import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
class Index extends Component {
  renderItem = () => {
    const {price, numberText, Pro} = this.props;
    return (
      <View
        style={
          Pro
            ? [styles.MViewStyle1, {justifyContent: 'flex-start'}]
            : styles.MViewStyle1
        }>
        <View
          style={Pro ? [styles.MViewStyle2, {top: '53%'}] : styles.MViewStyle2}>
          <Text
            style={
              Pro
                ? [styles.TextStyle1, {backgroundColor: '#0A916D'}]
                : styles.TextStyle1
            }>
            {price}
          </Text>
        </View>
        <View style={styles.MViewStyle3}>
          <Text style={styles.TextStyle2}>{numberText}</Text>
          <Text style={styles.TextStyle4}>Gosterim</Text>
          <Text style={styles.TextStyle5}>{numberText} profil gösterimi</Text>
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
    paddingHorizontal: 4,
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
    backgroundColor: 'black',
    textAlign: 'center',
    padding: 3,
    borderRadius: 15,
  },
  MViewStyle3: {
    zIndex: 1,
    width: '100%',
    height: '60%',
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
    alignItems: 'center',
  },
  MViewStyle4: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  TextStyle2: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextStyle4: {fontSize: 17, color: '#F61F48',fontWeight:'bold'},
  MViewStyle5: {flex: 1.2},
  TextStyle5: {
    fontSize: 15,
    color: '#626260',
    textAlign: 'center',
    marginVertical: 3,
  },
});
export default Index;
