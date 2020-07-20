import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../../Modal/Mcomponent/buyNowbutton';
import BuyEftButton from '../../Modal/Mcomponent/buyEftbutton';
import Veya from '../../Modal/Mcomponent/veyaText';
import PaymentText from '../../Modal/Mcomponent/paymentText';
import Telefon1Packlet from '../../Modal/Mcomponent/Telefon1Packlet';
import LinearGradient from 'react-native-linear-gradient';
import Gradback from '../../../../assets/images/gradback.png';
import Match from '../../../../assets/images/match.png';
import phone from '../../../../assets/images/phone.png';
import NavigationService from '../../../../services/NavigationService';
import * as RNIap from 'react-native-iap';
import {axiosInstance} from '../../../../utils/Api';
class Telefon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
      skuProduct: null,
      skuItems: ['superpaket1'],
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
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={this.closeModal}
        swipeDirection="left">
        <View style={styles.MViewStyle1}>
          <View style={styles.TopView}>
            <View style={styles.absView}>
              <Image source={Match} style={styles.absViewImage} />
            </View>
            <View style={styles.MViewStyle2}>
              <LinearGradient
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}
                locations={[0.1, 0.4, 0.9]}
                colors={['#FF62A5', '#FA4076', '#F61F48']}
                style={styles.GradientStyle2}
              />
              <ImageBackground style={styles.image} source={Gradback}>
                <View style={styles.backImageinView1}>
                  <View style={styles.backImageinView1inView1}>
                    <Image source={phone} style={styles.phoneSyle} />
                  </View>
                  <View style={styles.backImageinView1inView2} />
                </View>
                <View style={styles.backImageinView2}>
                  <Text style={styles.TextStyleHeader}>Super Paket</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.FreeView1} />
          </View>

          <View style={styles.MViewStyle3}>
            <Text style={styles.TextStyle2}>
              Süper paket ile bütün telefon numaralarını anında görüntüleme,
              arama ve yakından tanışma şansı yakala !
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <Telefon1Packlet
              price={'199,99'}
              packageText={'Telefon Numarasini Aninda Gor'}
              packageName={'Super Paket'}
              pressStatus={this.state.pressStatus}
              onPress={this.onPressFullPackage}
            />
          </View>
          <View style={styles.MViewStyle5}>
            <View style={styles.MViewStyle13}>
              <BuyButton onPress={this.onPressBuyNow} />
            </View>
            <View style={styles.MViewStyle14}>
              <Veya />
            </View>
            <View style={styles.MViewStyle13}>
              <BuyEftButton onPress={this.onPressBuyEft} />
            </View>
            <View style={styles.MViewStyle14}>
              <PaymentText />
            </View>
            <View style={[styles.MViewStyle13]}>
              <Text style={styles.PhoneTextStyle}>0552 350 9754</Text>
            </View>
            <View style={styles.FreeStyle} />
          </View>
        </View>
      </Modal>
    );
  }
}
export default Telefon;
