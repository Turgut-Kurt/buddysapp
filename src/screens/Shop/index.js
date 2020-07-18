import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
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
export interface State {}

export default class Shop extends React.Component<Props, State> {
  render() {
    const {
      packets,
      selectUrun,
      normalOdemeYap,
      havaleOdemeYap,
      buyStoreProduct,
      isSelected,
      selectedUrun,
    } = this.props;
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FlatList
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={packets}
            ListHeaderComponent={() => <View style={{marginLeft: 10}} />}
            ListFooterComponent={() => <View style={{marginRight: 10}} />}
            renderItem={({item, index}) => {
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
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
              marginHorizontal: 30,
            }}>
            <Text style={{fontSize: 14}}>
              Havale formu gönderdikten sonra sizi arayacağız. Ödemeleriniz
              memnun kalmadığınız durumlarda iade için değerlendirilecektir.
            </Text>
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
