import React, {Component} from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import BuyButton from '../buyNowbutton';
import BuyEftButton from '../buyEftbutton';
import Veya from '../veyaText';
import PaymentText from '../paymentText';
import MagazinFooter from '../MagazinFooter';
import Telefon1Packlet from '../Telefon1Packlet';
import MagazinTop from '../Magazin1Top';
import LinearGradient from 'react-native-linear-gradient';
import Gradback from '../../assets/gradback.png';
import Match from '../../assets/match.png';
import insta from '../../assets/insta.png';
import MagazinFooterimage from '../../assets/footer_image.png';
class Telefon1 extends Component {
  render() {
    const {show, handleClose} = this.props;
    return (
      <Modal
        isVisible={show}
        onSwipeComplete={handleClose}
        swipeDirection="left">
        <View style={styles.MViewStyle1}>
          <View style={styles.absView}>
            <Image source={Match} />
          </View>
          <View style={styles.absView1}>
            <Image source={insta} />
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
              <Text style={styles.TextStyleHeader}>Sosyal Paket</Text>
            </ImageBackground>
          </View>
          <View style={styles.MViewStyle3}>
            <Text style={styles.TextStyle2}>
              Sosyal Paket ile instagram adresini anında gör takip et ve
              iletişime geç!
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <Telefon1Packlet
              price={'129,99'}
              packageText={'instagram adresini anında gör!'}
              packageName={'Sosyal Paket'}
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
            <View style={styles.MViewStyle13}>
              <Text
                style={{fontSize: 23, color: '#F61F48', textAlign: 'center'}}>
                0555 555 55 55 telef
              </Text>
            </View>
            <View style={{flex: 1}} />
          </View>
        </View>
      </Modal>
    );
  }
}
export default Telefon1;
