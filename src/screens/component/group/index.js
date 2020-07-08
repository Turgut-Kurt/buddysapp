import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: { key: 2, value: '' },
    };
  }

  onChangeItem = item => {
    this.setState({ selectedItem: item }, () => {
      this.props.selectedItem(this.props.gKey, item);
    });
  };

  render() {
    console.log(this.state.selectedItem)
    return (
      <View style={{ width: '100%', flex: 1 }}>
        <Text style={{ color: '#424649', fontSize: 20, fontWeight: 'bold' }}>
          {this.props.title}
        </Text>
        <FlatList
          style={styles.backgroundView}
          numColumns={3}
          keyExtractor={item => {
            item.name.toString();
          }}
          data={this.props.data}
          extraData={this.state.selectedItem}
          renderItem={({ item, index }) => {
            const style =
              this.state.selectedItem.value === item.value
                ? this.props.selectedStyle
                : styles.button;
            const textStyle =
              this.state.selectedItem.value === item.value
                ? styles.selectedText
                : styles.text;
            return (
              <View style={styles.item} key={item.name}>
                <TouchableOpacity
                  style={style}
                  onPress={() => {
                    this.onChangeItem(item);
                  }}>
                  <Text style={textStyle}>{item.value}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

Group.defaultProps = {
  data: [],
  title: '',
};
