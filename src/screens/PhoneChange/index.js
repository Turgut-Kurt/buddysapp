import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import {axiosInstance} from '../../utils/Api';

class PhoneChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: null,
      phone: '',
      u: '',
    };
  }

  componentDidMount = async () => {
    const {userId} = this.props.SignInReducer;
    this.setState({loading: true});
    try {
      const getUser = await axiosInstance.get(`api/users/${userId}/`);
      const user = getUser.data;
      this.setState({
        id: user.id,
        phone: user.profile.phone,
        loading: false,
        u: user,
      });
    } catch (e) {
      this.setState({loading: false});
      console.log(e);
    }
  };

  input = (label, title, name) => {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={`0${title ? title : ''}`}
          placeholderTextColor="#7e7e7e"
          value={this.state[name]}
          onChangeText={(val) => this.setState({[name]: val})}
        />
        <Text>Sadece Vip Abonelikler</Text>
      </View>
    );
  };

  saveChanged = async () => {
    const {id, phone, u} = this.state;

    const replacePhone = phone.includes('') ? phone.replace('', '') : phone;
    this.setState({loading: true});
    console.log('u' + phone);
    console.log(u);
    if (u.is_vip === true) {
      try {
        await axiosInstance.put(`/api/users/${id}/`, {
          profile: {
            phone: `${replacePhone.toLowerCase().replace(' ', '')}`,
          },
        });
        ToastAndroid.show(
          'Başarıyla Değiştirildi',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        this.setState({loading: false});
      } catch (e) {
        this.setState({loading: false});
        ToastAndroid.show(
          'Bir Sorun Oluştu',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        console.log(e);
      }
    } else {
      this.props.navigation.navigate('Shop');
    }
  };

  render() {
    const {loading, profile} = this.state;
    console.log(this.state);
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.backButtonIcon}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Telefon</Text>
        </View>
        {this.input('Telefon', profile && profile.phone, 'phone')}
        <TouchableOpacity style={styles.button} onPress={this.saveChanged}>
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

const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
  };
};

export default connect(mapStateToProps, {})(PhoneChange);
