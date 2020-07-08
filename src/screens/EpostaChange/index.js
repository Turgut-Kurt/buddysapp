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
      email: '',
      newPass: '',
      newPassAgain: '',
      hobbies: ''
    };
  }

  componentDidMount = async () => {
    const { userId } = this.props.SignInReducer;
    this.setState({ loading: true });
    try {
      const getUser = await axiosInstance.get(`api/users/${userId}/`);
      const user = getUser.data;
      this.setState({
        id: user.id,
        loading: false,
      });
      axiosInstance.patch
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
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

  saveChanged = async () => {
    const { id, email } = this.state;
    this.setState({ loading: true });
    try {
      if (email != '') {
        await axiosInstance.patch(`/api/users/${id}/`, {
          email: email,
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
      console.log(e);
    }
  };

  render() {
    const { loading, } = this.state;
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.text}>Eposta Değiştir</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Eposta</Text>
          <TextInput
            onChange={false}
            style={styles.input}
            placeholder={'Email'}
            placeholderTextColor="#7e7e7e"
            value={this.state.email}
            onChangeText={text => {
              this.setState({ email: text })
            }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.saveChanged}>
          {loading ? (
            <ActivityIndicator style={styles.buttonTitle} color="#FFFFFF" />
          ) : (
              <Text style={styles.buttonTitle}>Kaydet</Text>
            )}
        </TouchableOpacity>
        <Text style={{ marginTop: 20, textAlign: 'center' }}>Hesabınızdaki şifre değişikliği ve şifre unuttum işlemleri için e-posta adresinizi girmeniz gerekmektedir.</Text>
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
