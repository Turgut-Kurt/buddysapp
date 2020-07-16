import React, {Component} from 'react';
import {Text, View, Image, ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../Mcomponent/buyNowbutton';
import BuyEftButton from '../Mcomponent/buyEftbutton';
import Veya from '../Mcomponent/veyaText';
import PaymentText from '../Mcomponent/paymentText';
import MagazinFooter from '../Mcomponent/MagazinFooter';
import VitrinPacket1 from '../Mcomponent/VitrinPacket1';
import Vitrin1Top from '../Mcomponent/Vitrin1Top';
import Oval from '../../../../assets/images/Oval.png';
import hepsi from '../../../../assets/images/hepsi.png';
import MagazinPacket from '../Mcomponent/MagazinPacket';
import VitrinPacket from '../Mcomponent/VitrinPacket';
import premium from '../../../../assets/images/premium.png';
import Magazin2Packet from '../Mcomponent/Magazin2Packet';
import NavigationService from '../../../../services/NavigationService';
class Vitrin1 extends Component {
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
    const {show, handleClose, source} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
        swipeDirection="left">
        <View style={styles.Container}>
          <View style={styles.TopView}>
            <View style={styles.absView}>
              <Image source={Oval} style={styles.absViewImage} />
              <Text style={styles.backimgTextStyle}>
                Vitrin’de Yerinizi Alin
              </Text>
              <Image source={premium} style={styles.tacImageStyle} />
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
              <Vitrin1Top />
            </View>
            <View style={styles.FreeView} />
          </View>

          <View style={styles.CenterTextView}>
            <Text style={[styles.TextStyle2, styles.ekTextStyle2]}>
              Vitrine Çık ve popülerliği yakala! Bütün ilgileri üzerine topla!
              Havalı Görün Sohbetin keyfine bak!
            </Text>
          </View>

          <View style={[styles.PacketView, styles.extraPacketView]}>
            <VitrinPacket1
              pressStatus={this.state.pressStatus}
              onPress={this.onPressPackage1}
              price={'49,99'}
              numberText={'500'}
            />
            <VitrinPacket1
              price={'69,99'}
              numberText={'1000'}
              pressStatus={this.state.pressStatus1}
              onPress={this.onPressPackage2}
            />
            <VitrinPacket1
              price={'34,99'}
              numberText={'250'}
              pressStatus={this.state.pressStatus2}
              onPress={this.onPressPackage3}
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
export default Vitrin1;
