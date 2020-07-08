import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import ShopHeader from './components/ShopHeader';
import ShopPackage from './components/ShopPackage';
import ShopButton from './components/ShopButton';
import TipBox from './components/TipBox';
import styles from './styles';

export interface Props {
  selectUrun: Function;
  normalOdemeYap: Function;
  havaleOdemeYap: Function;
  buyGoogle: Function;
}
export interface State { }

export default class Shop extends React.Component<Props, State> {
  render() {
    const {
      packets,
      selectUrun,
      normalOdemeYap,
      havaleOdemeYap,
      buyStoreProduct,
      isSelected,
      selectedUrun
    } = this.props;
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <FlatList
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            data={packets}
            ListHeaderComponent={() => <View style={{ marginLeft: 10 }} />}
            ListFooterComponent={() => <View style={{ marginRight: 10 }} />}
            renderItem={({ item, index }) => {
              return (
                <ShopPackage
                  key={item.id.toString()}
                  {...item}
                  selectUrun={selectUrun}
                  selectedUrun={selectedUrun}
                  index={index}
                />
              );
            }}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
            <Text style={{ fontWeight: 'bold', color: "#533B8F", fontSize: 18 }}>1 Aylık Gold Özellikleri</Text>
            <Text style={{ fontSize: 14 }}>Sınırsız mesaj hakkı edinerek tanışma şansını artır!</Text>
            <Text style={{ fontSize: 14 }}>Etrafındaki yeni kişilerle herkesten önce sohbet et!</Text>
            <Text style={{ fontSize: 14 }}>Seni beğenenleri gör anında geri dönüş yap!</Text>
            <Text style={{ fontSize: 14 }}>Dilediğin kadar beğen ve aktif ol!</Text>
            <Text style={{ fontSize: 14 }}>Dilediğin kişinin instagramını gör!</Text>
          </View>
          {/*<ShopButton
            text="Paketi Al"
            icon={false}
            color="#F61D45"
            fontColor={'white'}
            onPress={() => normalOdemeYap()}
          />*/}
          <ShopButton
            text="HAVALE İLE ÖDEME"
            color="#533B8F"
            fontColor={'white'}
            icon={true}
            onPress={() => havaleOdemeYap()}
          />
          {/*<ShopButton
            text="GOOGLEPLAY İLE ÖDE"
            color="#DB4437"
            fontColor={'white'}
            icon={true}
            onPress={() => buyStoreProduct()}
          />*/}
        </View>

      </ScrollView>
    );
  }
}
