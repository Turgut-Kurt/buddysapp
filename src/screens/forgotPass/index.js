import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import styles from './style';
import { connect } from 'react-redux';
import { SignIn } from '../../store/Actions/Auth/SignIn';
import AuthControl from '../../utils/AuthControl';
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { axiosInstance } from '../../utils/Api';
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      email: '',
      errors: [],
    };
  }
  componentDidMount() {
    LoginManager.logOut()
  }
  _handleSubmit = async () => {
    await this.setState({ loading: true, errors: [] });
    const { email } = this.state;

    try {
      if (email == '') {
        console.log(1)
        this.errorRender('null');
      } else {
        const res = await axiosInstance.post('https://onappserver.com/rest-auth/password/reset/', { email });
        ToastAndroid.show(
          'Şifre sıfırlama bağlantısı gönderilmiştir.',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        this.props.navigation.navigate('SignIn')
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(2)
      this.errorRender('unknown')
    }
  };


  errorRender = (key) => {
    this.setState({
      errors: [{ key: key, value: key === 'null' ? 'Email boş geçilemez.' : 'Email bulunamadı.' }],
    });

  };

  render() {
    const { navigate } = this.props.navigation;
    const { loading, errors } = this.state;
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
              placeholder="Email"
              style={{
                height: '100%',
                flex: 1,
                paddingHorizontal: 10,
                color: '#7755CD',
              }}
              onChangeText={text => {
                this.setState({ email: text });
              }}
              underlineColorAndroid="transparent"
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/images/user2.png')}
            />
          </View>

        </View>
        {errors.length > 0 && (
          <View style={styles.errorWrapper}>
            {errors.map(x => (
              <Text key={x.key.toString()} style={styles.errorText}>
                {x.value}
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
              navigate('SignIn');
            }}>
            <Text style={{ color: 'white' }}>Giriş Yap</Text>
          </TouchableOpacity>
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
                <Text style={{ color: 'white' }}>Şifremi Gönder</Text>
              )}
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  SignIn,
};

LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

export default LoginPage;
