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
      first_name: '',
      last_name: '',
      story: '',
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
        first_name: user.first_name,
        last_name: user.last_name,
        story: user.profile.story,
        loading: false,
        hobbies: user.profile.hobbies,
      });
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
    const { id, first_name, last_name, story, hobbies } = this.state;
    this.setState({ loading: true });
    try {
      await axiosInstance.patch(`/api/users/${id}/`, {
        first_name,
        last_name,
        profile: {
          story,
          hobbies,
        },
      });
      ToastAndroid.show(
        'Başarıyla Değiştirildi',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
      this.setState({ loading: false });
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
    const { loading, first_name, last_name, story, hobbies } = this.state;
    console.log(first_name, last_name, story);
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
          <Text style={styles.text}>İsim & Durum & Hikaye </Text>
        </View>
        {this.input('İsim', first_name, 'first_name', 10)}
        {this.input('Hikaye', story, 'story', 25)}
        {this.input('Hobiler', hobbies, 'hobbies', 25)}
        <TouchableOpacity style={styles.button} onPress={this.saveChanged}>
          {loading ? (
            <ActivityIndicator style={styles.buttonTitle} color="#FFFFFF" />
          ) : (
              <Text style={styles.buttonTitle}>Kaydet</Text>
            )}
        </TouchableOpacity>
        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
          <Text>Sadece Vip kullanıcılar düzenleyebilir!</Text>
        </View>
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
