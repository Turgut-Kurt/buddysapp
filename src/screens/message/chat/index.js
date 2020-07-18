import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  BackHandler,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {axiosInstance} from '../../../utils/Api';
import NoUserImage from '../../../assets/images/no-user.jpg';
import Config from '../../../utils/Config';
import {GetMessages} from '../../../store/Actions/Messages';
import {connect} from 'react-redux';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import moment from 'moment';
import Actions from '../../../store/Actions';
const WebSocket = require('isomorphic-ws');
const width = Dimensions.get('window').width;
import Magazin1 from '../../component/Modal/Magazin1';
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
      next: null,
      fullName: null,
      username: null,
      photo: null,
      userMe: null,
      userMePhoto: null,
      showMagazin: false,
    };
  }
  showMagazin = () => {
    this.setState({showMagazin: true});
  };
  hideMagazin = () => {
    this.setState({showMagazin: false});
  };

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.backButton();
      return true;
    });
    const {otherId, username} = this.props.navigation.getParam('User');
    this.setState({loading: true});
    const {userId, token} = await this.props.SignInReducer;

    try {
      const user = await axiosInstance.get(`api/users/${userId}/`);
      const otherUser = await axiosInstance.get(`api/users/${otherId}/`);
      await this.setState({
        otherUser: otherUser.data,
        user: user.data,
        loading: false,
      });
      await this.getMessages(username);
      /*const profile = user.data.profile;
      this.setState({
        userMe: !userMe ? user.data.username : userMe,
        userMePhoto: userMePhoto
          ? profile.photo.replace(Config.baseURL, '')
          : userMePhoto.replace(Config.baseURL, ''),
        fullName,
        username,
        photo,
        loading: false,
      });*/
    } catch (e) {
      console.log(e);
      this.setState({loading: false});
      ToastAndroid.show(
        'Bir Hata oluştu',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    }
    this.startSocket(username, token);
  };
  async sendProfile(id) {
    console.log(id);
    const user = await axiosInstance.get(`api/users/${id}/`);
    this.props.navigation.navigate('Profile', {items: user.data});
  }
  getMessages = async (username) => {
    try {
      const messages = await axiosInstance.get(
        `chat/messages/?username=${username}`,
      );
      const next = messages.data.next;
      const getMessages = messages.data.results.map((m) => {
        return {
          text: m.message,
          user: {_id: m.username},
          createdAt: m.timestamp,
          _id: m.id,
        };
      });
      this.setState({
        messages: [...getMessages],
        next,
      });
      console.log('getMessages =>', getMessages);
    } catch (e) {}
  };

  onLoadEarlier = async () => {
    const {next} = this.state;
    if (next !== null) {
      this.setState({loading: true});
      try {
        const messages = await axiosInstance.get(next);
        const newNext = messages.data.next;
        const getMessages = messages.data.results.map((m) => {
          return {
            text: m.message,
            user: {_id: m.username},
            createdAt: m.timestamp,
            _id: m.id,
          };
        });
        await this.setState((previousState) => ({
          messages: GiftedChat.prepend(previousState.messages, getMessages),
          next: newNext,
        }));
      } catch (e) {
      } finally {
        this.setState({loading: false});
      }
    }
  };
  hasNumber(myString) {
    return /\d/.test(myString);
  }
  renderBubble = (props) => {
    const photo = this.state.otherUser.profile.photo;
    const userMe = this.state.user.username;
    const userMePhoto = this.state.user.profile.photo;
    const message = props.currentMessage;
    const user = message.user._id === userMe;
    const avatarProfileImage = user ? userMePhoto : photo;
    const uri = Config.baseURL + avatarProfileImage.replace(Config.baseURL, '');
    return this.state.otherUser ? (
      <View style={styles.messageWrapper}>
        <View
          style={[
            styles.messageBox,
            user ? styles.messageRight : styles.messageLeft,
          ]}>
          <Image
            style={[
              styles.messageAvatar,
              user ? {marginLeft: 10} : {marginRight: 10},
            ]}
            source={uri ? {uri} : NoUserImage}
          />
          <View
            style={[
              styles.messageContent,
              {backgroundColor: user ? '#a5d1b1' : '#d4d4d4'},
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>
              {moment(message.createdAt).format('HH:mm:ss')}
            </Text>
          </View>
        </View>
      </View>
    ) : null;
  };

  startSocket = (username, token) => {
    const uri = `https://onappserver.com/ws/chat/${username}/?token=${token}`;

    this.ws = new WebSocket(uri);

    this.ws.onopen = () => console.log('WebSocket Connected');

    this.ws.close = () => console.log('WebSocket Closed');

    this.ws.onmessage = (message) => {
      const newMsg = JSON.parse(message.data);
      if (newMsg.state) {
        this.getMessages(username);
      } else {
        this.showMagazin();
        // this.props.navigation.navigate('Shop');
        // ToastAndroid.show(
        //   'Mesaj hakkınız bitti. Lütfen mağazaya gidin.',
        //   ToastAndroid.CENTER,
        //   ToastAndroid.LONG,
        // );
      }
    };
  };

  sendMessage = async (val) => {
    const commentVal = val.text;
    try {
      await this.ws.send(JSON.stringify({message: commentVal}));
    } catch (e) {
      console.log(e);
      ToastAndroid.show(
        'Bir Hata oluştu',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    }
  };

  renderSend = (items) => {
    return (
      <Send {...items}>
        <View style={styles.commentSave}>
          <Text style={styles.commentSaveText}>Gönder</Text>
        </View>
      </Send>
    );
  };

  backButton = () => {
    this.props.GetMessages();
    this.ws.close();
    this.props.navigation.goBack();
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {messages, loading, user, otherUser} = this.state;
    console.log(this.state);
    console.log('this.state');
    //const user = { _id: userMe };
    const {otherId} = this.props.navigation.getParam('User');
    return (
      <View style={styles.backgroundView}>
        <Magazin1
          show={this.state.showMagazin}
          handleClose={this.hideMagazin}
        />
        <View style={styles.topView}>
          <TouchableOpacity
            style={{
              width: 40,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.backButton}>
            <Image
              style={{width: 30, height: 30, resizeMode: 'contain'}}
              source={require('../../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {otherUser ? otherUser.first_name : null}
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                this.sendProfile(otherId);
              }}>
              <Image
                source={
                  otherUser
                    ? {
                        uri:
                          Config.baseURL +
                          otherUser.profile.photo.replace(Config.baseURL, ''),
                      }
                    : NoUserImage
                }
                style={{width: 50, height: 50, borderRadius: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading && <ActivityIndicator size="large" color="black" />}
        <GiftedChat
          messagesContainerStyle={{paddingTop: 20}}
          alignTop
          placeholder="Mesaj yaz..."
          messages={messages}
          onSend={(message) => this.sendMessage(...message)}
          user={user}
          dateFormat="DD-MM-YYYY"
          timeFormat="HH:mm:ss"
          showUserAvatar
          loadEarlier={this.state.next !== null}
          onLoadEarlier={this.onLoadEarlier}
          renderLoadEarlier={() => (
            <TouchableOpacity
              style={styles.earlier}
              onPress={this.onLoadEarlier}>
              <Text style={styles.earlierText}>Daha Fazla Yükle</Text>
            </TouchableOpacity>
          )}
          isLoadingEarlier={loading}
          renderSend={this.renderSend}
          renderMessage={this.renderBubble}
          text={this.state.messageText}
          onInputTextChanged={(text) => {
            if (!this.hasNumber(text)) {
              this.setState({messageText: text});
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
    MessagesReducer: state.MessagesReducer,
  };
};

const mapDispatchToProps = {
  GetMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
