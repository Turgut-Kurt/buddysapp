import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';

export interface Props {
  title: String;
  image: ImageSource;
}
export interface State {}

class TipBox extends React.Component<Props, State> {
  render() {
    const {title, image} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {image !== null && <Image style={styles.image} source={image} />}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

TipBox.defaultProps = {
  title: 'Başlık girilmedi',
  image: null,
};

export default TipBox;
