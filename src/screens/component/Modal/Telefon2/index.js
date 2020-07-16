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
import insta from '../../../../assets/images/insta.png';
import NavigationService from '../../../../services/NavigationService';
class Telefon2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
    };
  }
  onPressFullPackage = () => {
    this.setState({pressStatus: !this.state.pressStatus});
  };
  goShop() {
    this.props.handleClose?.();
    NavigationService.navigate('Shop');
  }
  onPressBuyNow = () => {
    if (this.state.pressStatus === true) {
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
                    <Image source={insta} style={styles.phoneSyle} />
                  </View>
                  <View style={styles.backImageinView1inView2} />
                </View>
                <View style={styles.backImageinView2}>
                  <Text style={styles.TextStyleHeader}>Sosyal Paket</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.FreeView1} />
          </View>

          <View style={styles.MViewStyle3}>
            <Text style={styles.TextStyle2}>
              Sosyal Paket ile instagram adresini anında gör takip et ve
              iletişime geç!
            </Text>
          </View>
          <View style={styles.MViewStyle4}>
            <Telefon1Packlet
              price={'74,99'}
              packageText={'instagram adresini anında gör!'}
              packageName={'Sosyal Paket'}
              pressStatus={this.state.pressStatus}
              onPress={this.onPressFullPackage}
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
              <BuyEftButton onPress={this.onPressBuyNow} />
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
export default Telefon2;
