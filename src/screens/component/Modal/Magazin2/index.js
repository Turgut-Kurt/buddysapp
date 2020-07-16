import React, {Component} from 'react';
import {Text, View, Image, ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../Mcomponent/buyNowbutton';
import BuyEftButton from '../Mcomponent/buyEftbutton';
import Veya from '../Mcomponent/veyaText';
import PaymentText from '../Mcomponent/paymentText';
import MagazinFooter from '../Mcomponent/MagazinFooter';
import Magazin2Packet from '../Mcomponent/Magazin2Packet';
import Magazin2Top from '../Mcomponent/Magazin2Top';
import hepsi from '../../../../assets/images/hepsi.png';
import NavigationService from '../../../../services/NavigationService';

class Magazin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
    };
  }
  onPressFullPackage = () => {
    this.setState({pressStatus: !this.state.pressStatus});
  };
  goShop() {
    this.props.handleClose?.();
    NavigationService.navigate('Shop');
  }
  onPressBuyNow = () => {
    if (this.state.pressStatus === true) {
      this.goShop();
    } else {
      ToastAndroid.show(
        'Lütfen satın almak istediğiniz paketi seçin',
        ToastAndroid.SHORT,
      );
    }
  };
  render() {
    const {show, handleClose, source} = this.props;

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
                    source={source}
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
            <Magazin2Packet
              pressStatus={this.state.pressStatus}
              onPress={this.onPressFullPackage}
            />
          </View>
          <View style={styles.MViewStyle5}>
            <View style={[styles.MViewStyle13, {justifyContent: 'flex-end'}]}>
              <BuyButton />
            </View>
            <View style={styles.MViewStyle14}>
              <Veya />
            </View>
            <View style={[styles.MViewStyle13]}>
              <BuyEftButton onPress={this.onPressBuyNow} />
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
