import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import {SignIn} from '../../store/Actions/Auth/SignIn';
import AuthControl from '../../utils/AuthControl';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      errors: [],
    };
  }
  componentDidMount() {
    LoginManager.logOut();
    if (Platform.OS === 'android') {
      console.log('***********');
      Linking.getInitialURL().then((url) => {
        this.handleOpenURLAndroid(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }
  handleOpenURL(event) {
    console.log('------------------');
    console.log(event);
    const route = e.url.replace(/.*?:\/\//g, '');
    console.log(route);
    console.log('------------------');
  }
  handleOpenURLAndroid(url) {
    console.log('------------------');
    const parsedUrl = url.split('/');
    console.log(parsedUrl);
    console.log(parsedUrl[parsedUrl.length - 1]);
    console.log(parsedUrl[parsedUrl.length - 2]);
    this.props.navigation.navigate('PassChange', {
      uid: parsedUrl[parsedUrl.length - 2],
      token: parsedUrl[parsedUrl.length - 1],
    });
  }
  _handleSubmit = async () => {
    await this.setState({loading: true, errors: []});
    const {username, password} = this.state;
    try {
      await this.props.SignIn(username, password);
      const {token, userId, error} = await this.props.SignInReducer;
      if (token !== null && userId !== null) {
        await AuthControl.saveToken('token', token, false);
        await AuthControl.saveToken('userId', userId, false);
      }
      if (error) {
        this.errorRender(error);
      }
      this.setState({loading: false});
    } catch (error) {
      this.setState({loading: false});
    }
  };
  _handleFacebookLogin = async () => {
    const self = this;
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(
        function (result) {
          if (result.isCancelled) {
            alert('Facebook ile giriş başarısız oldu.');
          } else {
            const fields =
              'id, email, picture.type(large), birthday, name, gender,first_name';
            const accessData = AccessToken.getCurrentAccessToken();
            // Create a graph request asking for user information
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessData.accessToken,
                parameters: {
                  fields: {
                    string: fields,
                  },
                },
              },
              (error, result) => {
                if (error) {
                } else {
                  console.log(result);
                  self.props.navigation.navigate('Register', {
                    User: {
                      username: result.id,
                      first_name: result.first_name,
                      email: result.email,
                      password: result.id,
                      profile: {
                        birth_date: result.birth_date,
                        photo: result.picture.data.url,
                      },
                    },
                  });
                  console.log(result);
                  /*axiosInstance.post('api/users/', {
                username: result.id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                password: result.id,
                profile: {
                  birth_date: result.birth_date,
                  photo: result.picture.data.url,
                },
              });
              this._handleSubmit();*/
                }
              },
            );
            // Execute the graph request created above
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        },
        function (error) {
          alert('Facebook ile giriş başarısız oldu: ' + error.message);
        },
      )
      .then((data) => {
        console.log(data);
      });
  };

  errorRender = (error) => {
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
        case 'detail':
          newKey = '';
          message =
            'Verilen kimlik bilgilerine sahip etkin bir hesap bulunamadı';
          break;
      }
      this.setState({
        errors: [...this.state.errors, {key: newKey, value: message}],
      });
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const {loading, errors} = this.state;
    return (
      <View style={styles.backgroundView}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require('../../assets/login/logo.png')}
          />
        </View>
        <View style={styles.inputView}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Kullanıcı Adı"
              style={{
                height: '100%',
                flex: 1,
                paddingHorizontal: 10,
                color: '#7755CD',
              }}
              onChangeText={(text) => {
                this.setState({username: text});
              }}
              underlineColorAndroid="transparent"
            />
            <Image
              style={{width: 20, height: 20}}
              source={require('../../assets/images/user2.png')}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Şifre"
              style={{
                height: '100%',
                flex: 1,
                paddingHorizontal: 10,
                color: '#7755CD',
              }}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
            <Image
              style={{width: 20, height: 20}}
              source={require('../../assets/images/eye.png')}
            />
          </View>
          <View style={{width: '80%', flexDirection: 'row-reverse'}}>
            <TouchableOpacity onPress={() => navigate('ForgotPass')}>
              <Text>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>
        </View>
        {errors.length > 0 && (
          <View style={styles.errorWrapper}>
            {errors.map((x) => (
              <Text key={x.key.toString()} style={styles.errorText}>
                {x.key} {x.value}
              </Text>
            ))}
          </View>
        )}
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={{
              height: 40,
              borderRadius: 20,
              width: '50%',
              backgroundColor: '#F87878',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
            onPress={() => {
              navigate('Register');
            }}>
            <Text style={{color: 'white'}}>Kayıt Ol</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity
            style={{
              height: 40,
              borderRadius: 20,
              width: '50%',
              backgroundColor: '#F87878',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
            onPress={this._handleFacebookLogin}>
            <Text style={{ color: 'white' }}>Facebook ile kayıt ol</Text>
          </TouchableOpacity>*/}
          <TouchableOpacity
            style={{
              height: 40,
              borderRadius: 20,
              width: '50%',
              backgroundColor: '#7755CD',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this._handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={{color: 'white'}}>Giriş Yap</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  SignIn,
};

LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPage;
