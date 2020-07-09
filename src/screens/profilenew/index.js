import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ToastAndroid,
  BackHandler,
  StyleSheet,
} from 'react-native';
import styles from './style';
import {calcHeight, calcWidth} from '../../Dimensions';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {Like} from '../../store/Actions/Like';
import LikeIcon from '../../assets/images/like.png';
import NotLikeIcon from '../../assets/images/notLike.png';
import {axiosInstance} from '../../utils/Api';
import {LikedMe} from '../../store/Actions/LikedMe';
import {ILiked} from '../../store/Actions/ILiked';
import RNRestart from 'react-native-restart';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
const NoUserPhoto = require('../../assets/images/no-user.jpg');
const RNFS = require('react-native-fs');
import ImageZoom from 'react-native-image-pan-zoom';
import user from '../../assets/images/user3.png';
import settings from '../../assets/images/settings.png';
import Tac from '../../assets/images/tac.png';
import Duzelt from '../../assets/images/duzelt.png';
import Heart from '../../assets/images/heart.png';
import Star from '../../assets/images/icons-star.png';
import Backtac from '../../assets/images/backtac.png';
import Arrow from '../../assets/images/arrow.png';
import LinearGradient from 'react-native-linear-gradient';
import Magazin2 from '../component/Modal/Magazin2';
import Magazin from '../component/Modal/Magazin';
import Vitrin from '../component/Modal/Vitrin';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: null,
      currentUser: null,
      currentUserLike: false,
      modalVisible: false,
      modalPhoto: '',
      modalPhotos: [],
      photo: '',
      showMagazin2: false,
      showMagazin: false,
      showVitrin: false,
    };
  }
  showVitrin = () => {
    this.setState({showVitrin: true});
  };

  hideVitrin = () => {
    this.setState({showVitrin: false});
  };
  showMagazin2 = () => {
    this.setState({showMagazin2: true});
  };

  hideMagazin2 = () => {
    this.setState({showMagazin2: false});
  };
  showMagazin = () => {
    this.setState({showMagazin: true});
  };

  hideMagazin = () => {
    this.setState({showMagazin: false});
  };
  componentDidMount = async () => {
    const detail = this.props.navigation.getParam('items');
    if (detail) {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          this.handleBackButton();
          return true;
        },
      );
    }
    if (detail) {
      await this.setState({like: detail.is_liked ? true : false});
      await this.likeFunc(detail.id);
    } else {
      this.getUserInfo();
    }
  };
  componentWillUnmount() {
    const detail = this.props.navigation.getParam('items');
    if (detail) {
      this.backHandler.remove();
    }
  }
  handleBackButton() {
    this.props.navigation.goBack();
    return true;
  }
  async getUserInfo() {
    const {userId} = await this.props.SignInReducer;
    if (userId) {
      try {
        const user = await axiosInstance.get(`api/users/${userId}/`);
        this.setState({
          currentUser: user.data,
          currentUserLike: userId === user.data.id,
        });
      } catch (e) {
        setTimeout(await this.getUserInfo(), 5000);
      }
    }
  }

  renderImages = (detail) => {
    let images = [];
    if (detail.profile === undefined || detail.profile === null) return;
    if (detail.profile === undefined || detail.profile === null) return;
    if (
      detail.photos !== undefined &&
      detail.photos.length > 0 &&
      detail.profile.photo
    ) {
      images = [detail.profile.photo, ...detail.photos.map((i) => i.photo)];
    } else {
      if (detail.profile.photo) {
        images = [detail.profile.photo];
      } else if (detail.photos.length > 0) {
        images = [...detail.photos.map((i) => i.photo)];
      } else {
        images = [NoUserPhoto];
      }
    }
    return (
      <SliderBox
        images={images}
        sliderBoxHeight="100%"
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        onCurrentImagePressed={(index) =>
          this.setState({modalVisible: true, modalPhoto: images[index]})
        }
        currentImageEmitter={(index) =>
          this.setState({modalPhoto: images[index]})
        }
      />
    );
  };
  async sendChat(detail) {
    const {userId} = await this.props.SignInReducer;
    const user = await axiosInstance.get(`api/users/${userId}/`);
    console.log(detail);
    console.log(user);
    this.props.navigation.navigate('Chat', {
      User: {
        username: detail.username,
        otherId: detail.id,
      },
    });
  }
  renderImagesIc = (detail) => {
    let images = [];
    if (detail.profile === undefined || detail.profile === null) return;
    if (detail.profile === undefined || detail.profile === null) return;
    if (
      detail.photos !== undefined &&
      detail.photos.length > 0 &&
      detail.profile.photo
    ) {
      images = [detail.profile.photo, ...detail.photos.map((i) => i.photo)];
    } else {
      if (detail.profile.photo) {
        images = [detail.profile.photo];
      } else if (detail.photos.length > 0) {
        images = [...detail.photos.map((i) => i.photo)];
      } else {
        images = [NoUserPhoto];
      }
    }
    return (
      <SliderBox
        images={images}
        sliderBoxHeight="90%"
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        currentImageEmitter={(index) =>
          this.setState({modalPhoto: images[index]})
        }
      />
    );
  };

  onWhatFind = (type) => {
    switch (type) {
      case 'WM':
        return 'Bayan';
      case 'MAN':
        return 'Bay';
      case 'NL':
        return 'Belirtmek İstemiyorum';
      case 'FR':
        return 'Arkadaş';
      case 'RL':
        return 'İlişki';
      case 'SP':
        return 'Hızlı';
      default:
        return type;
    }
  };

  onZodiac = (type) => {
    switch (type) {
      case 'KC':
        return 'Koç';
      case 'BG':
        return 'Boğa';
      case 'IK':
        return 'İkizler';
      case 'YN':
        return 'Yengeç';
      case 'AS':
        return 'Aslan';
      case 'BŞ':
        return 'Başak';
      case 'TR':
        return 'Terazi';
      case 'AK':
        return 'Akrep';
      case 'YY':
        return 'Yay';
      case 'OG':
        return 'Oğlak';
      case 'KV':
        return 'Kova';
      case 'BL':
        return 'Balık';
      default:
        return type;
    }
  };

  onLike = async (detail, like) => {
    try {
      console.log(!like);
      const user = await axiosInstance.post('action/like/', {
        user_id: detail.id,
        state: !like,
      });
      this.setState({like: user.data.is_liked});
      console.log(1);
    } catch (e) {
      console.log(e);
    }
  };

  likeFunc = async (id) => {
    try {
      console.log('URL =>', id);
      const user = await axiosInstance.get(`api/users/${id}/`);
      console.log('USER =>', user);
      this.setState({like: user.data.is_liked});
      this.props.LikedMe();
      this.props.ILiked();
    } catch (e) {}
  };
  formatDate(date) {
    let year = date.split('-');
    const now = new Date().getFullYear();
    return now - year[0];
  }
  imageSelect = (type) => {
    const options = {
      title: 'Avatar Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.uri !== '' && response.uri !== null) {
          this.imageResize(response.uri, type);
        }
      }
    });
  };

  deleteImage = (modalPhoto, detail) => {
    axiosInstance.post('api/photos/pk', {
      user_id: detail.id,
      photo: modalPhoto,
    });
  };

  imageResize = (uri, type) => {
    ImageResizer.createResizedImage(uri, 1366, 768, 'JPEG', 80)
      .then((resizedImage) => {
        this.setState({
          [type]: resizedImage.uri,
        });
        this.handleBase64(resizedImage.path, type);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleBase64 = async (path, type) => {
    try {
      const base64 = await RNFS.readFile(path, 'base64');
      this.setState({photo: base64});
    } catch (e) {
      ToastAndroid.show(
        'Resimi base64 e çevirirken bir problem oluştu.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
  nextQuestion = async (id, like) => {
    this.props.navigation.push('AnswerQuestions', {
      otherUserId: id,
      currentUser: like,
      nextQuestion: () => this.nextQuestion(id, like),
    });
  };
  renderItems = (detail) => {
    if (detail) {
      const {navigate} = this.props.navigation;
      const {token} = this.props.SignInReducer;
      const {
        like,
        currentUserLike,
        currentUser,
        modalVisible,
        modalPhoto,
      } = this.state;
      let profile = detail.profile !== null ? detail.profile : {};
      return (
        <View style={{flex: 1, width: '100%'}}>
          <Magazin
            show={this.state.showMagazin}
            handleClose={this.hideMagazin}
          />
          <Vitrin show={this.state.showVitrin} handleClose={this.hideVitrin} />
          <Magazin2
            show={this.state.showMagazin2}
            handleClose={this.hideMagazin2}
          />
          <View style={styles1.HeaderContainer}>
            <View style={styles1.HeaderViewStyle1} />
            <View style={styles1.HeaderViewStyle2}>
              <Image source={user} />
              <Text style={styles1.HeaderTitleStyle}>Profil</Text>
            </View>
            <View style={styles1.HeaderViewStyle1}>
              <TouchableOpacity
                style={styles1.HeaderButtonStyle}
                onPress={() => {
                  navigate('Settings');
                }}>
                <Image source={settings} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles2.Container}>
            <View style={styles2.ProfileView}>
              <View style={styles2.ProfileViewStyle1}>
                <View style={styles2.ProfileViewStyle3}>
                  <View style={styles2.ProfileViewStyle6}>
                    <View style={styles2.ProfileViewStyle7}>
                      <Image
                        source={
                          profile && profile.photo
                            ? {uri: profile.photo}
                            : NoUserPhoto
                        }
                        style={styles2.profileImageStyle}
                      />
                    </View>
                    <View style={styles2.ProfileViewStyle8}>
                      <LinearGradient
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 1.0, y: 1.0}}
                        locations={[0.1, 0.5, 0.9]}
                        colors={['#FF8960', '#FF8960', '#FF62A5']}
                        style={styles2.GradientStyle2}>
                        <Image
                          source={Tac}
                          style={styles2.profileImageStyle2}
                        />
                      </LinearGradient>
                    </View>
                  </View>
                </View>
                <View style={styles2.ProfileViewStyle4}>
                  <View style={styles2.ProfileViewStyle9}>
                    <Text style={styles2.ProfileTextStyle1}>
                      {detail.first_name}
                    </Text>
                    <Text style={styles2.ProfileTextStyle2}>
                      {profile && profile.city ? profile.city : 'sehiryok'}
                    </Text>
                  </View>
                </View>
                <View style={styles2.ProfileViewStyle5}>
                  <TouchableOpacity
                    style={styles2.ProfileTouchStyle}
                    onPress={() => navigate('InfoChange')}>
                    <Image source={Duzelt} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles2.ProfileViewStyle2}>
                <View style={styles2.ProfileViewStyle10}>
                  <Text style={styles2.ProfileTextStyle3}>BEGENME</Text>
                  <Text style={styles2.ProfileTextStyle4}>2318</Text>
                </View>
                <View style={styles2.ProfileViewStyle10}>
                  <Text style={styles2.ProfileTextStyle3}>MESAJ</Text>
                  <Text style={styles2.ProfileTextStyle4}>364</Text>
                </View>
                <View style={styles2.ProfileViewStyle10}>
                  <Text style={styles2.ProfileTextStyle3}>ESLESME</Text>
                  <Text style={styles2.ProfileTextStyle4}>15</Text>
                </View>
              </View>
            </View>

            <View style={styles2.Top}>
              <LinearGradient
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}
                locations={[0.1, 0.4, 0.9]}
                colors={['#FF62A5', '#FA4076', '#F61F48']}
                style={styles2.GradientStyle1}
              />
            </View>

            <View style={styles2.Content}>
              <View style={styles2.ContentViewStyle1} />
              <View style={styles2.ContentViewStyle1}>
                <Text style={styles2.ContentTextStyle1}>Hakkında </Text>
                <Text style={styles2.ContentTextStyle2}>
                  {profile && profile.about_me ? profile.about_me : 'yok'}
                </Text>
              </View>
              <View style={styles2.ContentViewStyle2}>
                <View style={styles2.ContentViewStyle3}>
                  <View style={styles2.ContentViewStyle4}>
                    <Text style={styles2.ContentTextStyle1}>Aradığı</Text>
                    <Text style={styles2.ContentTextStyle2}>
                      {profile.what_find
                        ? this.onWhatFind(profile.what_find)
                        : '...'}
                    </Text>
                  </View>
                  <View style={styles2.ContentViewStyle4} />
                  <View style={styles2.ContentViewStyle4}>
                    <Text style={styles2.ContentTextStyle1}>Hobi</Text>
                    <Text style={styles2.ContentTextStyle2}>
                      {profile && profile.hobbies ? profile.hobbies : 'hobiyok'}
                    </Text>
                  </View>
                </View>
                <View style={styles2.ContentViewStyle3}>
                  <View style={styles2.ContentViewStyle4}>
                    <Text style={styles2.ContentTextStyle1}>Telefon</Text>
                    <Text style={styles2.ContentTextStyle2}>
                      {profile && profile.phone ? profile.phone : 'telyok'}
                    </Text>
                  </View>
                  <View style={styles2.ContentViewStyle4} />
                  <View style={styles2.ContentViewStyle4}>
                    <Text style={styles2.ContentTextStyle1}>İnstagram</Text>
                    <Text style={styles2.ContentTextStyle2}>@*******</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles2.Bottom}>
              <View style={styles2.BottomViewStyle1}>
                <TouchableOpacity
                  style={styles2.BottomViewStyle2}
                  onPress={this.showMagazin2}>
                  <View style={styles2.BottomViewStyle3}>
                    <Image source={Star} style={styles2.BottomImageStyle1} />
                  </View>
                  <View style={styles2.BottomViewStyle4}>
                    <Text style={styles2.BottomTextStyle1}>
                      Hepsi Burada Paketi
                    </Text>
                  </View>
                  <View style={styles2.BottomViewStyle5}>
                    <Image source={Arrow} style={styles2.BottomImageStyle2} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles2.BottomViewStyle2} onPress={this.showVitrin}>
                  <View style={styles2.BottomViewStyle3}>
                    <Image source={Heart} style={styles2.BottomImageStyle1} />
                  </View>
                  <View style={styles2.BottomViewStyle4}>
                    <Text style={styles2.BottomTextStyle1}>
                      Vitrin Paketleri
                    </Text>
                  </View>
                  <View style={styles2.BottomViewStyle5}>
                    <Image source={Arrow} style={styles2.BottomImageStyle2} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles2.BottomViewStyle2}
                  onPress={this.showMagazin}>
                  <View style={styles2.BottomViewStyle3}>
                    <Image source={Backtac} style={styles2.BottomImageStyle1} />
                  </View>
                  <View style={styles2.BottomViewStyle4}>
                    <Text style={styles2.BottomTextStyle1}>
                      Premium Paketler
                    </Text>
                  </View>
                  <View style={styles2.BottomViewStyle5}>
                    <Image source={Arrow} style={styles2.BottomImageStyle2} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  };

  render() {
    let detail = this.props.navigation.getParam('items');
    const {currentUser} = this.state;
    return this.renderItems(detail !== undefined ? detail : currentUser);
  }
}
const styles1 = StyleSheet.create({
  HeaderContainer: {
    height: 70,
    backgroundColor: '#F3F3FB',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  HeaderViewStyle1: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  HeaderButtonStyle: {paddingVertical: 5, paddingHorizontal: 10},
  HeaderViewStyle2: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  HeaderTitleStyle: {
    color: '#424649',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    marginHorizontal: 10,
  },
});
const styles2 = StyleSheet.create({
  Container: {
    flex: 1,
    marginBottom: 80,
    alignItems: 'center',
  },
  ProfileView: {
    position: 'absolute',
    width: calcWidth(92),
    height: calcHeight(25),
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 10,
  },
  ProfileViewStyle1: {
    flex: 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ProfileViewStyle3: {
    flex: 6,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ProfileViewStyle4: {
    flex: 9,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ProfileViewStyle9: {
    height: '91%',
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  ProfileTextStyle1: {
    color: '#4A4A4A',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
  },
  ProfileTextStyle2: {color: '#C1C0C9', fontSize: 15, marginLeft: 20},
  ProfileViewStyle5: {
    flex: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileTouchStyle: {padding: 10},
  ProfileViewStyle6: {
    height: '91%',
    width: '100%',
    overflow: 'hidden',
  },
  ProfileViewStyle7: {
    top: 10,
    left: 5,
    position: 'absolute',
    height: calcWidth(26),
    width: calcWidth(26),
    borderRadius: calcWidth(26),
    overflow: 'hidden',
  },
  profileImageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: calcWidth(25),
  },
  profileImageStyle2: {
    width: calcWidth(4),
    height: calcWidth(4),
    resizeMode: 'contain',
  },
  ProfileViewStyle8: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    height: calcWidth(8),
    width: calcWidth(8),
    borderRadius: calcWidth(8),
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
  },
  GradientStyle2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageStyle1: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: calcWidth(25),
  },
  ProfileViewStyle2: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ProfileViewStyle10: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileTextStyle3: {fontSize: 13, color: '#C2C4CA'},
  ProfileTextStyle4: {fontSize: 21, color: '#262628'},
  Top: {flex: 1, width: '100%', zIndex: 0},
  GradientStyle1: {
    flex: 1,
    width: '100%',
  },
  Content: {flex: 2, width: '100%'},
  ContentViewStyle1: {
    flex: 0.5,
    paddingHorizontal: 35,
  },
  ContentViewStyle2: {
    flex: 1,
    paddingHorizontal: 35,
  },
  ContentViewStyle3: {
    flex: 1,
    flexDirection: 'row',
  },
  ContentViewStyle4: {
    flex: 1,
  },
  ContentTextStyle1: {fontSize: 19, color: '#7755CD', fontWeight: 'bold'},
  ContentTextStyle2: {fontSize: 15, color: '#B8B8B8'},
  Bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomViewStyle1: {
    height: '90%',
    width: '94%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 10,
  },
  BottomViewStyle2: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#D8D8D8',
  },
  BottomViewStyle3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomViewStyle4: {
    flex: 3,
    justifyContent: 'center',
  },
  BottomViewStyle5: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomImageStyle1: {
    width: calcWidth(9),
    height: calcWidth(9),
    resizeMode: 'contain',
  },
  BottomTextStyle1: {fontSize: 20, color: '#262628'},
  BottomImageStyle2: {
    width: calcWidth(5),
    height: calcWidth(5),
    resizeMode: 'contain',
  },
});
const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
    LikeReducer: state.LikeReducer,
  };
};

const mapDispatchToProps = {
  Like,
  LikedMe,
  ILiked,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
