import React, {Component} from 'react';
import {Text, View, Image, ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../Mcomponent/buyNowbutton';
import BuyEftButton from '../Mcomponent/buyEftbutton';
import Veya from '../Mcomponent/veyaText';
import PaymentText from '../Mcomponent/paymentText';
import MagazinFooter from '../Mcomponent/MagazinFooter';
import MagazinTop from '../Mcomponent/Magazin1Top';
import Match from '../../../../assets/images/match.png';
import MagazinPacket from '../Mcomponent/MagazinPacket';
import NavigationService from '../../../../services/NavigationService';
import * as RNIap from 'react-native-iap';
import {axiosInstance} from '../../../../utils/Api';
class Magazin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
      pressStatus1: false,
      pressStatus2: false,
      skuProduct: null,
      skuItems: ['premium1', 'premium6', 'premium3'],
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
      pressStatus1: false,
      pressStatus2: false,
    });
  };
  onPressPackage1 = () => {
    this.setState({
      pressStatus: !this.state.pressStatus,
      pressStatus1: false,
      pressStatus2: false,
      skuProduct: this.state.skuItems[0],
    });
  };
  onPressPackage2 = () => {
    this.setState({
      pressStatus: false,
      pressStatus1: !this.state.pressStatus1,
      pressStatus2: false,
      skuProduct: this.state.skuItems[1],
    });
  };
  onPressPackage3 = () => {
    this.setState({
      pressStatus: false,
      pressStatus1: false,
      pressStatus2: !this.state.pressStatus2,
      skuProduct: this.state.skuItems[2],
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
    if (
      this.state.pressStatus === true ||
      this.state.pressStatus1 === true ||
      this.state.pressStatus2 === true
    ) {
      this.goShop();
    } else {
      ToastAndroid.show(
        'Lütfen satın almak istediğiniz paketi seçin',
        ToastAndroid.SHORT,
      );
    }
  };
  onPressBuyNow = () => {
    if (
      this.state.pressStatus === true ||
      this.state.pressStatus1 === true ||
      this.state.pressStatus2 === true
    ) {
      this.onStoreBuyProduct(this.state.skuProduct).then((r) => console.log(r));
    } else {
      ToastAndroid.show(
        'Lütfen satın almak istediğiniz paketi seçin',
        ToastAndroid.SHORT,
      );
    }
  };
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={this.closeModal}
        swipeDirection="left">
        <View style={styles.Container}>
          <View style={styles.TopView}>
            <View style={styles.absView}>
              <Image source={Match} style={styles.absViewImage} />
            </View>
            <View style={styles.MViewStyle2}>
              <MagazinTop />
            </View>
            <View style={styles.FreeView} />
          </View>
          <View style={styles.CenterTextView}>
            <Text style={styles.TextStyle2}>
              Sınırsız mesaj hakkın olsun. Çevrendeki yeni kişilerle tanış.
              Sınırsız beğeni hakkın olsun. Seni beğenenleri anında gör.
              Abonelik aylık yenilenecektir. Dilediğin zaman aboneliği iptal et.
            </Text>
          </View>
          <View style={[styles.PacketView, styles.extraPacketView]}>
            <MagazinPacket
              pressStatus={this.state.pressStatus}
              onPress={this.onPressPackage1}
              price={'99.99'}
              mounthNumber={'1'}
            />
            <MagazinPacket
              pressStatus={this.state.pressStatus1}
              onPress={this.onPressPackage2}
              price={'299.99'}
              mounthNumber={'6'}
            />
            <MagazinPacket
              pressStatus={this.state.pressStatus2}
              onPress={this.onPressPackage3}
              price={'199.99'}
              mounthNumber={'3'}
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
