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
import VitrinPacket1 from '../Mcomponent/VitrinPacket1';
class Magazin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
      pressStatus1: false,
      pressStatus2: false,
    };
  }
  onPressPackage1 = () => {
    this.setState({
      pressStatus: !this.state.pressStatus,
      pressStatus1: false,
      pressStatus2: false,
    });
  };
  onPressPackage2 = () => {
    this.setState({
      pressStatus: false,
      pressStatus1: !this.state.pressStatus1,
      pressStatus2: false,
    });
  };
  onPressPackage3 = () => {
    this.setState({
      pressStatus: false,
      pressStatus1: false,
      pressStatus2: !this.state.pressStatus2,
    });
  };
  goShop() {
    this.props.handleClose?.();
    NavigationService.navigate('Shop');
  }
  onPressBuyNow = () => {
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
