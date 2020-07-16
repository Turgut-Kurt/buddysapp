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
import Magazin2Top from '../Mcomponent/Magazin2Top';
import User from '../../../../assets/tab1user5.png';
import hepsi from '../../../../assets/images/hepsi.png';
class Magazin2 extends Component {
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
        swipeDirection="left">
        <View style={styles.Container}>
          <View style={styles.TopView}>
            <View style={styles.absView}>
              <Image source={hepsi} style={styles.absViewImage} />
            </View>
            <View style={styles.TopCenterImageView}>
              <View style={styles.ImageViewFlex1} />
              <View style={styles.ImageViewFlex2}>
                <View style={[styles.ImageViewFlex2inView]}>
                  <Image
                    source={User}
                    style={styles.ImageViewFlex2inViewImage}
                  />
                </View>
              </View>
              <View style={styles.ImageViewFlex1} />
            </View>
            <View style={styles.MViewStyle2}>
              <Magazin2Top />
            </View>
            <View style={styles.FreeView} />
          </View>

          <View style={styles.CenterTextView}>
            <Text style={styles.TextStyle2}>
              5 gün boyunca vitrinde kal popüler ol!Bayanlar en fazla vitrindeki
              üyelere yazar! Daha çok mesajlaş daha fazla kişiyle tanış!
              Bayanlara zengin ve popüler olduğunu hissettir! Gönderdiğin
              mesajlar en üstte kalsın!
            </Text>
          </View>

          <View style={styles.PacketView}>
            <Magazin2Packet />
          </View>
          <View style={styles.MViewStyle5}>
            <View style={[styles.MViewStyle13, {justifyContent: 'flex-end'}]}>
              <BuyButton />
            </View>
            <View style={styles.MViewStyle14}>
              <Veya />
            </View>
            <View style={[styles.MViewStyle13]}>
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
