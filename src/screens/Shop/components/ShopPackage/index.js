import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

class ShopPackage extends React.Component<Props, State> {
  render() {
    const { id, name, image, price, message, like, selectUrun, view_count, isSelected, selectedUrun } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          selectUrun(this.props)
        }}
        style={selectedUrun ? selectedUrun.id != id ? styles.package : styles.packageSelected : styles.package}>
        <View style={styles.packageContainer}>
          <View style={styles.productContainer}>
            <View style={styles.packageImageContainer}>
              {image !== null && (
                <Image source={{ uri: image }} style={styles.image} />
              )}
            </View>
            <View style={styles.productTitleContainer}>
              <Text
                style={[
                  styles.packageTitleText,
                  { fontWeight: 'bold', marginBottom: 6 },
                ]}>
                {name}
              </Text>
              {like != 0 ? <Text style={styles.packageTitleText}>Sınırsız Beğeni</Text> : <Text style={styles.packageTitleText}>{view_count} Profil Gösterimi</Text>}
              {message != 0 ? <Text style={styles.packageTitleText}>Sınırsız Mesaj</Text> : null}
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{price} ₺</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ShopPackage;
