import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './style';
import NoUserIcon from '../../../assets/images/no-user.jpg';
import { axiosInstance } from '../../../utils/Api';
import { connect } from 'react-redux';
import NavigationService from '../../../services/NavigationService';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount = async () => {
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

  renderAnswer = () => {
    const { item } = this.props;
    const myAnswer = item.my_answer;
    const userAnswer = item.user_answer;
    const questionId = item.question.id;
    const answers = item.question.answers;
    const myAnswerArray = answers.filter(x => x.id === myAnswer).map(x => x);
    const userAnswerArray = answers
      .filter(x => x.id === userAnswer)
      .map(x => x);
    const mapArray = [...myAnswerArray, ...userAnswerArray];
    return mapArray.map((x, i) => {
      return (
        <View style={styles2.box}>
          <View
            key={x.id.toString()}
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.renderImage(myAnswer, x.id, i)}
            <View style={styles.meAnswerView}>
              <Text style={{ color: 'white' }}>{item.group === 'not_answered' ? 'Görmek için Cevaplayınız.' : x.answer}</Text>
            </View>
          </View>
          {item.group === 'not_answered' && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() =>
                NavigationService.navigate('AnswerQuestions', { questionId })
              }>
              <Text style={{ color: 'white' }}>Cevapla</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  renderImage = (myId, answerId, i) => {
    const { profile } = this.props;
    const { currentUser } = this.state;
    if (currentUser) {
      let image = null;
      if (myId === answerId) {
        if (i === 1) {
          image = profile.photo ? { uri: profile.photo } : NoUserIcon;
        } else {
          image = currentUser.profile.photo
            ? { uri: currentUser.profile.photo }
            : NoUserIcon;
        }
      } else {
        image = profile.photo ? { uri: profile.photo } : NoUserIcon;
      }
      return <Image source={image} style={styles.profile} />;
    }
  };

  render() {
    const { item } = this.props;
    return (
      <View style={styles.backgroundView}>
        <View style={styles.contentView}>
          <View style={styles.questionView}>
            <Text style={styles2.title}>{item.question.text}</Text>
          </View>
          {this.renderAnswer()}
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  box: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#3E3F68',
    fontSize: 16,
  },
  flex: {
    flex: 1,
  },
});
const mapStateToProps = state => {
  return {
    SignInReducer: state.SignInReducer,
  };
};
export default connect(
  mapStateToProps,
  {},
)(QuestionView);
