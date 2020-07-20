import * as RNIap from 'react-native-iap';
import {axiosInstance} from '../utils/Api';
import {ToastAndroid} from 'react-native';

export const shopFunction = async (...value) => {
  try {
    await RNIap.initConnection();
    await this.getStoreProducts(...value);
    await this.getStoreSubscription(...value);
  } catch (e) {
    // setTimeout(() => this.shopFunction(), 1000);
  }
};
export const getStoreProducts = async (...value) => {
  try {
    await RNIap.getProducts(...value);
  } catch (e) {
    console.log(e);
  }
};
export const getStoreSubscription = async (...value) => {
  try {
    await RNIap.getSubscriptions(value);
  } catch (e) {
    console.log(e);
  }
};

export const onStoreBuyProduct = async (oneItem) => {
  try {
    const purchase = await RNIap.requestPurchase(oneItem);
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
export const onStoreBuyProductSendBackend = async (
  purchaseToken,
  productId,
  orderId,
) => {
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
