import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../Mcomponent/buyNowbutton';
import BuyEftButton from '../Mcomponent/buyEftbutton';
import Veya from '../Mcomponent/veyaText';
import PaymentText from '../Mcomponent/paymentText';

import MagazinFooter from '../Mcomponent/MagazinFooter';
import MagazinPacket from '../Mcomponent/MagazinPacket';
import MagazinTop from '../Mcomponent/Magazin1Top';
import Match from '../../../../assets/images/match.png';
class Magazin extends Component {
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
        swipeDirection="left">
        <View style={styles.MViewStyle1}>
          <View style={styles.absView}>
            <Image source={Match} />
          </View>
          <View style={styles.MViewStyle2}>
            <MagazinTop />
          </View>
          <View style={styles.MViewStyle3}>
            <Text style={styles.TextStyle2}>
              Sınırsız mesaj hakkın olsun.{'\n'}
              Çevrendeki yeni kişilerle tanış.{'\n'}
              Sınırsız beğeni hakkın olsun.{'\n'} Seni beğenenleri anında gör.
              {'\n'}
              Abonelik aylık yenilenecektir.{'\n'} Dilediğin zaman aboneliği
              iptal et.
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <MagazinPacket price={'59.99'} mounthNumber={'1'} />
            <MagazinPacket Pro price={'159.99'} mounthNumber={'6'} />
            <MagazinPacket price={'99.99'} mounthNumber={'3'} />
          </View>
          <View style={styles.MViewStyle5}>
            <View style={styles.MViewStyle13}>
              <BuyButton />
            </View>
            <View style={styles.MViewStyle14}>
              <Veya />
            </View>
            <View style={styles.MViewStyle13}>
              <BuyEftButton />
            </View>
            <View style={styles.MViewStyle14}>
              <PaymentText />
            </View>
            <View style={styles.MViewStyle13}>
              <MagazinFooter />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default Magazin;
