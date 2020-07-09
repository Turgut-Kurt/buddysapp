import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import QuestionView from '../../component/question';
import { connect } from 'react-redux';
const screenWidth = Dimensions.get('window').width;
import { GetCheckUserQuestions } from '../../../store/Actions/CheckUserQuestions';
import { axiosInstance } from '../../../utils/Api';
let sameCount: 0, notSameCount: 0, notAnsweredCount: 0;
class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      currentUser: null,
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.navigation.getParam('detail');
    this.props.GetCheckUserQuestions(id);
    const { userId } = await this.props.SignInReducer;
    if (userId) {
      try {
        const user = await axiosInstance.get(`api/users/${userId}/`);
        this.setState({
          currentUser: user.data,
        });
      } catch (e) { }
    }
  };

  pageChange = index => {
    this.setState({ pageIndex: index });
    this._scrollView.scrollTo({ x: screenWidth * index });
  };

  renderUserQuestions = (loading, error, data) => {
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={40} />
        </View>
      );
    }
    if (error) {
      return <Text>Bir hata oluştu.</Text>;
    }
    if (data) {
      const sameArray = data.filter(x => x.group === 'same');
      const notSameArray = data.filter(x => x.group === 'not_same');
      const notAnsweredArray = data.filter(x => x.group === 'not_answered');
      sameCount = sameArray.length;
      notSameCount = notSameArray.length;
      notAnsweredCount = notAnsweredArray.length;
      return [
        this.renderFlatList(sameArray, 'same'),
        this.renderFlatList(notSameArray, 'notSame'),
        this.renderFlatList(notAnsweredArray, 'notAnswered'),
      ];
    }
  };

  renderFlatList = (data, title) => {
    const { profile } = this.props.navigation.getParam('detail');
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.tabPage}
        renderItem={({ item }) => (
          <QuestionView
            item={item}
            profile={profile}
            key={`${title}_${item.id}`}
          />
        )}
      />
    );
  };

  renderCurrentUser = () => {
    const {
      first_name,
      last_name,
      username,
      similar_rate,
    } = this.props.navigation.getParam('detail');
    const fullName = first_name ? `${first_name} ${last_name}` : username;
    return (
      <>
        <Text style={styles.titleText}>{fullName}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={styles.percentText}>{Math.ceil(similar_rate)}%</Text>
        </View>
      </>
    );
  };

  render() {
    const { goBack } = this.props.navigation;
    const { loading, error, data } = this.props.CheckUserQuestionsReducer;
    const pageIndex = this.state.pageIndex;
    return (
      <View style={styles.backgroundView}>
        <View style={styles.topView}>
          <TouchableOpacity
            style={{
              width: 75,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              goBack();
            }}>
            <Image
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
              source={require('../../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../../../assets/images/user.png')}
          />
          {this.renderCurrentUser()}
        </View>
        <View style={styles.actionsView}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={pageIndex === 0 ? styles.buttonSelected : styles.button}
              onPress={() => {
                this.pageChange(0);
              }}>
              <Image
                source={
                  pageIndex === 0
                    ? require('../../../assets/images/like_white.png')
                    : require('../../../assets/images/like.png')
                }
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15 }}>
              {sameCount ? sameCount : ''}
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={pageIndex === 1 ? styles.buttonSelected : styles.button}
              onPress={() => {
                this.pageChange(1);
              }}>
              <Image
                source={
                  pageIndex === 1
                    ? require('../../../assets/images/notLikeWhite.png')
                    : require('../../../assets/images/notLike.png')
                }
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15 }}>
              {notSameCount ? notSameCount : ''}
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={pageIndex === 2 ? styles.buttonSelected : styles.button}
              onPress={() => {
                this.pageChange(2);
              }}>
              <Image
                source={
                  pageIndex === 2
                    ? require('../../../assets/images/star.png')
                    : require('../../../assets/images/star2.png')
                }
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15 }}>
              {notAnsweredCount ? notAnsweredCount : ''}
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
            marginBottom: 10,
          }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={elem => {
            let info = elem.nativeEvent.contentOffset.x;
            const index = Math.round(info / screenWidth);
            this.setState({ pageIndex: index });
          }}
          ref={node => (this._scrollView = node)}>
          {this.renderUserQuestions(loading, error, data)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
    CheckUserQuestionsReducer: state.CheckUserQuestionsReducer,
  };
};

const mapDispatchToProps = {
  GetCheckUserQuestions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
