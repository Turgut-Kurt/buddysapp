import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { axiosInstance } from '../../utils/Api';

class InfoChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: null,
      oldPass: '',
      newPass: '',
      newPassAgain: '',
      hobbies: '',
      errors: [],
      isConfirm: false
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    if (this.props.navigation.getParam('uid')) {
      const uid = this.props.navigation.getParam('uid')
      const token = this.props.navigation.getParam('token')
      await this.setState({ loading: false, uid, token, isConfirm: true });
    } else {
      await this.setState({ loading: false, isConfirm: false });
    }
  };
  hasNumber(myString, length) {
    if (myString.length > length) {
      return false
    } else if (/\d/.test(myString)) {
      return false
    } else {
      return true
    }
  }
  input = (label, title, name, length) => {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          onChange={false}
          style={styles.input}
          placeholder={title}
          placeholderTextColor="#7e7e7e"
          value={this.state[name]}
        /*onChangeText={text => {
          if (this.hasNumber(text, length)) {
            this.setState({ [name]: text })
          }
        }}*/
        />
      </View>
    );
  };

  saveChangedConfirm = async () => {
    const { id, newPass, newPassAgain, oldPass, uid, token } = this.state;
    this.setState({ loading: true, errors: [] });
    try {
      if (newPass != '' && newPassAgain != '') {
        const res = await axiosInstance.post(`https://onappserver.com/rest-auth/password/reset/confirm/`, {
          new_password1: newPass,
          new_password2: newPassAgain,
          uid,
          token
        });

        ToastAndroid.show(
          'Başarıyla Değiştirildi',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        this.setState({ loading: false });
        this.props.navigation.navigate('SignIn')
      } else {
        this.setState({ loading: false });
        ToastAndroid.show(
          'Bir Sorun Oluştu',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
      }
    } catch (e) {
      this.setState({ loading: false });
      ToastAndroid.show(
        'Bir Sorun Oluştu',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
      this.errorRender(e.response.data)
      //this.errorRender(e);
    }
  };
  saveChanged = async () => {
    const { id, newPass, newPassAgain, oldPass, uid, token } = this.state;
    console.log(1)
    this.setState({ loading: true, errors: [] });
    try {
      if (newPass != '' && newPassAgain != '') {
        const res = await axiosInstance.post(`https://onappserver.com/rest-auth/password/change/`, {
          new_password1: newPass,
          new_password2: newPassAgain,
          curr_password: oldPass,
        });

        ToastAndroid.show(
          'Başarıyla Değiştirildi',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        this.setState({ loading: false });
        this.props.navigation.goBack()
      } else {
        this.setState({ loading: false });
        ToastAndroid.show(
          'Bir Sorun Oluştu',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
      }
    } catch (e) {
      this.setState({ loading: false });
      ToastAndroid.show(
        'Bir Sorun Oluştu',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
      console.log(e)
      this.errorRender(e.response.data)
      //this.errorRender(e);
    }
  };
  errorRender = error => {
    for (const [key, value] of Object.entries(error)) {
      console.log(key, value);
      let newKey = key;
      let message = value;
      switch (key) {
        case 'new_password1':
          newKey = 'Şifre -';
          break;
        case 'new_password2':
          newKey = 'Şifre -';
          break;
        case 'detail':
          newKey = '';
          message =
            'Verilen kimlik bilgilerine sahip etkin bir hesap bulunamadı';
          break;
      }
      this.setState({
        errors: [...this.state.errors, { key: newKey, value: message }],
      });
    }
  };
  render() {
    const { loading, errors } = this.state;
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.header}>
          {this.state.isConfirm ? null : <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.backButtonIcon}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>}
          <Text style={styles.text}>{this.state.isConfirm ? 'Şifremi Unuttum' : 'Şifremi Değiştir'}</Text>
        </View>
        {/*this.state.isConfirm ? null : <View style={styles.inputWrapper}>
          <Text style={styles.label}>Eski Şifre</Text>
          <TextInput
            secureTextEntry={true}
            onChange={false}
            style={styles.input}
            placeholder={'Eski Şifre'}
            placeholderTextColor="#7e7e7e"
            value={this.state.oldPass}
            onChangeText={text => {
              this.setState({ oldPass: text })
            }}
          />
        </View>*/}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Yeni Şifre</Text>
          <TextInput
            secureTextEntry={true}
            onChange={false}
            style={styles.input}
            placeholder={'Yeni Şifre'}
            placeholderTextColor="#7e7e7e"
            value={this.state.newPass}
            onChangeText={text => {
              this.setState({ newPass: text })
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Yeni Şifre(Tekrar)</Text>
          <TextInput
            secureTextEntry={true}
            onChange={false}
            style={styles.input}
            placeholder={'Yeni Şifre(Tekrar)'}
            placeholderTextColor="#7e7e7e"
            value={this.state.newPassAgain}
            onChangeText={text => {
              this.setState({ newPassAgain: text })

            }}
          />
        </View>
        {errors.length > 0 && (
          <View style={styles.errorWrapper}>
            {errors.map(x => (
              <Text key={x.key.toString()} style={styles.errorText}>
                {x.key} {x.value}
              </Text>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={this.state.isConfirm ? this.saveChangedConfirm : this.saveChanged}>
          {loading ? (
            <ActivityIndicator style={styles.buttonTitle} color="#FFFFFF" />
          ) : (
              <Text style={styles.buttonTitle}>Kaydet</Text>
            )}
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
  };
};

export default connect(
  mapStateToProps,
  {},
)(InfoChange);
