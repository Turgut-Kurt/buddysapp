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
import * as RNIap from 'react-native-iap';
import {axiosInstance} from '../../../../utils/Api';

class Magazin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
      skuProduct: null,
      skuItems: ['hepsiburada'],
    };
  }
  componentDidMount = async () => {
    try {
      this.shopFunction();
    } catch (err) {
      ToastAndroid.show(
        'Mağazaya bağlanırken bir hata oluştu.',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    }
  };
  async shopFunction() {
    try {
      await RNIap.initConnection();
      await this.getStoreProducts();
      await this.getStoreSubscription();
    } catch (e) {
      setTimeout(() => this.shopFunction(), 1000);
    }
  }
  getStoreProducts = async () => {
    try {
      await RNIap.getProducts(this.state.skuItems);
    } catch (e) {
      console.log(e);
    }
  };
  getStoreSubscription = async () => {
    try {
      await RNIap.getSubscriptions(this.state.skuItems);
    } catch (e) {
      console.log(e);
    }
  };
  initialState = () => {
    this.setState({
      pressStatus: false,
    });
  };
  onPressFullPackage = () => {
    this.setState({
      pressStatus: !this.state.pressStatus,
      skuProduct: this.state.skuItems[0],
    });
  };
  onStoreBuyProduct = async () => {
    try {
      const purchase = await RNIap.requestPurchase(this.state.skuProduct);
      const parsePurchase = await JSON.parse(purchase.transactionReceipt);
      this.onStoreBuyProductSendBackend(
        parsePurchase.purchaseToken,
        parsePurchase.productId,
        parsePurchase.orderId,
      );
      const backResult = await RNIap.finishTransaction(purchase, true);
    } catch (error) {
      console.log(error);
      if (error.message === 'You already own this item.') {
        alert('Bu Pakete zaten sahipsiniz');
      }
    }
  };
  onStoreBuyProductSendBackend = async (purchaseToken, productId, orderId) => {
    try {
      await axiosInstance.post('https://www.onappserver.com/packets/confirm/', {
        purchaseToken,
        productId,
        orderId,
      });
      ToastAndroid.show(
        'Başarı ile satın alındı.',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    } catch (e) {
      ToastAndroid.show(
        'Bir Hata Oluştu.',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    }
  };
  closeModal = () => {
    this.initialState();
    this.props.handleClose?.();
  };
  goShop() {
    this.props.handleClose?.();
    NavigationService.navigate('Shop');
  }
  onPressBuyEft = () => {
    if (this.state.pressStatus === true) {
      this.goShop();
    } else {
      ToastAndroid.show(
        'Lütfen satın almak istediğiniz paketi seçin',
        ToastAndroid.SHORT,
      );
    }
  };
  onPressBuyNow = () => {
    if (this.state.pressStatus === true) {
      this.onStoreBuyProduct(this.state.skuProduct).then((r) => console.log(r));
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
        onSwipeComplete={this.closeModal}
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
              <BuyButton onPress={this.onPressBuyNow} />
            </View>
            <View style={styles.MViewStyle14}>
              <Veya />
            </View>
            <View style={[styles.MViewStyle13]}>
              <BuyEftButton onPress={this.onPressBuyEft} />
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
