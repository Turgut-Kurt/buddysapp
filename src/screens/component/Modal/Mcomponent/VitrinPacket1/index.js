import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {calculate} from '../../../../../Dimensions';
class Index extends Component {
  renderItem = () => {
    const {price, numberText} = this.props;
    return (
      <View
        style={
          this.props.pressStatus === true
            ? [styles.MViewStyle1, {justifyContent: 'flex-start'}]
            : styles.MViewStyle1
        }>
        <View
          style={
            this.props.pressStatus === true
              ? [styles.MViewStyle2, {top: '61%'}]
              : styles.MViewStyle2
          }>
          <Text
            style={
              this.props.pressStatus === true
                ? [styles.TextStyle1, {backgroundColor: '#0A916D'}]
                : styles.TextStyle1
            }>
            {price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.MViewStyle3}
          onPress={this.props.onPress}>
          <Text style={styles.TextStyle2}>{numberText}</Text>
          <Text style={styles.TextStyle4}>Gosterim</Text>
          <Text style={styles.TextStyle5}>{numberText} profil gösterimi</Text>
        </TouchableOpacity>
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
    paddingHorizontal: calculate(0.67),
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
    fontSize: calculate(2.1),
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: 'black',
    textAlign: 'center',
    padding: calculate(0.5),
    borderRadius: calculate(5),
  },
  MViewStyle3: {
    zIndex: 1,
    width: '100%',
    height: '70%',
    marginBottom: calculate(1.7),
    borderRadius: calculate(3.4),
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
    fontSize: calculate(4.3),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  TextStyle4: {
    fontSize: calculate(2.6),
    color: '#F61F48',
    lineHeight: calculate(3),
  },
  MViewStyle5: {flex: 1.2},
  TextStyle5: {
    fontSize: calculate(2.3),
    color: '#626260',
    textAlign: 'center',
    marginVertical: calculate(0.5),
  },
});
export default Index;
