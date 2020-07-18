import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import styles from './style';
import ZeyTap from '../slider';
import Trend from '../trend';
import Like from '../like';
import Action from '../action';
import Message from '../message';
import Profile from '../profile';
import {connect} from 'react-redux';
import {GetFilters, ChangeData} from '../../store/Actions/Filters';
import OneSignal from 'react-native-onesignal';
import {axiosInstance} from '../../utils/Api';
import Geolocation from 'react-native-geolocation-service';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagePage: false,
      profilePage: false,
      actionPage: false,
      likePage: false,
      trendPage: true,
      token: null,
      location: '',
      loca: '',
    };
    OneSignal.init('88db3296-4c3a-46dc-84ea-5efea2f30203', {
      kOSSettingsKeyAutoPrompt: true,
    });
    this.onIds = this.onIds.bind(this);
    this.setNotif = this.setNotif.bind(this);
    this.onOpened = this.onOpened.bind(this);
  }
  componentWillUnmount() {
    OneSignal.inFocusDisplaying(0);
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    if (openResult.notification.payload.additionalData) {
      if (openResult.notification.payload.additionalData.pagename == 'magaza') {
        this.props.navigation.navigate('Shop');
      } else if (
        openResult.notification.payload.additionalData.pagename == 'chat'
      ) {
        this.props.navigation.navigate('Chat', {
          User: {
            username:
              openResult.notification.payload.additionalData.payload.username,
            otherId:
              openResult.notification.payload.additionalData.payload.other_id,
          },
        });
      } else if (
        openResult.notification.payload.additionalData.pagename == 'profile'
      ) {
        this.props.navigation.navigate('Profile');
      }
    }
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    this.setNotif(device.userId);
  }

  componentDidMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
    this.setLocation();
  }
  setNotif = async (notifToken) => {
    const {userId} = this.props.SignInReducer;
    let form = new FormData();

    try {
      await Geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          form.append('_method', 'patch');
          form.append(
            'profile.location',
            `SRID=4326;POINT(${coords.longitude} ${coords.latitude})`,
          );
          form.append('profile.notification_token', notifToken);

          axiosInstance.patch(`api/users/${userId}/`, form);
        },
        (error) => {
          console.log(error.code, error.message);
        },
      );
      const user = await axiosInstance.get(`api/users/${userId}/`);
      console.log(user.data);
      console.log('user.data');
      if (!user.data.email && user.data.email == '') {
        this.props.navigation.navigate('EmailChange');
      }
    } catch {}
  };
  setLocation = async () => {
    const {userId} = this.props.SignInReducer;
    let form = new FormData();
    try {
      await Geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          form.append('_method', 'patch');
          form.append(
            'profile.location',
            `SRID=4326;POINT(${coords.longitude} ${coords.latitude})`,
          );
          axiosInstance.patch(`api/users/${userId}/`, form);
        },
        (error) => {
          console.log(error.code, error.message);
        },
      );
    } catch {}
  };
  pageChange = async (index) => {
    if (index === 2) {
      this.props.GetFilters(this.props.FiltersReducer.filters, true);
    }
    this.setState({
      trendPage: index === 0 ? true : false,
      likePage: index === 1 ? true : false,
      actionPage: index === 2 ? true : false,
      messagePage: index === 3 ? true : false,
      profilePage: index === 4 ? true : false,
    });
  };

  renderAction = (loading, error, data) => {
    if (loading) {
      return <ActivityIndicator size={40} />;
    }
    if (error) {
      return (
        <Text style={{textAlign: 'center', padding: 10, fontSize: 20}}>
          Bir hata oluştu.
        </Text>
      );
    }
    if (data) {
      return <Action slides={data.length > 0 ? data : []} />;
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const {FiltersReducer} = this.props;
    console.log(FiltersReducer);
    const {
      messagePage,
      profilePage,
      actionPage,
      likePage,
      trendPage,
    } = this.state;
    return (
      <View style={styles.backgroundView}>
        <ZeyTap
          navBar={true}
          style={{
            width: '100%',
            flex: 1,
          }}
          scrollEnabled={false}
          ref={(node) => (this._zeyTab = node)}
          getIndex={this.pageChange}>
          <View
            style={styles.tabPage}
            name="Sayfa 1"
            status={true}
            onImage={require('../../assets/images/home.png')}
            offImage={require('../../assets/images/home.png')}>
            <View style={styles.topView}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/images/home.png')}
              />
              <Text style={styles.titleText}>Keşfet</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.filterButton, {marginRight: 10}]}
                  onPress={() => {
                    navigate('Notifications');
                  }}>
                  <Image
                    style={styles.filterIcon}
                    source={require('../../assets/images/notification.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {trendPage && <Trend />}
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 2"
            status={false}
            onImage={require('../../assets/images/like.png')}
            offImage={require('../../assets/images/like.png')}
            text="">
            {likePage && <Like />}
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 3"
            status={false}
            onImage={require('../../assets/images/action.png')}
            offImage={require('../../assets/images/action.png')}>
            {actionPage &&
              this.renderAction(
                FiltersReducer.loading,
                FiltersReducer.error,
                Array.isArray(FiltersReducer.data)
                  ? FiltersReducer.data.slice(
                      0,
                      FiltersReducer.data.length > 10
                        ? 10
                        : FiltersReducer.data.length,
                    )
                  : FiltersReducer.data,
              )}
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 4"
            status={false}
            onImage={require('../../assets/images/message.png')}
            offImage={require('../../assets/images/message.png')}>
            {messagePage && <Message navigation={this.props.navigation} />}
          </View>
          <View
            style={styles.tabPage}
            name="Sayfa 5"
            status={false}
            onImage={require('../../assets/images/user.png')}
            offImage={require('../../assets/images/user.png')}>
            {profilePage && <Profile navigation={this.props.navigation} />}
          </View>
        </ZeyTap>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FiltersReducer: state.FiltersReducer,
    SignInReducer: state.SignInReducer,
  };
};
const mapDispatchToProps = {
  GetFilters,
  ChangeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
