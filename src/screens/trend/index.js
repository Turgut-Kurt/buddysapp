import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from './style';
import Profile from '../component/profile';
import ProfileTab2 from '../component/profileTab2';
import {connect} from 'react-redux';
import {GetVip} from '../../store/Actions/Vip';
import {GetShowcase} from '../../store/Actions/Showcase';
import {GetGivesWantedAnswersUsers} from '../../store/Actions/GivesWantedAnswersUsers';
import {GetFindUsers} from '../../store/Actions/FindUsers';
import {GetLastOnlineUsers} from '../../store/Actions/LastOnlineUsers';
import {GetAnswerToSpecialQuestion} from '../../store/Actions/AnswerToSpecialQuestion';
import {axiosInstance} from '../../utils/Api';
import NavigationService from '../../services/NavigationService';

class Trend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vip: null,
      list: props.ShowcaseReducer.data,
    };
  }

  componentDidMount = async () => {
    const {userId} = this.props.SignInReducer;
    const {next: n0, data: d0} = this.props.ShowcaseReducer;
    // this.setState({list: d0});
    await this.getCurrentUser(userId);
    await this.props.GetShowcase();
    await this.props.GetGivesWantedAnswersUsers();
    let distance = await this.getDistance();
    await this.props.GetFindUsers(
      distance == null || distance || distance == undefined ? '100' : distance,
    );
    await this.props.GetAnswerToSpecialQuestion();
    // await this.props.GetLastOnlineUsers();
  };

  getCurrentUser = async (userId) => {
    try {
      const user = await axiosInstance.get(`api/users/${userId}/`);
      this.setState({vip: user.data.is_vip});
    } catch (e) {
      console.log(e);
    }
  };

  renderItems = (loading, error, data, type) => {
    const {vip} = this.state;
    if (loading) {
      return <ActivityIndicator size={40} />;
    }
    if (error) {
      return <Text>Bir Hata Oluştu</Text>;
    }
    if (data) {
      if (data.length > 0) {
        return (
          <View style={styles.Container}>
            <FlatList
              nestedScrollEnabled
              style={styles.flatStyle}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              data={data}
              onEndReached={this.getMoreUsers}
              onEndReachedThreshold={0.5}
              renderItem={({item, index}) => (
                <ProfileTab2
                  key={`${type}_${index}`}
                  {...item}
                  type={type}
                  vip={vip}
                />
              )}
            />
          </View>
        );
      } else {
        return <></>;
      }
    }
  };
  getDistance = async () => {
    return await AsyncStorage.getItem('distance');
  };

  getMoreUsers = async () => {
    const {next: n0, data: d0} = this.props.ShowcaseReducer;
    const splitUrl = n0.split('/');
    console.log('split', splitUrl);
    let url = splitUrl[3] + '/' + splitUrl[4] + '/' + splitUrl[5];
    console.log('URL', url);
    const user = await axiosInstance.get(url);
    this.setState({list: [...d0, ...user.data.results]});
    console.log('MORE', user);
  };

  render() {
    //const {loading: l0, error: e0, data: d0} = this.props.VipReducer;
    const {
      loading: l0,
      error: e0,
      data: d0,
      next: n0,
    } = this.props.ShowcaseReducer;
    console.log('TREND NEXT', n0);
    /*const {
      loading: l1,
      error: e1,
      data: d1,
    } = this.props.GivesWantedAnswersUsersReducer;
    const {loading: l2, error: e2, data: d2} = this.props.FindUsersReducer;
    console.log(d2);
    const {
      loading: l3,
      error: e3,
      data: d3,
    } = this.props.AnswerToSpecialQuestionReducer;*/
    /*const {
      loading: l4,
      error: e4,
      data: d4,
    } = this.props.LastOnlineUsersReducer;*/
    return (
      <View>{this.renderItems(l0, e0, this.state.list, 'Showcase')}</View>
      // <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>

      // </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SignInReducer: state.SignInReducer,
    VipReducer: state.VipReducer,
    ShowcaseReducer: state.ShowcaseReducer,
    GivesWantedAnswersUsersReducer: state.GivesWantedAnswersUsersReducer,
    FindUsersReducer: state.FindUsersReducer,
    AnswerToSpecialQuestionReducer: state.AnswerToSpecialQuestionReducer,
    LastOnlineUsersReducer: state.LastOnlineUsersReducer,
  };
};

const mapDispatchToProps = {
  GetVip,
  GetGivesWantedAnswersUsers,
  GetFindUsers,
  GetAnswerToSpecialQuestion,
  //GetLastOnlineUsers,
  GetShowcase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trend);
