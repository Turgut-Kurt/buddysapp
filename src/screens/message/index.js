import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './style';
import MessageRow from '../component/message';
import { connect } from 'react-redux';
import { GetMessages } from '../../store/Actions/Messages';
import { axiosInstance } from '../../utils/Api';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
class Message extends React.Component {
  constructor(props) {
    super(props);
    //OneSignal.init("88db3296-4c3a-46dc-84ea-5efea2f30203", { kOSSettingsKeyAutoPrompt: true });
    this.state = {
      lastSeen: ''
    }

  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('lastSeen')
    if (value != null) {
      const val = JSON.parse(value)
      const day = val.split('T')[0]
      const hour = val.split('T')[1]
      const splittedDay = day.split('-')
      const splittedHour = hour.split(':')
      await this.setState({ lastSeen: new Date(splittedDay[0], parseInt(splittedDay[1]) - 1, parseInt(splittedDay[2]), parseInt(splittedHour[0]), parseInt(splittedHour[1]), 0, 0) })
    } else {
      await this.setState({ lastSeen: new Date(2019, 0, 0, 0, 0, 0, 0) })
    }
    AsyncStorage.setItem('lastSeen', JSON.stringify(new Date(new Date().setHours(new Date().getHours() + 3))))
    this.props.GetMessages();
    OneSignal.clearOneSignalNotifications()
  }

  removeChat = async id => {
    try {
      await axiosInstance.get(`chat/threads/delete?id=${id}`);
      this.props.GetMessages();
    } catch (e) {
      console.log('Silinemedi');
    }
  };

  renderMessages = (loading, error, data, userId, token) => {
    if (loading) {
      return <ActivityIndicator size={40} />;
    }
    if (error) {
      return <Text>Bir Hata Oluştu</Text>;
    }
    if (data) {
      let newData = [];
      data.map(x => {
        const messageID = x.id;
        const message = x.last_message;
        const messageTime = x.updated;
        const first = x.first;
        const second = x.second;
        if (x.first.id !== userId) {
          newData.push({
            ...first,
            message,
            messageID,
            messageTime,
            currentUsername: second.username,
            currentPhoto: second.photo,
            lastSeen: moment(this.state.lastSeen).format()
          });
        }
        if (x.second.id !== userId) {
          newData.push({
            ...second,
            message,
            messageID,
            messageTime,
            currentUsername: first.username,
            currentPhoto: first.photo,
            lastSeen: moment(this.state.lastSeen).format()
          });
        }
      });
      return (
        <SwipeListView
          data={newData}
          style={{ width: '100%', flex: 1 }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <MessageRow
                key={item.id.toString()}
                item={item}
                onPress={() => {
                  this.props.navigation.navigate('Chat', {
                    User: {
                      username: item.username,
                      otherId: item.id,
                    },
                  })
                }
                }
              />
            );
          }}
          renderHiddenItem={({ item }, rowMap) => (
            <View style={styles.rowBack} key={item.toString()}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.removeChat(item.messageID)}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require('../../assets/images/trashcan.png')}
                />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-100}
        />
      );
    }
  };

  render() {
    const { userId, token } = this.props.SignInReducer;
    const { loading, error, data } = this.props.MessagesReducer;
    //data ? console.log(new Date(data[0].updated)) : null
    //console.log(new Date())
    return (
      <View style={styles.backgroundView}>
        <View style={styles.topView}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../../assets/images/message.png')}
          />
          <Text style={styles.titleText}>Mesajlar</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={this.props.GetMessages}
              style={styles.newMessageButton}>
              <Image
                style={styles.refresh}
                source={require('../../assets/images/refresh.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '100%', flex: 1, paddingVertical: 20 }}>
          {this.renderMessages(loading, error, data, userId, token)}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
    MessagesReducer: state.MessagesReducer,
  };
};

const mapDispatchToProps = {
  GetMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
