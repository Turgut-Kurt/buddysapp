import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import {calculate, calcWidth} from '../../Dimensions';
import {connect} from 'react-redux';
import {Like} from '../../store/Actions/Like';
import {axiosInstance} from '../../utils/Api';
import {LikedMe} from '../../store/Actions/LikedMe';
import {ILiked} from '../../store/Actions/ILiked';
const NoUserPhoto = require('../../assets/images/no-user.jpg');
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
import Magazin1 from '../component/Modal/Magazin1';
import Vitrin1 from '../component/Modal/Vitrin1';
class Profile extends React.Component {
  _toastWithDurationHandler = () => {
    ToastAndroid.show('Bu paket satın alınmış', ToastAndroid.SHORT);
  };
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
      is_vip: false,
      is_showcase: false,
      is_pre: false,
    };
  }
  showVitrin = () => {
    if (!this.state.is_showcase) {
      this.setState({showVitrin: true});
    } else {
      ToastAndroid.show('Vitrin paketi satın alınmış', ToastAndroid.SHORT);
    }
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
    if (!this.state.is_pre) {
      this.setState({showMagazin: true});
    } else {
      ToastAndroid.show('Vitrin paketi satın alınmış', ToastAndroid.SHORT);
    }
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
        console.log('*********************');
        console.log(user);
        console.log('*********************');
        this.setState({
          currentUser: user.data,
          currentUserLike: userId === user.data.id,
          is_vip: user.data.is_vip,
          is_showcase: user.data.is_showcase,
          is_pre: user.data.is_pre,
        });
      } catch (e) {
        setTimeout(await this.getUserInfo(), 5000);
      }
    }
  }
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

  renderItems = (detail) => {
    if (detail) {
      const {navigate} = this.props.navigation;
      const {token} = this.props.SignInReducer;
      const {like, currentUserLike, currentUser, modalVisible} = this.state;
      let profile = detail.profile !== null ? detail.profile : {};
      console.log('*********************');
      console.log(this.state.is_vip);
      console.log(this.state.is_showcase);
      console.log(this.state.is_pre);
      console.log('*********************');
      return (
        <View style={{flex: 1, width: '100%'}}>
          <Magazin1
            show={this.state.showMagazin}
            handleClose={this.hideMagazin}
          />
          <Vitrin1
            source={{uri: profile.photo}}
            show={this.state.showVitrin}
            handleClose={this.hideVitrin}
          />
          <Magazin2
            show={this.state.showMagazin2}
            handleClose={this.hideMagazin2}
            source={{uri: profile.photo}}
          />
          <View style={styles1.HeaderContainer}>
            <View style={styles1.HeaderViewStyle1} />
            <View style={styles1.HeaderViewStyle2}>
              <Image source={user} style={styles1.profileImageStyle} />
              <Text style={styles1.HeaderTitleStyle}>Profil</Text>
            </View>
            <View style={styles1.HeaderViewStyle1}>
              <TouchableOpacity
                style={styles1.HeaderButtonStyle}
                onPress={() => {
                  navigate('Settings');
                }}>
                <Image source={settings} style={styles1.settingsImageStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles1.Content1}>
            <View style={styles1.ProfileContainer}>
              <View style={styles1.ProfileConTop}>
                <View style={styles1.ProfileConTopLeft}>
                  <View style={[styles1.ProfileImageView]}>
                    <Image
                      source={
                        profile && profile.photo
                          ? {uri: profile.photo}
                          : NoUserPhoto
                      }
                      style={styles1.profileImageStyle1}
                    />
                    <View style={styles1.ProfileImageView1}>
                      <LinearGradient
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 1.0, y: 1.0}}
                        locations={[0.1, 0.5, 0.9]}
                        colors={['#FF8960', '#FF8960', '#FF62A5']}
                        style={styles1.GradientStyle2}>
                        <Image
                          source={Tac}
                          style={styles1.profileImageStyle2}
                        />
                      </LinearGradient>
                    </View>
                  </View>
                </View>

                <View style={styles1.ProfileConTopCenter}>
                  <Text style={styles1.ProfileNameText}>
                    {detail.first_name}
                  </Text>
                  <Text style={styles1.ProfileCityText}>
                    {profile && profile.city ? profile.city : 'sehiryok'}
                  </Text>
                </View>
                <View style={styles1.ProfileConTopRight}>
                  <TouchableOpacity
                    style={styles1.ProfileConTouchable}
                    onPress={() => navigate('InfoChange')}>
                    <Image
                      style={styles1.ProfileConTouchableImage}
                      source={Duzelt}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 0.2}} />
              <View style={styles1.ProfileConBottom}>
                <View style={styles1.ProfileConBottomFlex}>
                  <Text style={styles1.ProfileConBottomFlexText1}>BEGENME</Text>
                  <Text style={styles1.ProfileConBottomFlexText2}>2318</Text>
                </View>
                <View style={styles1.ProfileConBottomFlex}>
                  <Text style={styles1.ProfileConBottomFlexText1}>MESAJ</Text>
                  <Text style={styles1.ProfileConBottomFlexText2}>364</Text>
                </View>
                <View style={styles1.ProfileConBottomFlex}>
                  <Text style={styles1.ProfileConBottomFlexText1}>ESLESME</Text>
                  <Text style={styles1.ProfileConBottomFlexText2}>15</Text>
                </View>
              </View>
            </View>

            <View style={styles1.Content2}>
              <LinearGradient
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}
                locations={[0.1, 0.4, 0.9]}
                colors={['#FF62A5', '#FA4076', '#F61F48']}
                style={styles1.GradientStyle1}
              />
            </View>
            <View style={styles1.FreeContent} />
          </View>
          <View style={styles1.Content3}>
            <View style={styles1.Content3inView1}>
              <Text style={styles1.Content3inView1Text1}>Hakkında </Text>
              <Text style={styles1.Content3inView1Text2}>
                {profile && profile.about_me ? profile.about_me : 'yok'}
              </Text>
            </View>
            <View style={styles1.Content3inView2}>
              <View style={styles1.Content3inView2inView1}>
                <View style={styles1.Content3inView2inView1inView}>
                  <Text style={styles1.Content3inView1Text1}>Aradığı</Text>
                  <Text style={styles1.Content3inView1Text2}>
                    {profile.what_find
                      ? this.onWhatFind(profile.what_find)
                      : '...'}
                  </Text>
                </View>
                <View style={styles1.Content3inView2inView1inView} />
                <View style={styles1.Content3inView2inView1inView}>
                  <Text style={styles1.Content3inView1Text1}>Hobi</Text>
                  <Text style={styles1.Content3inView1Text2}>
                    {profile && profile.hobbies ? profile.hobbies : 'hobiyok'}
                  </Text>
                </View>
              </View>

              <View style={styles1.Content3inView2inView1}>
                <View style={styles1.Content3inView2inView1inView}>
                  <Text style={styles1.Content3inView1Text1}>Telefon</Text>
                  <Text style={styles1.Content3inView1Text2}>
                    {profile && profile.phone ? profile.phone : 'telyok'}
                  </Text>
                </View>
                <View style={styles1.Content3inView2inView1inView} />
                <View style={styles1.Content3inView2inView1inView}>
                  <Text style={styles1.Content3inView1Text1}>İnstagram</Text>
                  <Text style={styles1.Content3inView1Text2}>@*******</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles1.Content4}>
            <View style={styles1.Content4inView}>
              <TouchableOpacity
                style={styles1.Content4inViewinFlexTouch}
                onPress={
                  this.state.is_vip === false
                    ? this.showMagazin2
                    : this._toastWithDurationHandler
                }>
                <View style={styles1.Content4inViewinFlexTouchinView1}>
                  <Image
                    source={Star}
                    style={styles1.Content4inViewinFlexTouchinView1inImage}
                  />
                </View>
                <View style={styles1.Content4inViewinFlexTouchinView2}>
                  <Text style={styles1.Content4inViewinFlexTouchinView2inText}>
                    Hepsi Burada Paketi
                  </Text>
                </View>
                <View style={styles1.Content4inViewinFlexTouchinView1}>
                  <Image
                    source={Arrow}
                    style={styles1.Content4inViewinFlexTouchinView1Image}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles1.Content4inViewinFlexTouch}
                onPress={
                  this.state.is_vip === false
                    ? this.showVitrin
                    : this._toastWithDurationHandler
                }>
                <View style={styles1.Content4inViewinFlexTouchinView1}>
                  <Image
                    source={Heart}
                    style={styles1.Content4inViewinFlexTouchinView1inImage}
                  />
                </View>
                <View style={styles1.Content4inViewinFlexTouchinView2}>
                  <Text style={styles1.Content4inViewinFlexTouchinView2inText}>
                    Vitrin Paketleri
                  </Text>
                </View>
                <View style={styles1.Content4inViewinFlexTouchinView1}>
                  <Image
                    source={Arrow}
                    style={styles1.Content4inViewinFlexTouchinView1Image}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles1.Content4inViewinFlexTouch}
                onPress={
                  this.state.is_vip === false
                    ? this.showMagazin
                    : this._toastWithDurationHandler
                }>
                <View style={styles1.Content4inViewinFlexTouchinView1}>
                  <Image
                    source={Backtac}
                    style={styles1.Content4inViewinFlexTouchinView1inImage}
                  />
                </View>
                <View style={styles1.Content4inViewinFlexTouchinView2}>
                  <Text style={styles1.Content4inViewinFlexTouchinView2inText}>
                    Premium Paketler
                  </Text>
                </View>
                <View style={styles1.Content4inViewinFlexTouchinView1}>
                  <Image
                    source={Arrow}
                    style={styles1.Content4inViewinFlexTouchinView1Image}
                  />
                </View>
              </TouchableOpacity>
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
    flex: 14,
    backgroundColor: '#F3F3FB',
    flexDirection: 'row',
  },
  HeaderViewStyle1: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  HeaderViewStyle2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileImageStyle: {
    width: calculate(4.3),
    height: calculate(4.3),
  },
  HeaderTitleStyle: {
    color: '#424649',
    textAlign: 'center',
    fontFamily: 'FiraSans-Bold',
    fontSize: calculate(6),
    marginLeft: calculate(1.5948963317384),
  },
  settingsImageStyle: {
    width: calculate(6.74536256323777),
    height: calculate(6.74536256323777),
  },
  HeaderButtonStyle: {
    paddingVertical: calculate(0.79744816586922),
    paddingHorizontal: calculate(1.59489633173844),
  },
  Content1: {flex: 46, width: '100%', alignItems: 'center'},
  ProfileContainer: {
    position: 'absolute',
    width: calcWidth(100) - calculate(5.5),
    height: '91%',
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    backgroundColor: '#ffffff',
    marginTop: calculate(0.79744816586922),
    borderRadius: calculate(1.59489633173844),
  },
  ProfileConTop: {
    flex: 1.9,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ProfileConTopLeft: {
    flex: 6,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingLeft: calculate(0.79744816586922),
  },
  ProfileImageView: {
    overflow: 'hidden',
    marginTop: calculate(1.59489633173844),
    aspectRatio: 1,
  },
  profileImageStyle1: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: calcWidth(25),
  },
  ProfileImageView1: {
    bottom: 2,
    right: 0,
    position: 'absolute',
    height: calculate(4.384),
    width: calculate(4.384),
    borderRadius: calcWidth(8),
    overflow: 'hidden',
    borderWidth: calculate(0.51),
    borderColor: 'white',
    zIndex: 3,
  },
  profileImageStyle2: {
    width: calculate(2.2),
    height: calculate(2.2),
    resizeMode: 'contain',
  },
  GradientStyle2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileConTopCenter: {
    flex: 9,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  ProfileNameText: {
    color: '#4A4A4A',
    fontSize: calculate(4),
    fontFamily: 'Montserrat-Bold',
    marginVertical: calculate(1.59489633173844),
  },
  ProfileCityText: {
    fontFamily: 'Montserrat-Regular',
    color: '#C1C0C9',
    fontSize: calculate(2.5),
  },
  ProfileConTopRight: {
    flex: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileConTouchable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: calculate(1),
  },
  ProfileConTouchableImage: {
    height: calculate(4),
    width: calculate(4),
  },
  ProfileConBottom: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#D8D8D8',
  },
  ProfileConBottomFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileConBottomFlexText1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: calculate(2.2),
    color: '#C2C4CA',
  },
  ProfileConBottomFlexText2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: calculate(3.7),
    color: '#262628',
  },
  Content2: {flex: 32, width: '100%', zIndex: 0},
  GradientStyle1: {
    flex: 1,
    width: '100%',
  },
  FreeContent: {flex: 14, width: '100%'},
  Content3: {flex: 48, width: '100%'},
  Content3inView1: {
    flex: 0.5,
    paddingHorizontal: calculate(5.5),
  },
  Content3inView1Text1: {
    fontSize: calculate(3.2),
    color: '#7755CD',
    fontFamily: 'Montserrat-SemiBold',
  },
  Content3inView1Text2: {fontSize: calculate(2.5), color: '#B8B8B8'},
  Content3inView2: {
    flex: 1,
    paddingHorizontal: calculate(5.5),
  },
  Content3inView2inView1: {
    flex: 1,
    flexDirection: 'row',
  },
  Content3inView2inView1inView: {
    flex: 1,
  },
  Content4: {
    flex: 40,
    width: '100%',
    alignItems: 'center',
  },
  Content4inView: {
    height: '75%',
    width: calcWidth(100) - calculate(5.73355817871),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  Content4inViewinFlexTouch: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: calculate(0.1),
    borderColor: '#D8D8D8',
  },
  Content4inViewinFlexTouchinView1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Content4inViewinFlexTouchinView1inImage: {
    width: calculate(6),
    height: calculate(6),
    resizeMode: 'contain',
  },
  Content4inViewinFlexTouchinView2: {
    flex: 3,
    justifyContent: 'center',
  },
  Content4inViewinFlexTouchinView2inText: {
    fontSize: calculate(3.6),
    color: '#262628',
  },
  Content4inViewinFlexTouchinView1Image: {
    width: calculate(3),
    height: calculate(3),
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
