import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../Mcomponent/buyNowbutton';
import BuyEftButton from '../Mcomponent/buyEftbutton';
import Veya from '../Mcomponent/veyaText';
import PaymentText from '../Mcomponent/paymentText';
import MagazinFooter from '../Mcomponent/MagazinFooter';
import Magazin2Packet from '../Mcomponent/Magazin2Packet';
import MagazinTop from '../Mcomponent/Magazin1Top';
import hepsi from '../../../../assets/images/hepsi.png';
class Magazin2 extends Component {
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
        swipeDirection="left">
        <View style={styles.MViewStyle1}>
          <View style={styles.absView}>
            <Image source={hepsi} />
          </View>
          <View style={styles.MViewStyle2}>
            <MagazinTop />
          </View>
          <View style={styles.MViewStyle3}>
            <Text style={styles.TextStyle2}>
              5 gün boyunca vitrinde kal popüler ol!Bayanlar en fazla vitrindeki
              üyelere yazar! Daha çok mesajlaş daha fazla kişiyle tanış!
              Bayanlara zengin ve popüler olduğunu hissettir! Gönderdiğin
              mesajlar en üstte kalsın!
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <Magazin2Packet Pro price={'159.99'} mounthNumber={'6'} />
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
export default Magazin2;
