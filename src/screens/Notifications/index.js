import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import styles from './styles';
import {axiosInstance} from '../../utils/Api';
import NavigationService from '../../services/NavigationService';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notifications: [],
    };
  }

  componentDidMount = async () => {
    this.setState({loading: true});
    try {
      const notifications = await axiosInstance.get('notifications/');
      this.setState({notifications: notifications.data.results});
      this.setState({loading: false});
    } catch (e) {
      console.log(e);
      this.setState({loading: false});
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButton();
      return true;
    });
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackButton() {
    this.props.navigation.goBack();
    return true;
  }
  userItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.userItemWrapper}
        onPress={() =>
          NavigationService.navigate('Chat', {
            User: {
              username: item.username,
              otherId: item.id,
            },
          })
        }>
        <Image source={{uri: item.image}} style={styles.userItemImage} />
        <View style={styles.userItemContent}>
          <Text style={styles.title}>
            {item.fullname ? item.fullname : item.username} ile eşleştin
          </Text>
          <Text style={styles.description}>Mesaj atmak için tıklayın</Text>
        </View>
      </TouchableOpacity>
    );
  };

  statusItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.userItemWrapper}
        // onPress={() => {NavigationService.navigate('Shop');}}
      >
        <Image source={{uri: item.image}} style={styles.userItemImage} />
        <View style={styles.userItemContent}>
          <Text style={styles.title}>{item.text}</Text>
          <Text style={styles.description}>Vip İndirimi</Text>
        </View>
      </TouchableOpacity>
    );
  };

  textItem = (item, index) => {
    return (
      <TouchableOpacity key={index} style={styles.userItemWrapper}>
        <Image source={{uri: item.image}} style={styles.userItemImage} />
        <View style={styles.userItemContent}>
          <Text style={styles.title}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {loading, notifications} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.backButtonIcon}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.notificationIcon}
            source={require('../../assets/images/notification-red.png')}
          />
          <Text style={styles.notificationTitle}>Duyuru</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : notifications.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.users}
            keyExtractor={(item) => item.text.replace(/\s/g, '')}
            data={notifications}
            renderItem={({item, index}) => {
              return [
                item.username && this.userItem(item, `u_${index}`),
                item.username === null &&
                  item.vip_discount &&
                  this.statusItem(item, `s_${index}`),
                item.username === null &&
                  item.vip_discount === false &&
                  this.textItem(item, `t_${index}`),
              ];
            }}
          />
        ) : (
          <Text style={styles.noNotifications}>
            Şuan da herhangi bir bildiriminiz bulunamadı.
          </Text>
        )}
      </View>
    );
  }
}

export default Notifications;
