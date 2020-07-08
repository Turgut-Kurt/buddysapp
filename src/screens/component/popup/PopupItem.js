import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class PopupItem extends React.Component {
  selected = () => {
    let item = {value: this.props.label, id: this.props.id};
    this.props.selected(item);
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            this.selected();
          }}>
          <Text style={{fontSize: 18}}>{this.props.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
