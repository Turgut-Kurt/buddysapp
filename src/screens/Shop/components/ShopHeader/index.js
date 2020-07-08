import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';

export interface Props {
  title: String;
  icon: Booelan;
}
export interface State { }

class ShopHeader extends React.Component<Props, State> {
  render() {
    const { title, icon } = this.props;
    return (
      <View style={styles.headerSection}>
        {icon && (
          <View style={styles.headerSectionImageContainer}>
            <Image
              source={require('../../../../assets/shop/crowns.png')}
              style={styles.icon}
            />
          </View>
        )}
        <Text style={styles.headerSectionTitleText}>{title}</Text>
        {icon && (
          <View style={styles.headerSectionImageContainer}>
            <Image
              source={require('../../../../assets/shop/crowns.png')}
              style={styles.icon}
            />
          </View>
        )}
      </View>
    );
  }
}

ShopHeader.defaultProps = {
  title: 'Bir başlık tanımlamalısınız',
  icon: true,
};

export default ShopHeader;
