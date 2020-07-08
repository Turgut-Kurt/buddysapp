import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import Config from '../../../utils/Config';
import NoUserImage from '../../../assets/images/no-user.jpg';
import moment from 'moment';

export default class MessageRow extends React.Component {
  render() {
    const {
      url,
      id,
      username,
      first_name,
      last_name,
      photo,
      message,
      messageTime,
      lastSeen
    } = this.props.item;
    const { onPress } = this.props;
    const isRead = new Date(lastSeen) > new Date(messageTime)
    //const textStyle = isRead ? styles.name : styles.name2;
    return (
      <View style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
        <TouchableOpacity style={styles.backgroundView} onPress={onPress}>
          <Image
            source={photo ? { uri: Config.baseURL + photo } : NoUserImage}
            style={styles.image}
          />
          <View style={styles.infoView}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.name, { fontWeight: isRead ? 'normal' : 'bold' }]}>
                {first_name === ''
                  ? username
                  : `${first_name}`}
              </Text>
              <Text style={styles.message}>
                {moment(messageTime).format('HH:mm')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={{ color: isRead ? '#CDCDCF' : '#000', fontSize: 16, fontWeight: isRead ? 'normal' : 'bold' }}>{message.length > 25 ? message.substring(0, 25) + '...' : message}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
