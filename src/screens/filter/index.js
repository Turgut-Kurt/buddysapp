import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Slider,
  AsyncStorage,
  BackHandler
} from 'react-native';
import styles from './styles';
import Group from '../component/group';
import { connect } from 'react-redux';
const screenHeight = Dimensions.get('window').height;
import { GetFilters, Filters } from '../../store/Actions/Filters';
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 100,
    };
    this.handleBackButton = this.handleBackButton.bind(this)
  }
  handleBackButton() {
    this.props.navigation.goBack()
    return true;
  }
  selectedItem = (groupKey, item) => {
    this.setState({ [groupKey]: item }, () => {
      console.log('filter', this.state);
    });
  };

  saveFilters = async () => {
    this.saveDistance()
    await this.props.Filters(this.state);
    const { filters } = await this.props.FiltersReducer;
    AsyncStorage.setItem('filter', filters)
    await this.props.GetFilters(filters, false);
    this.props.navigation.goBack();
  };
  resetFilters = () => {
    this.resetDistance()
    this.props.GetFilters('', false);
    this.props.navigation.goBack();
  };
  async saveDistance() {
    AsyncStorage.setItem('distance', this.state.distance.toString())
  }
  async resetDistance() {
    AsyncStorage.setItem('distance', '100')
  }
  getDistance = async () => {
    return await AsyncStorage.getItem('distance');
  };
  async componentDidMount() {
    let distance = await this.getDistance()
    console.warn(distance)
    if (distance != null) {
      this.setState({ distance: Number.parseInt(distance) })
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButton();
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    const { goBack } = this.props.navigation;
    const {
      what_find__in,
      choise__in,
      gender_choices__in,
      weight__in,
      size__in,
      faith__in,
      zodiac__in,
      ten__in,
    } = this.props;
    return (
      <View style={styles.backgroundView}>
        <View style={styles.topView}>
          <TouchableOpacity
            style={{
              width: 40,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              goBack();
            }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/login/back.png')}
            />
          </TouchableOpacity>
          <View style={styles.filterButton}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/login/filter.png')}
            />
          </View>
          <Text style={styles.titleText}>Filtre</Text>
        </View>
        <ScrollView
          pagingEnabled={true}
          ref={node => (this._scrollView = node)}>
          <View style={styles.page}>
            <View style={{ flex: 1 }}>
              <Group
                gKey="what_find__in"
                title="Ne Arıyorsun"
                selectedStyle={styles.buttonSelected}
                data={what_find__in}
                selectedItem={this.selectedItem}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Group
                gKey="choise__in"
                title="Tercih"
                data={choise__in}
                selectedStyle={styles.buttonSelected}
                selectedItem={this.selectedItem}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Group
                gKey="gender_choices__in"
                title="Yaş Aralığı"
                data={gender_choices__in}
                selectedStyle={styles.buttonSelected}
                selectedItem={this.selectedItem}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#424649', fontSize: 20, fontWeight: 'bold' }}>
                Konum: {this.state.distance} km
              </Text>
              <Slider
                style={{ width: Dimensions.get('screen').width - 30 }}
                step={10}
                minimumValue={0}
                maximumValue={100}
                value={this.state.distance}
                onValueChange={(val) => this.setState({ distance: val })}
              />
            </View>
            {/* <View style={{flex: 1}}>
              <Group
                gKey="weight__in"
                title="Kilo"
                data={weight__in}
                selectedStyle={styles.buttonSelected}
                selectedItem={this.selectedItem}
              />
            </View> */}
            {/* <View style={{flex: 1}}>
              <Group
                gKey="size__in"
                title="Boy"
                data={size__in}
                selectedStyle={styles.buttonSelected}
                selectedItem={this.selectedItem}
              />
            </View> */}
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '94%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    width: '45%',
                    marginVertical: 10,
                    backgroundColor: '#F61D45',
                    height: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={this.saveFilters}>
                  <Text style={{ color: 'white' }}>Tamam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '45%',
                    marginVertical: 10,
                    backgroundColor: '#426ff6',
                    height: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={this.resetFilters}>
                  <Text style={{ color: 'white' }}>Sıfırla</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this._scrollView.scrollTo({ y: screenHeight * 1 });
                }}>
                <Text style={{ color: '#7755CD' }}>Daha Fazlası</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.page}>
            <View style={{flex: 1}}>
              <Group
                gKey="faith__in"
                title="İnanç"
                selectedStyle={styles.buttonSelected2}
                data={faith__in}
                selectedItem={this.selectedItem}
              />
            </View>
            <View style={{flex: 1}}>
              <Group
                gKey="zodiac__in"
                title="Burç"
                data={zodiac__in}
                selectedStyle={styles.buttonSelected2}
                selectedItem={this.selectedItem}
              />
            </View>
            <View style={{flex: 1}}>
              <Group
                gKey="ten__in"
                title="Ten Rengi"
                data={ten__in}
                selectedStyle={styles.buttonSelected2}
                selectedItem={this.selectedItem}
              />
            </View>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    FiltersReducer: state.FiltersReducer,
  };
};
const mapDispatchToProps = {
  Filters,
  GetFilters,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
