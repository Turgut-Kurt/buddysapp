import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  BackHandler
} from 'react-native';
import styles from './styles';
import { axiosInstance } from '../../utils/Api';

class AnswerQuestions extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this)
  }
  state = {
    loading: false,
    error: false,
    questions: null,
    question_id: null,
    user_answer_id: null,
    importance_answer_id: null,
    wanted_answer_id: null,
    requestLoading: false,
    errorAnswer: false,
    successRequest: false,
  };
  handleBackButton() {
    this.props.navigation.goBack()
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButton();
      return true;
    });
    await this.setState({ loading: true });
    const otherUserId = await this.props.navigation.getParam('otherUserId');
    const currentUser = await this.props.navigation.getParam('currentUser');
    const questionId = await this.props.navigation.getParam('questionId');
    const answerQuestionId = await this.props.navigation.getParam(
      'answerQuestionId',
    );
    console.warn(currentUser)
    let url = currentUser
      ? 'questions/showQuestion'
      : questionId
        ? `questions/showQuestion?id=${questionId}`
        : answerQuestionId
          ? `questions/showQuestion?update=True&id=${answerQuestionId}`
          : `questions/answeredByOtherUser?user_id=${otherUserId}`;
    try {
      const questions = await axiosInstance.get(currentUser ? url : 'questions/showQuestion');
      if (questions.data.text === '') {
        ToastAndroid.show(
          'Maalesef, Cevaplanacak Soru Kalmadı.',
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
        this.props.navigation.navigate('Home');
      } else {
        this.setState({
          questions: questions.data,
          question_id: questions.data.id,
          loading: false,
        });
      }
    } catch (e) {
      this.setState({ error: true, loading: false });
      ToastAndroid.show(
        'Maalesef, Cevaplanacak Soru Kalmadı.',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
      //this.props.navigation.navigate('Home')
    }
  };

  requestAnswer = async () => {
    await this.setState({
      requestLoading: true,
      errorAnswer: false,
      successRequest: false,
    });
    const {
      question_id,
      user_answer_id,
      importance_answer_id,
      wanted_answer_id,
    } = this.state;
    try {
      await axiosInstance.post('questions/createAnswert', {
        question_id,
        user_answer_id,
        importance_answer_id,
        wanted_answer_id,
      });
      this.setState({ requestLoading: false, successRequest: true });
    } catch (e) {
      this.setState({ requestLoading: false, errorAnswer: true });
    }
  };

  head = () => (
    <View style={styles.head}>
      {this.backButton()}
      <Text style={styles.headTitle}>İlişki Soruları</Text>
    </View>
  );

  backButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => this.props.navigation.navigate('Home')}>
      <Image
        source={require('../../assets/images/back.png')}
        style={styles.backButtonIcon}
      />
    </TouchableOpacity>
  );

  answerButton = (title, id) => (
    <TouchableOpacity
      onPress={() => this.setState({ user_answer_id: id })}
      key={id}
      style={[
        styles.answerButton,
        this.state.user_answer_id === id && styles.answerButtonActivate,
      ]}>
      <Text
        style={[
          styles.answerButtonTitle,
          this.state.user_answer_id === id && styles.answerButtonActivateTitle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  answerButton2 = (title, id) => (
    <TouchableOpacity
      onPress={() => this.setState({ wanted_answer_id: id })}
      key={id}
      style={[
        styles.answerButton,
        this.state.wanted_answer_id === id && styles.answerButtonActivate,
      ]}>
      <Text
        style={[
          styles.answerButtonTitle,
          this.state.wanted_answer_id === id &&
          styles.answerButtonActivateTitle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  importanceButton = (title, id, index) => (
    <TouchableOpacity
      onPress={() => this.setState({ importance_answer_id: id })}
      key={id}
      style={[
        styles.importanceButton,
        index === 1 && styles.centerBtn,
        this.state.importance_answer_id === id &&
        styles.importanceButtonActivate,
      ]}>
      <Text
        style={[
          styles.importanceButtonTitle,
          this.state.importance_answer_id === id &&
          styles.importanceButtonActivateTitle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  successMessage = () => {
    ToastAndroid.show(
      'Cevabınız Başarılı bir şekilde gönderildi.',
      ToastAndroid.CENTER,
      ToastAndroid.LONG,
    );
    setTimeout(() => {
      if (this.props.navigation.getParam('getFuncRefresh')) {
        this.props.navigation.getParam('getFuncRefresh')();
        console.log(2)
      } else if (this.props.navigation.getParam('nextQuestion')) {
        this.props.navigation.getParam('nextQuestion')();
      }
      else {
        this.props.navigation.navigate('Home');
      }

    }, 2000);
  };

  renderItems = () => {
    const {
      loading,
      error,
      questions,
      requestLoading,
      errorAnswer,
      successRequest,
    } = this.state;
    if (loading) {
      return (
        <View style={[styles.wrapper, styles.loadingWrapper]}>
          <ActivityIndicator size="large" color="#222222" />
        </View>
      );
    }
    if (error) {
      return (
        <View style={[styles.wrapper, styles.loadingWrapper, styles.noAJ]}>
          {this.head()}
        </View>
      );
    }
    if (questions) {
      return (
        <SafeAreaView style={styles.wrapper}>
          {this.head()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <Text style={styles.questionTitle}>{questions.text}</Text>
            {questions.answers.map(a => {
              return this.answerButton(a.answer, a.id);
            })}
            <Text style={styles.questionTitle}>
              {questions.importances.text}
            </Text>
            <View style={styles.importanceView}>
              {questions.importances.answers.map((a, index) =>
                this.importanceButton(a.text, a.id, index),
              )}
            </View>
            <Text style={styles.questionTitle}>İstediğin Cevap</Text>
            {questions.answers.map(a => {
              return this.answerButton2(a.answer, a.id);
            })}
            <TouchableOpacity
              style={styles.finishedQuestionBtn}
              onPress={this.requestAnswer}>
              {requestLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                  <Text style={styles.finishedQuestionBtnTitle}>Tamam</Text>
                )}
            </TouchableOpacity>
            {errorAnswer &&
              ToastAndroid.show(
                'Maalesef, Cevaplanacak Soru Kalmadı.',
                ToastAndroid.CENTER,
                ToastAndroid.LONG,
              )}
            {successRequest && this.successMessage()}
          </ScrollView>
        </SafeAreaView>
      );
    }
  };

  render() {
    return <>{this.renderItems()}</>;
  }
}

export default AnswerQuestions;
