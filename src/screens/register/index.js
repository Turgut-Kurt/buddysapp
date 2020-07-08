import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
  Keyboard,
  FlatList,
  AsyncStorage
} from 'react-native';
import styles from './styles';
import ZeyTab from '../component/slider';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Config from '../../utils/Config';
import { axiosInstance } from '../../utils/Api';
import { connect } from 'react-redux';
import { SignIn } from '../../store/Actions/Auth/SignIn';
import AuthControl from '../../utils/AuthControl';
import { Filters } from '../../store/Actions/Filters';
const RNFS = require('react-native-fs');
import Geolocation from 'react-native-geolocation-service';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      passwordAgain: '',
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      birth_date: 'şeçiniz',
      location: '',
      phone: '',
      zodiac: '',
      gender: 'NL',
      about: '...',
      story: '...',
      pageIndex: 0,
      profilePhoto: null,
      profilePhoto1: null,
      profilePhoto2: null,
      photo: null,
      photo1: null,
      photo2: null,
      phone: null,
      errors: [],
      selectedItem: {
        key: 0
      },
      what_find__in: undefined
    };
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButton();
      return true;
    });
    this.getLocation();
    if (this.props.navigation.getParam('User')) {
      const user = this.props.navigation.getParam('User');
      this.setState({ username: user.first_name + user.username, email: user.email, first_name: user.first_name })
    }
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = position.coords;
        this.setState({
          location: `POINT(${coords.latitude} ${coords.longitude})`,
        });
      },
      error => {
        this.getLocation();
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  handleBackButton() {
    return true;
  }

  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  pageChange = index => {
    this.setState({ pageIndex: index });
  };

  registerPost = async () => {
    await this.setState({ loading: true, errors: [] });
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      birth_date,
      location,
      photo,
      photo1,
      photo2,
      phone,
      gender,
      about,
      story,
    } = this.state;
    try {
      await axiosInstance.post('api/users/', {
        username,
        first_name,
        last_name,
        email,
        password,
        profile: {
          birth_date,
          location,
          phone,
          photo,
          gender_choices: gender,
          about_me: about,
          story,
          choise: gender == 'MN' ? 'WM' : 'MN',
          what_find: this.state.selectedItem.name ? this.state.selectedItem.name : 'FR'
        },
        photos: [{ photo: photo1 }, { photo: photo2 }],
      });
      this.setState({ loading: false });
      this.saveFilters()
      this._zeyTab.next();
      this._handleSubmit();
    } catch (e) {
      this.setState({ loading: false });
      this._zeyTab.next();
      this.errorRender(e.response.data);
    }
  };

  _handleSubmit = async () => {
    await this.setState({ loading: true, errors: [] });
    const { username, password } = this.state;
    try {
      await this.props.SignIn(username, password);
      const { token, userId, error } = await this.props.SignInReducer;
      if (token !== null && userId !== null) {
        await AuthControl.saveToken('token', token, true);
        await AuthControl.saveToken('userId', userId, true);
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };
  selectedItem = (groupKey, item) => {
    this.setState({ [groupKey]: item }, () => {
      console.log('filter', this.state);
    });
  };

  errorRender = error => {
    for (const [key, value] of Object.entries(error)) {
      console.log(key, value);
      let newKey = key;
      let message = value;
      switch (key) {
        case 'username':
          newKey = 'Kullanıcı Adı -';
          break;
        case 'password':
          newKey = 'Parola -';
          break;
        case 'email':
          newKey = 'E-Posta -';
          break;
      }
      this.setState({
        errors: [...this.state.errors, { key: newKey, value: message }],
      });
    }
  };

  imageSelect = type => {
    const options = {
      title: 'Avatar Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
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

  imageResize = (uri, type) => {
    ImageResizer.createResizedImage(uri, 1366, 768, 'JPEG', 80)
      .then(resizedImage => {
        this.setState({
          [type]: resizedImage.uri,
        });
        this.handleBase64(resizedImage.path, type);
      })
      .catch(err => {
        console.log(err);
      });
  };
  saveFilters = async () => {
    AsyncStorage.setItem('distance', '100')
  };
  handleBase64 = async (path, type) => {
    try {
      const base64 = await RNFS.readFile(path, 'base64');
      switch (type) {
        case 'profilePhoto2':
          this.setState({ photo: base64 });
          break;
        case 'profilePhoto1':
          this.setState({ photo1: base64 });
          break;
        case 'profilePhoto':
          this.setState({ photo2: base64 });
          break;
        default:
          break;
      }
    } catch (e) {
      ToastAndroid.show(
        'Resimi base64 e çevirirken bir problem oluştu.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
  hasNumber(myString) {
    return /\d/.test(myString);
  }
  hasNull(myString) {
    return / /g.test(myString);
  }
  onChangeItem = (item) => {
    this.setState({ selectedItem: item }, () => {
      this.selectedItem('what_find__in', item);
    });
  };
  render() {

    const { goBack } = this.props.navigation;
    const { loading, errors } = this.state;
    return (
      <View style={styles.backgroundView}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator color="#FFFFFF" size="large" />
          </View>
        )}
        <ZeyTab
          navBar={false}
          style={{
            width: '100%',
            flex: 1,
          }}
          scrollEnabled={false}
          ref={node => (this._zeyTab = node)}
          getIndex={this.pageChange}>
          <View
            style={styles.tabPage}
            name="Sayfa 1"
            status={true}
            onImage={require('../../assets/login/eye.png')}
            offImage={require('../../assets/login/eye.png')}>
            <View style={styles.topView}>
              <Text style={styles.titleText}>Cinsiyet</Text>
              <Text style={styles.descriptionText}>
                Lütfen Cinsiyetinizi Seçin
              </Text>
            </View>
            <View style={styles.genderView}>
              <View style={{ marginRight: 20, alignItems: 'center' }}>
                <TouchableOpacity
                  style={
                    this.state.gender === 'MN' ? styles.selectedMan : styles.man
                  }
                  onPress={() => {
                    this.setState({ gender: 'MN' });
                  }}>
                  <Image
                    source={require('../../assets/login/mars.png')}
                    style={{
                      width: '50%',
                      height: '50%',
                    }}
                  />
                </TouchableOpacity>
                <Text>Erkek</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={
                    this.state.gender === 'WM'
                      ? styles.selectedWomen
                      : styles.women
                  }
                  onPress={() => {
                    this.setState({ gender: 'WM' });
                  }}>
                  <Image
                    source={require('../../assets/login/female.png')}
                    style={{
                      width: '50%',
                      height: '50%',
                    }}
                  />
                </TouchableOpacity>
                <Text>Kadın</Text>
              </View>
            </View>
            <View style={styles.infoView}>
              <View style={styles.topView}>
                <Text style={styles.titleText}>Genel Bilgiler</Text>
                <Text style={styles.descriptionText}>Doğru Bilgi Giriniz</Text>
              </View>

              <View
                style={{
                  flex: 1,
                }}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                  <View style={styles.textInputViewLeft}>
                    <Text style={{ color: '#7755CD', marginRight: 10 }}>*</Text>
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="Adı(Sadece adınızı yazınız.)"
                        placeholderTextColor="#7755CD"
                        underlineColorAndroid="transparent"
                        style={{ flex: 1 }}
                        value={this.state.first_name}
                        onChangeText={e => {
                          if (!this.hasNumber(e) && !this.hasNull(e)) {
                            this.setState({ first_name: e });
                          }

                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <TouchableWithoutFeedback
                    onPress={async () => {
                      try {
                        const {
                          action,
                          year,
                          month,
                          day,
                        } = await DatePickerAndroid.open({
                          date: new Date(),
                          maxDate: new Date(
                            `${new Date().getFullYear() - 18}-01-01`,
                          ),
                        });
                        if (action !== DatePickerAndroid.dismissedAction) {
                          const birthDate =
                            year + '-' + (month + 1) + '-' + day;
                          const newAge = Config.getAge(birthDate);
                          this.setState({
                            birth_date: birthDate,
                            age: newAge,
                          });
                        }
                      } catch ({ code, message }) {
                        console.warn('Cannot open date picker', message);
                      }
                    }}>
                    <View style={styles.textInputViewRight}>
                      <Text style={{ color: '#7755CD', marginRight: 10 }}>*</Text>
                      <View style={styles.textInput}>
                        <Text
                          color="#7755CD"
                          underlineColorAndroid="transparent"
                          style={{ flex: 1 }}>
                          Doğum Tarihi: {this.state.birth_date}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 2"
            status={false}
            onImage={require('../../assets/login/eye.png')}
            offImage={require('../../assets/login/eye.png')}>
            <View style={styles.topView2}>
              <View style={{ width: '90%', flex: 1 }}>
                <ImageBackground
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/login/logo.png')}
                />
              </View>
            </View>
            <View style={styles.topView}>
              <Text style={styles.titleText}>Nasıl Giriş Yapmak İstersin?</Text>
            </View>
            <View style={{ flex: 1, width: '100%' }}>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <View style={styles.textInputViewLeft}>
                  <Text style={{ color: '#7755CD', marginRight: 10 }}>*</Text>
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Kullanıcı Adı"
                      placeholderTextColor="#7755CD"
                      underlineColorAndroid="transparent"
                      style={{ flex: 1 }}
                      value={this.state.username}
                      onChangeText={e => {
                        if (!this.hasNull(e)) {
                          this.setState({ username: e });
                        }

                      }}
                    />
                    <Image
                      style={styles.icon20}
                      source={require('../../assets/login/user2.png')}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <View style={styles.textInputViewLeft}>
                  <Text style={{ color: '#7755CD', marginRight: 10 }}>*</Text>
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Şifre"
                      placeholderTextColor="#7755CD"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      style={{ flex: 1 }}
                      onChangeText={e => {
                        this.setState({ password: e });
                      }}
                    />
                    <Image
                      style={styles.icon20}
                      source={require('../../assets/login/eye.png')}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <View style={styles.textInputViewLeft}>
                  <Text style={{ color: '#7755CD', marginRight: 10 }}>*</Text>
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Telefon"
                      placeholderTextColor="#7755CD"
                      underlineColorAndroid="transparent"
                      multiline={false}
                      style={{ flex: 1 }}
                      value={this.state.phone}
                      onChangeText={e => {
                        if (e.length != 12) {
                          this.setState({ phone: e.replace(/[^0-9]/g, '') });
                        }
                      }}
                    />
                    <Image
                      style={styles.icon20}
                      source={require('../../assets/login/eye.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 3"
            status={false}
            onImage={require('../../assets/login/eye.png')}
            offImage={require('../../assets/login/eye.png')}>
            <View style={styles.topView2}>
              <View style={{ width: '90%', flex: 1 }}>
                <ImageBackground
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/login/logo.png')}
                />
              </View>
            </View>
            <View style={styles.topView}>
              <Text style={styles.titleText}>Biraz Kendinden Bahset</Text>
              <Text
                style={{
                  color: '#7755CD',
                }}>
                Çok da detaya girme ;)
              </Text>
            </View>
            <View style={{ flex: 1, width: '100%' }}>
              <View style={{ flex: 1, marginVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#7755CD', marginRight: 10 }}>
                    Kendinden bahset
                  </Text>
                  <View style={styles.textAreaView}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{ flex: 1, width: '100%' }}
                      multiline={false}
                      maxLength={300}
                      onChangeText={e => {
                        if (!this.hasNumber(e)) {
                          this.setState({ about: e });
                        }
                      }}
                      value={this.state.about}
                    />
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'right',
                        color: '#7755CD',
                      }}>
                      {this.state.about.length + ' / 300'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#7755CD', marginRight: 10 }}>
                    En çılgın gününü anlat..
                  </Text>
                  <View style={styles.textAreaView}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{ flex: 1, width: '100%' }}
                      multiline={false}
                      maxLength={300}
                      onChangeText={e => {
                        if (!this.hasNumber(e)) {
                          this.setState({ story: e });
                        }
                      }}
                      value={this.state.story}
                    />
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'right',
                        color: '#7755CD',
                      }}>
                      {this.state.story.length + ' / 300'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#7755CD', marginRight: 10 }}>
                    Ne Arıyorsun?
                  </Text>
                  <View style={{ flex: 1 }}>
                    <View style={{ width: '100%', flex: 1 }}>
                      <FlatList
                        style={{ width: '100%', height: '100%' }}
                        numColumns={3}
                        keyExtractor={item => {
                          item.name.toString();
                        }}
                        data={[
                          { key: 1, value: 'Arkadaş', name: 'FR' },
                          { key: 2, value: 'İlişki', name: 'RL' },
                          { key: 3, value: 'Hızlı', name: 'SP' },
                        ]}
                        extraData={this.state.selectedItem}
                        renderItem={({ item, index }) => {
                          const style =
                            this.state.selectedItem.key === item.key
                              ? styles.selectedStyle
                              : styles.button;
                          const textStyle =
                            this.state.selectedItem.key === item.key
                              ? styles.selectedText
                              : styles.text;
                          return (
                            <View style={styles.item} key={item.name}>
                              <TouchableOpacity
                                style={style}
                                onPress={() => {
                                  this.onChangeItem(item, "what_find__in");
                                }}>
                                <Text style={textStyle}>{item.value}</Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 4"
            status={false}
            onImage={require('../../assets/login/eye.png')}
            offImage={require('../../assets/login/eye.png')}>
            <View style={styles.topView2}>
              <View style={{ width: '90%', flex: 1 }}>
                <ImageBackground
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/login/logo.png')}
                />
              </View>
            </View>
            <View style={styles.topView}>
              <Text style={styles.titleText}>Fotoğrafsız Olmaz </Text>
              <Text
                style={{
                  color: '#7755CD',
                }}
              />
            </View>
            <View style={styles.photosContainer}>
              <TouchableOpacity
                style={styles.photoViewLeft}
                onPress={() => this.imageSelect('profilePhoto')}>
                <Image
                  style={styles.photoLeft}
                  source={
                    this.state.profilePhoto
                      ? { uri: this.state.profilePhoto }
                      : require('../../assets/settings/emptyPhoto.png')
                  }
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoViewRight}
                onPress={() => this.imageSelect('profilePhoto1')}>
                <Image
                  style={styles.photoRight}
                  source={
                    this.state.profilePhoto1
                      ? { uri: this.state.profilePhoto1 }
                      : require('../../assets/settings/emptyPhoto.png')
                  }
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoViewCenter}
                onPress={() => this.imageSelect('profilePhoto2')}>
                <Image
                  style={styles.photoCenter}
                  source={
                    this.state.profilePhoto2
                      ? { uri: this.state.profilePhoto2 }
                      : require('../../assets/settings/emptyPhoto.png')
                  }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={styles.tabPageFull}
            name="Sayfa 5"
            status={false}
            onImage={require('../../assets/login/eye.png')}
            offImage={require('../../assets/login/eye.png')}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {errors.length > 0 ? (
                <View style={styles.errorWrapper}>
                  {errors.map(x => (
                    <Text key={x.key.toString()} style={styles.errorText}>
                      {x.key} {x.value}
                    </Text>
                  ))}
                </View>
              ) : (
                  <>
                    <Text style={styles.titleText}>TEBRİKLER!</Text>
                    <Image
                      source={require('../../assets/login/prize.png')}
                      style={{
                        height: 150,
                        width: 150,
                        marginVertical: 10,
                      }}
                    />
                    <Text style={styles.descriptionText}>
                      Şimdi hesabın hazır. Eşsiz benzerliklerini bulmaya
                      başlayalım..
                  </Text>
                  </>
                )}
            </View>
          </View>
        </ZeyTab>
        <View
          style={{
            width: '100%',
            height: '15%',
            alignItems: 'center',
          }}>
          {this.state.pageIndex !== 4 ? (
            <TouchableOpacity
              style={
                this.state.pageIndex === 3
                  ? styles.lastButton
                  : styles.nexButton
              }
              onPress={async () => {
                if (this.state.pageIndex === 0) {
                  if (
                    this.state.first_name.length > 1 &&
                    this.state.birth_date !== '' &&
                    this.state.age !== '' &&
                    this.state.gender !== 0
                  ) {
                    this._zeyTab.next();
                  } else {
                    ToastAndroid.show(
                      'Cinsiyet, isim, soyisim, e-posta ve doğum tarihi zorunludur.',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                    );
                  }
                } else if (this.state.pageIndex === 1) {
                  if (
                    this.state.username.length > 1 &&
                    this.state.username.length < 20 &&
                    this.state.password.length > 5 &&
                    this.state.password.length < 20 &&
                    this.state.phone.length === 11
                  ) {
                    this._zeyTab.next();
                  } else {
                    ToastAndroid.show(
                      'Kullanıcı adı en az 5 karakter, şifrenizde en az 8 karakter olup sayı ve harf kombinasyonlarından oluşmalı, ve telefon numarınızı (0555555555) şeklinde giriniz.',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      25,
                      50,
                    );
                  }
                } else if (this.state.pageIndex === 2) {
                  if (
                    this.state.about.length > 2 &&
                    this.state.story.length > 2
                  ) {
                    this._zeyTab.next();
                  } else {
                    ToastAndroid.show(
                      'Hakkımızda ve Story alanını boş geçemezsiniz.',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                    );
                  }
                } else if (this.state.pageIndex === 3) {
                  if (
                    this.state.photo !== null
                  ) {

                    /*  this.state.photo1 !== null &&
                     this.state.photo2 !== null */

                    this.registerPost();
                  } else {
                    ToastAndroid.show(
                      'Kalem ikonuna tıklayıp fotoğrafları şeçmelisiniz',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      25,
                      50,
                    );
                  }
                }
                Keyboard.dismiss();
              }}>
              <Text
                style={
                  this.state.pageIndex === 3
                    ? { color: '#7755CD' }
                    : { color: 'white' }
                }>
                {this.state.pageIndex === 3 ? 'Bitir' : 'İleri'}
              </Text>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                style={styles.lastButton}
                onPress={() => {
                  errors.length > 0
                    ? this._zeyTab.pageChange(0)
                    : [this._zeyTab.pageChange(0), goBack()];
                }}>
                <Text style={{ color: '#7755CD' }}>
                  {errors.length > 0 ? 'Geri Git' : 'Bitir'}
                </Text>
              </TouchableOpacity>
            )}
          {this.state.pageIndex < 3 ? (
            <TouchableOpacity
              style={{
                marginTop: 10,
              }}
              onPress={() => {
                this._zeyTab.pageChange(0);
                goBack();
              }}>
              <Text>Giriş Yap</Text>
            </TouchableOpacity>
          ) : (
              <View />
            )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
    FiltersReducer: state.FiltersReducer,
  };
};

const mapDispatchToProps = {
  SignIn,
  Filters
};

Register = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default Register;
