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
const leftback = require('../../assets/images/leftback.png');
const heart = require('../../assets/images/heart.png');
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
import Voman from '../../assets/images/Gender-woman.png';
import Man from '../../assets/images/Gender-man.png';
class Profilenew extends React.Component {
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
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
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
      function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
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
            <View style={styles1.HeaderViewStyle1}>
              <TouchableOpacity
                style={styles1.HeaderButtonStyle}
                onPress={this.handleBackButton}>
                <Image source={leftback} />
              </TouchableOpacity>
            </View>
            <View style={styles1.HeaderViewStyle2}>
              <Text style={styles1.HeaderTitleStyle}>{detail.username}</Text>
            </View>
            <View style={styles1.HeaderViewStyle11}>
              <View style={styles1.itemContentStyle2}>
                {profile.gender_choices === 'WM' ? (
                  <LinearGradient
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 1.0}}
                    locations={[0.2, 0.6, 0.9]}
                    colors={['#FF62A5', '#FA4076', '#F61F48']}
                    style={styles1.linearGradient}>
                    <View style={styles1.itemContentStyle3}>
                      <Image style={styles1.genderImage} source={Voman} />
                    </View>
                    <Text style={styles1.buttonText}>
                      {getAge(profile.birth_date)}
                    </Text>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 1.0}}
                    locations={[0.2, 0.6, 0.9]}
                    colors={['#3A63FF', '#4FB2FF', '#62F9FF']}
                    style={styles1.linearGradient}>
                    <View style={styles1.itemContentStyle3}>
                      <Image style={styles1.genderImage} source={Man} />
                    </View>
                    <Text style={styles1.buttonText}>
                      {getAge(profile.birth_date)}
                    </Text>
                  </LinearGradient>
                )}
              </View>
              <Text style={styles1.cityStyle}>
                {profile && profile.city ? profile.city : 'sehiryok'}
              </Text>
            </View>
          </View>

          <View style={styles2.Container}>
            <View style={styles2.Top}>
              {this.renderImagesIc(detail)}
            </View>
            <View style={styles2.Center}>
              <View style={styles.actionBar}>
                {!currentUserLike && (
                  <>
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        console.log({detail, currentUser});
                        navigate('Questions', {detail, currentUser});
                      }}>
                      <Image
                        source={require('../../assets/images/action.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginRight: 10,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.onLike(detail, like)}>
                      <Image
                        source={like ? NotLikeIcon : LikeIcon}
                        style={{width: 30, height: 30, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </>
                )}
                {like && (
                  <TouchableOpacity
                    onPress={() => {
                      this.sendChat(detail);
                    }}>
                    <Image
                      source={require('../../assets/images/profileMessage.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    resizeMode: 'contain',
                    backgroundColor: 'red',
                    borderRadius: 18,
                    padding: 6,
                    marginLeft: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AnswerQuestions', {
                      otherUserId: detail.id,
                      currentUser: currentUserLike,
                      nextQuestion: () =>
                        this.nextQuestion(detail.id, currentUserLike),
                    })
                  }>
                  <Image
                    source={require('../../assets/images/star.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                {currentUserLike && (
                  <TouchableOpacity
                    style={{
                      width: 36,
                      height: 36,
                      resizeMode: 'contain',
                      backgroundColor: 'red',
                      borderRadius: 18,
                      padding: 8,
                      marginLeft: 10,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('SolvedQuestions', {
                        detail,
                      })
                    }>
                    <Image
                      source={require('../../assets/images/pencil.png')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                width: '90%',
                borderWidth: 0.5,
                borderColor: 'rgba(112, 112, 112, 0.18)',
              }}
            />
            <View style={styles2.Content}>
              <View style={styles2.ContentViewStyle1}>
                <Text style={styles2.ContentTextStyle1}>Hakkında </Text>
                <Text style={styles2.ContentTextStyle2}>
                  {profile && profile.about_me ? profile.about_me : 'yok'}
                </Text>
              </View>
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
              <View style={styles2.ContentViewStyle2}>
                <View style={styles2.ContentViewStyle4}>
                  <Text style={styles2.ContentTextStyle1}>Telefon</Text>
                  <Text style={styles2.ContentTextStyle2}>
                    {profile && profile.phone ? profile.phone : 'telyok'}
                  </Text>
                  <TouchableOpacity style={styles2.ContentButtonStyle}>
                    <Text style={styles2.ContentTextStyle3}>Goster</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles2.ContentViewStyle4} />
                <View style={styles2.ContentViewStyle4}>
                  <Text style={styles2.ContentTextStyle1}>İnstagram</Text>
                  <Text style={styles2.ContentTextStyle2}>@*******</Text>
                  <TouchableOpacity style={styles2.ContentButtonStyle}>
                    <Text style={styles2.ContentTextStyle3}>Goster</Text>
                  </TouchableOpacity>
                </View>
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
  itemContentStyle2: {width: '60%'},
  linearGradient: {
    borderRadius: 6,
    paddingVertical: 6,
    flexDirection: 'row',
  },
  itemContentStyle3: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderImage: {width: 17, height: 17},
  buttonText: {
    fontSize: 13,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
  },

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
  HeaderViewStyle11: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityStyle: {fontSize: 12, color: '#000000', fontWeight: 'bold'},
  HeaderButtonStyle: {paddingVertical: 5, paddingHorizontal: 10},
  HeaderViewStyle2: {
    flex: 5,
    height: '100%',
    alignItems: 'center',
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

  Top: {flex: 1.5, width: '100%', zIndex: 0, borderWidth: 1},
  Center: {
    flex: 0.5,
    width: '100%',
  },
  Content: {flex: 2, width: '100%', paddingHorizontal: 35},
  ContentViewStyle1: {
    flex: 0.5,
    justifyContent: 'center',
  },
  ContentViewStyle2: {
    flex: 1,
    flexDirection: 'row',
  },
  ContentViewStyle3: {
    flex: 0.5,
    flexDirection: 'row',
  },
  ContentViewStyle4: {
    flex: 1,
    justifyContent: 'center',
  },
  ContentTextStyle1: {fontSize: 19, color: '#7755CD', fontWeight: 'bold'},
  ContentTextStyle2: {fontSize: 15, color: '#B8B8B8'},
  ContentViewStyle5: {
    flex: 0.5,
    paddingHorizontal: 25,
  },
  ContentButtonStyle: {
    marginTop: 10,
    backgroundColor: '#7755CD',
    paddingVertical: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentTextStyle3: {fontSize: 25, color: '#ffffff'},
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
export default connect(mapStateToProps, mapDispatchToProps)(Profilenew);
