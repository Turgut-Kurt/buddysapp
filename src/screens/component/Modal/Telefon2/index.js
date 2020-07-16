import React, {Component} from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
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
class Telefon extends Component {
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
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
              Süper paket ile telefon numarasını anında görüntüle arama ve
              yakından tanışma şansı yakala !
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <Telefon1Packlet
              price={'129,99'}
              packageText={'Telefon Numarasini Aninda Gor'}
              packageName={'Super Paket'}
            />
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
            <View style={[styles.MViewStyle13]}>
              <Text style={styles.PhoneTextStyle}>0555 555 55 55</Text>
            </View>
            <View style={styles.FreeStyle} />
          </View>
        </View>
      </Modal>
    );
  }
}
export default Telefon;
