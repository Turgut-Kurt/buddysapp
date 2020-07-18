import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  Modal,
  Image
} from 'react-native';
import Shop from '../../Shop';
import { axiosInstance } from '../../../utils/Api';
import styles from './styles';
import * as RNIap from 'react-native-iap';

class ShopContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      paymentModal: false,
      loading: false,
      secilenUrun: null,
      packets: null,
      note: '',
      skuProduct: null,
      skuItems: [],
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
      await this.getPackets();
      await this.getStoreProducts();
      await this.getStoreSubscription();
    }
    catch (e) {
      setTimeout(() => this.shopFunction(), 1000);
    }
  }

  getPackets = async () => {
    this.setState({ loading: true });
    if (true) {
      const getPackets = await axiosInstance.get('https://www.onappserver.com/packets/packets/');
      const packets = getPackets.data.results;
      console.log(packets)
      this.setState({
        packets,
        loading: false,
        skuItems: [
          ...packets.filter(x => x.product_id !== null).map(p => p.product_id),
        ],
      });
    } else {
      //console.log(e);
      this.setState({ loading: false });
    }
  };

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


  selectUrun = async urun => {
    await this.setState({
      skuProduct: urun.product_id,
      secilenUrun: urun,
    });
    this.onStoreBuyProduct(urun.product_id);
  };

  normalOdemeYap = () => {
    const { secilenUrun } = this.state;
    if (secilenUrun !== null) {
      console.log('normalOdemeYap =>', secilenUrun.id);
      this.normalPayment(secilenUrun.id);
    } else {
      ToastAndroid.show(
        'Lütfen Bir Paket Seçiniz.',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    }
  };

  normalPayment = async id => {
    try {
      await axiosInstance.post('/packets/my-packets/', { packet: id });
      this.setState({ modal: true });
    } catch (e) {
      console.log(e);
      ToastAndroid.show(
        'Bir hata oluştu.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  havaleOdemeYap = () => {
    const { secilenUrun } = this.state;
    this.setState({ paymentModal: true });
    //if (secilenUrun !== null) {
    //  console.log('havaleOdemeYap =>', secilenUrun);
    //} else {
    //  ToastAndroid.show(
    //    'Lütfen Bir Paket Seçiniz.',
    //    ToastAndroid.CENTER,
    //    ToastAndroid.LONG,
    //  );
    //}
  };

  paymentByWireTransfer = async () => {
    const { note } = this.state;
    try {
      await axiosInstance.post('/packets/buy-packet-form/', { note });
      ToastAndroid.show(
        'Teşekkürler, Notunuz başarıyla gönderildi. Size dönüş yapılacaktır.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      this.setState({ paymentModal: false });
    } catch (e) {
      console.log(e);
      ToastAndroid.show(
        'Bir hata oluştu.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  renderPaymentModal = () => {
    return (
      <Modal>
        <View style={styles.modal}>
          <Text style={styles.text}>Lütfen Telefon Numaranızı ve İstediğiniz Paketi Giriniz.</Text>
          <TextInput
            multiline
            style={styles.note}
            value={this.state.note}
            onChangeText={note => this.setState({ note })}
          />
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => this.paymentByWireTransfer()}>
            <Text style={styles.okButtonTitle}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    const { loading, packets, modal, paymentModal } = this.state;
    if (loading) {
      return <ActivityIndicator size={40} />;
    } else {
      return (
        <>
          <Modal visible={modal}>
            <View style={styles.modal}>
              <Text style={styles.text}>Teşekkürler.</Text>
              <Text style={styles.text}>Paketiniz bize iletilmiştir.</Text>
              <Text style={styles.text}>
                Lütfen Havale ile ödeme yaptıkdan sonra ' Havale ile Ödeme '
                butonuna basıp notunuzu bize iletiniz.
              </Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => this.setState({ modal: false })}>
                <Text style={styles.okButtonTitle}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.topView}>
            <Text style={styles.titleText}>Paketler</Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.props.navigation.goBack()
              }}>
              <Image
                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                source={require('../../../assets/images/back.png')}
              />
            </TouchableOpacity>
          </View>

          {paymentModal && this.renderPaymentModal()}

          <Shop
            packets={packets}
            selectUrun={this.selectUrun}
            selectedUrun={this.state.secilenUrun}
            normalOdemeYap={this.normalOdemeYap}
            havaleOdemeYap={this.havaleOdemeYap}
            buyStoreProduct={this.onStoreBuyProduct}
          />
        </>
      );
    }
  }
}

export default ShopContainer;
