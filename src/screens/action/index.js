import React from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid, Dimensions, ImageBackground } from 'react-native';
import styles from './style';
import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-deck-swiper';
import { axiosInstance } from '../../utils/Api';
import NoUserImage from '../../assets/images/no-user.jpg';
import NavigationService from '../../services/NavigationService';
import { connect } from 'react-redux';
import { ChangeData, GetFilters } from '../../store/Actions/Filters';
const screenWidth = Dimensions.get('window').width;

class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };

  }

  _renderItem = ({ item, index }) => {
    const profile = item.profile !== null ? item.profile : {};
    return (
      <TouchableOpacity
        style={styles.imageButton}
        activeOpacity={0}
        onPress={() => {
          NavigationService.navigate('Profile', { items: item })
          console.log(item)
          console.log('____________________')
        }}>
        <Image
          source={!profile.photo || profile.photo == undefined || profile.photo == null ? NoUserImage : { uri: profile.photo }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  onLike = async (id, state) => {
    try {
      await axiosInstance.post('action/like/', { user_id: id, state: state });
      if (state) {
        this.setState({ isSend: true })
        ToastAndroid.show(
          'Beğenildi',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
      } else {
        this.setState({ isSend: true })
        ToastAndroid.show(
          'Beğenilmedi',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        )
      }

    } catch (e) {
      this.setState({ isSend: true })
      if (state) {
        ToastAndroid.show(
          'Günlük Beğenme Sınırını Aştınız.',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        NavigationService.navigate('Shop');
      } else {
        this.setState({ isSend: true })
        ToastAndroid.show(
          'Beğenilmedi',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        )
      }
    }
  };

  action = async (type, index) => {
    await this.setState({ isSend: false })
    const { activeSlide } = this.state;
    const { slides } = this.props;
    const newArray = [...slides];
    if ((await type) === 'yes') {
      this.onLike(slides[index].id, true);
    } else if ((await type) === 'no') {
      this.onLike(slides[index].id, false)
    }
    /*if (slides.length = activeSlide + 1) {
      await newArray.splice(activeSlide, 2);
    } else {
      await newArray.splice(activeSlide, 1);
    }*/

    if (index > 7) {
      //TODO: kullanıcnın kaydettigi filter ozellikelrini al bu fonsksiyona gonder
      this.props.GetFilters('', true);
      this.props.ChangeData(this.props.FilterReducer.data);
    }
    /*else {
      this.props.ChangeData(newArray);
    }*/
  };

  renderTopView = () => (
    <View style={styles.topView}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('../../assets/images/action.png')}
        />
        <Text style={styles.titleText}>Bul Beni</Text>
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => {
          NavigationService.navigate('Filter');
        }}>
        <Image
          style={styles.filterIcon}
          source={require('../../assets/images/filter.png')}
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { activeSlide } = this.state;
    const { slides } = this.props;
    if (slides.length < 1) {
      return (
        <View style={styles.backgroundView}>
          {this.renderTopView()}
          <Text style={styles.noLikeUsers}>Kullanıcı Yok</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.backgroundView}>
          {this.renderTopView()}
          {slides && slides.length > 0 ? (
            <>
              {/*<Carousel
                style={{ backgroundColor: 'blue' }}
                ref={c => {
                  this._carousel = c;
                }}
                data={slides}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                layout={'tinder'}
                layoutCardOffset={'9'}
                onScroll={(event) => { console.log(event) }}
                onSnapToItem={index => this.setState({ activeSlide: index > slides.length - 1 ? index.length - 1 : index })}
              />*/}
              <Swiper
                cards={slides}
                marginTop={75}
                cardIndex={0}
                renderCard={(card) => {
                  return (
                    <View style={styles.cardView}>
                      <TouchableOpacity
                        style={styles.imageButton}
                        activeOpacity={0}
                        onPress={() => {
                          console.log(card)
                          console.log('card')
                          NavigationService.navigate('Profile', { items: card })

                        }}>
                        <ImageBackground
                          source={card && card.profile ? { uri: card.profile.photo } : NoUserImage}
                          style={styles.image}
                        >
                          {/*<View style={styles.navigatorView}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                              <TouchableOpacity onPress={() => this.action('no')}>
                    <Image
                      source={require('../../assets/images/notLike.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                flex: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity style={styles.percentView}>
                                <Text style={styles.percentText}>
                                  {slides.length > 0 &&
                                    `${Math.ceil(card.similar_rate)}%`}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity onPress={() => this.action('yes')}>
                    <Image
                      source={require('../../assets/images/like.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                            </View>
                          </View>
                          <View style={styles.infoView}>
                            <Text style={styles.titleText}>
                              {slides.length > 0 &&
                                `${card.first_name}`}
                            </Text>
                            <Text style={{ color: '#CDCDCF', fontSize: 18 }} />
                          </View>*/}
                          <View>
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity style={styles.percentView}>
                                <Text style={styles.percentText}>
                                  {slides.length > 0 &&
                                    `${Math.ceil(card.similar_rate)}%`}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.infoView}>
                              <Text style={styles.text}>
                                {slides.length > 0 &&
                                  `${card.first_name}`}
                              </Text>
                              <Text style={{ color: '#CDCDCF', fontSize: 18 }} />
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )
                }}
                onSwipedLeft={(index) => {
                  this.action('no', index)
                }}
                onSwipedRight={(index) => {
                  this.action('yes', index)
                }}
                backgroundColor={'#fff'}
                verticalSwipe={false}
                horizontalSwipe={this.state.isSend}
                stackSize={5}>
              </Swiper>

            </>
          ) : (
              <Text style={styles.noLikeUsers}>Kullanıcı Yok</Text>
            )
          }
        </View >
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    FiltersReducer: state.FiltersReducer,
  };
};
const mapDispatchToProps = {
  GetFilters,
  ChangeData,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Action);
