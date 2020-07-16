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
import {calcHeight, calculate, calcWidth} from '../../Dimensions';
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
import Telefon from '../component/Modal/Telefon';
import Telefon2 from '../component/Modal/Telefon2';
import Magazin1 from '../component/Modal/Magazin1';
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
      showPhone: false,
      showInsta: false,
      showMagazin: false,
      is_pre: true,
      is_phone: false,
      is_insta: false,
      isvisiblePhone: false,
      isvisibleInsta: false,
    };
  }
  showPhone = () => {
    if (!this.state.is_phone) {
      this.setState({showPhone: true});
    } else {
      this.setState({isvisiblePhone: !this.state.isvisiblePhone});
    }
  };

  hidePhone = () => {
    this.setState({showPhone: false});
  };

  showInsta = () => {
    if (!this.state.is_insta) {
      this.setState({showInsta: true});
    } else {
      this.setState({isvisibleInsta: !this.state.isvisibleInsta});
    }
  };

  hideInsta = () => {
    this.setState({showInsta: false});
  };
  showMagazin1 = () => {
    this.setState({showMagazin: true});
  };
  hideMagazin1 = () => {
    this.setState({showMagazin: false});
  };
  componentDidMount = async () => {
    const detail = this.props.navigation.getParam('items');
    console.log('*****************');
    console.log(detail);
    console.log('*****************');
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
      await this.setState({
        like: detail.is_liked ? true : false,
        is_insta: detail.is_insta,
        is_pre: detail.is_pre,
        is_phone: detail.is_phone,
      });
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
        sliderBoxHeight="100%"
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
      console.log('***********************');
      console.log(this.state.is_phone);
      console.log(this.state.is_phone);
      console.log(this.state.is_phone);
      console.log('***********************');
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
        <View style={styles1.GlobalCont}>
          <Magazin1
            show={this.state.showMagazin}
            handleClose={this.hideMagazin1}
          />
          <Telefon show={this.state.showPhone} handleClose={this.hidePhone} />
          <Telefon2 show={this.state.showInsta} handleClose={this.hideInsta} />
          <View style={styles1.HeaderContainer}>
            <View style={styles1.HeaderViewStyle1}>
              <TouchableOpacity
                style={styles1.HeaderButtonStyle}
                onPress={this.handleBackButton}>
                <Image source={leftback} style={styles1.backButtonStyle} />
              </TouchableOpacity>
            </View>
            <View style={styles1.HeaderViewStyle2}>
              <Text style={styles1.HeaderTitleStyle}>{detail.first_name}</Text>
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

          <View style={styles1.Container}>
            <View style={styles1.Top}>{this.renderImagesIc(detail)}</View>

            <View style={styles1.Center}>
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

            <View style={styles1.Content}>
              <View style={styles1.ContentViewStyle1}>
                <Text style={styles1.ContentTextStyle1}>Hakkında </Text>
                <Text style={styles1.ContentTextStyle2}>
                  {profile && profile.about_me ? profile.about_me : 'yok'}
                </Text>
              </View>
              <View style={styles1.ContentViewStyle3}>
                <View style={styles1.ContentViewStyle4}>
                  <Text style={styles1.ContentTextStyle1}>Aradığı</Text>
                  <Text style={styles1.ContentTextStyle2}>
                    {profile.what_find
                      ? this.onWhatFind(profile.what_find)
                      : '...'}
                  </Text>
                </View>
                <View style={styles1.ContentViewStyle4} />
                <View style={styles1.ContentViewStyle4}>
                  <Text style={styles1.ContentTextStyle1}>Hobi</Text>
                  <Text style={styles1.ContentTextStyle2}>
                    {profile && profile.hobbies ? profile.hobbies : 'hobiyok'}
                  </Text>
                </View>
              </View>
              <View style={styles1.ContentViewStyle2}>
                <View style={styles1.ContentViewStyle4}>
                  <Text style={styles1.ContentTextStyle1}>Telefon</Text>
                  <Text style={styles1.ContentTextStyle2}>
                    {profile && profile.phone && this.state.isvisiblePhone
                      ? profile.phone
                      : '***********'}
                  </Text>
                  <TouchableOpacity
                    onPress={
                      this.state.is_pre === false
                        ? this.showMagazin1
                        : this.showPhone
                    }
                    style={styles1.ContentButtonStyle}>
                    <Text style={styles1.ContentTextStyle3}>
                      {!this.state.isvisiblePhone ? 'Goster' : 'Gizle'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles1.ContentViewStyle4} />
                <View style={styles1.ContentViewStyle4}>
                  <Text style={styles1.ContentTextStyle1}>İnstagram</Text>
                  <Text style={styles1.ContentTextStyle2}>
                    {profile && profile.phone && this.state.isvisibleInsta
                      ? '@ovcharka'
                      : '***********'}
                  </Text>
                  <TouchableOpacity
                    onPress={
                      this.state.is_pre === false
                        ? this.showMagazin1
                        : this.showInsta
                    }
                    style={styles1.ContentButtonStyle}>
                    <Text style={styles1.ContentTextStyle3}>
                      {!this.state.isvisibleInsta ? 'Goster' : 'Gizle'}
                    </Text>
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
  GlobalCont: {flex: 1, width: '100%'},
  HeaderContainer: {
    height: calculate(12),
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
  HeaderButtonStyle: {
    paddingVertical: calculate(1),
    paddingHorizontal: calculate(2),
  },
  backButtonStyle: {width: calculate(3.5), height: calculate(4.5)},
  HeaderViewStyle2: {
    flex: 5,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  HeaderTitleStyle: {
    color: '#424649',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: calculate(5.7),
    marginLeft: calculate(2),
  },
  HeaderViewStyle11: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContentStyle2: {width: '65%'},
  linearGradient: {
    borderRadius: calculate(1.2),
    paddingVertical: calculate(1),
    flexDirection: 'row',
  },
  itemContentStyle3: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderImage: {width: calculate(3), height: calculate(3)},
  buttonText: {
    fontSize: calculate(3),
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: '#ffffff',
  },
  cityStyle: {
    fontSize: calculate(2.2),
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  Container: {
    flex: 1,
    marginBottom: calculate(13.5),
    alignItems: 'center',
  },
  Top: {flex: 1.5, width: '100%', zIndex: 0},
  Center: {
    flex: 0.5,
    width: '100%',
  },
  Content: {flex: 2, width: '100%', paddingHorizontal: calculate(6)},
  ContentViewStyle1: {
    flex: 0.5,
    justifyContent: 'center',
  },
  ContentTextStyle1: {
    fontSize: calculate(3.2),
    color: '#7755CD',
    fontFamily: 'Montserrat-SemiBold',
  },
  ContentTextStyle2: {
    fontSize: calculate(2.5),
    fontFamily: 'Montserrat-Medium',
    color: '#B8B8B8',
  },
  ContentViewStyle3: {
    flex: 0.5,
    flexDirection: 'row',
  },
  ContentViewStyle4: {
    flex: 1,
    justifyContent: 'center',
  },
  ContentViewStyle2: {
    flex: 1,
    flexDirection: 'row',
  },
  ContentButtonStyle: {
    marginTop: calculate(2),
    backgroundColor: '#7755CD',
    paddingVertical: calculate(0.3),
    borderRadius: calculate(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentTextStyle3: {
    fontSize: calculate(4),
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
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
export default connect(mapStateToProps, mapDispatchToProps)(Profilenew);
