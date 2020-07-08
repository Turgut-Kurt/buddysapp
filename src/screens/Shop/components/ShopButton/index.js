import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

export interface Props {
  title: String;
  icon: Booelan;
  color: String;
  onPress: Function;
  fontColor: String;
}
export interface State {}

class ShopButton extends React.Component<Props, State> {
  render() {
    const {text, icon, color, onPress, fontColor} = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.buttonContainer, {backgroundColor: color}]}>
        {icon && (
          <View style={styles.buttonContainerImageContainer}>
            <Image
              source={require('../../../../assets/shop/shopbutton.png')}
              style={styles.icon}
            />
          </View>
        )}
        <Text style={[styles.buttonContainerTitleText, {color: fontColor}]}>
          {text}
        </Text>
        {icon && (
          <View style={styles.buttonContainerImageContainer}>
            <Image
              source={require('../../../../assets/shop/shopbutton.png')}
              style={styles.icon}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

ShopButton.defaultProps = {
  text: 'Bir buton texti tanımlamalısınız',
  icon: true,
  color: 'pink',
  fontColor: 'white',
  onPress: () => {
    console.log('Fonksiyon tanımlı değil');
  },
};

export default ShopButton;
