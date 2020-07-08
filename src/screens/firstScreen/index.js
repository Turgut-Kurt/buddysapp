import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import ZeyTab from '../slider';
import styles from './style';

export default class FirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
  }
  pageChange = index => {
    this.setState({pageIndex: index});
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.backgroundView}>
        <ZeyTab
          style={{flex: 1}}
          scrollEnabled={false}
          ref={node => (this._zeyTab = node)}
          getIndex={this.pageChange}>
          <View style={styles.tabPage}>
            <View style={{flex: 1, width: '100%'}}>
              <ImageBackground
                resizeMethod="scale"
                resizeMode="contain"
                style={styles.splash1Image}
                source={require('../../assets/images/Component1.png')}>
                <Image
                  source={require('../../assets/images/undraw_eating_together_tjhx.png')}
                />
              </ImageBackground>
            </View>

            <View style={{flex: 1, width: '100%'}}>
              <Text style={styles.titleText}>Artık Zaman Kaybı Yok</Text>
              <Text style={styles.descriptionText}>
                Soruların cevapları ile mükemmel partnerini yakala.
              </Text>
            </View>
          </View>
          <View style={styles.tabPage}>
            <View style={{flex: 1, width: '100%'}}>
              <ImageBackground
                resizeMethod="scale"
                resizeMode="contain"
                style={styles.splash1Image}
                source={require('../../assets/images/Component2.png')}
              />
            </View>

            <View style={{flex: 1, width: '100%'}}>
              <Text style={styles.titleText}>İstediğin Filtreler </Text>
              <Text style={styles.descriptionText}>
                Filtreleme özelliği ile kimleri görebileceğine sen karar ver.
              </Text>
            </View>
          </View>
          <View style={styles.tabPage}>
            <View style={{flex: 1, width: '100%'}}>
              <ImageBackground
                resizeMethod="scale"
                resizeMode="contain"
                style={styles.splash1Image}
                source={require('../../assets/images/Component3.png')}
              />
            </View>

            <View style={{flex: 1, width: '100%'}}>
              <Text style={styles.titleText}>Ve Mutlu Sonlar </Text>
              <Text style={styles.descriptionText}>
                Uygulamamızın Başarı oranı %80'dir.
              </Text>
            </View>
          </View>
        </ZeyTab>

        <View style={{width: '100%', height: '15%', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#7151C3',
              width: '100%',
              height: 50,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Auth')}>
              <Text style={{color: 'white'}}>Geç</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={
                  this.state.pageIndex == 0 ? styles.circleWhite : styles.circle
                }
              />
              <View
                style={
                  this.state.pageIndex == 1 ? styles.circleWhite : styles.circle
                }
              />
              <View
                style={
                  this.state.pageIndex == 2 ? styles.circleWhite : styles.circle
                }
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (this.state.pageIndex === 2) {
                  navigate('Auth');
                } else {
                  this._zeyTab.next();
                }
              }}>
              <Text style={{color: 'white'}}>İleri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
