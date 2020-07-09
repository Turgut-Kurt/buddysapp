import React, {Component} from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../Mcomponent/buyNowbutton';
import BuyEftButton from '../Mcomponent/buyEftbutton';
import Veya from '../Mcomponent/veyaText';
import PaymentText from '../Mcomponent/paymentText';

import MagazinFooter from '../Mcomponent/MagazinFooter';
import VitrinPacket from '../Mcomponent/VitrinPacket';
import VitrinTop from '../Mcomponent/VitrinTop';
import Oval from '../../../../assets/images/Oval.png';
import premium from '../../../../assets/images/premium.png';
class Vitrin extends Component {
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
        swipeDirection="left">
        <View style={styles.MViewStyle1}>
          <View style={styles.absView}>
            <View style={styles.absinView}>
              <ImageBackground source={Oval} style={styles.imgBackStyle}>
                <Text style={styles.backimgTextStyle}>
                  Vitrin’de Yerinizi Alin
                </Text>
              </ImageBackground>
              <Image source={premium} style={styles.tacImageStyle} />
            </View>
          </View>
          <View style={styles.MViewStyle2}>
            <VitrinTop />
          </View>
          <View style={styles.MViewStyle3}>
            <Text style={styles.TextStyle2}>
              Vitrine Çık ve popülerliği yakala!{'\n'}
              Bütün ilgileri üzerine topla!{'\n'}
              Havalı Görün Sohbetin keyfine bak!
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <VitrinPacket price={'59.99'} numberText={'500'} />
            <VitrinPacket Pro price={'159.99'} numberText={'1000'} />
            <VitrinPacket price={'99.99'} numberText={'250'} />
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
export default Vitrin;
