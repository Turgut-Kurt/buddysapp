import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler
} from 'react-native';
import styles from './styles';
import { axiosInstance } from '../../utils/Api';
import NavigationService from '../../services/NavigationService';

class SolvedQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentDidMount = () => {
    this.getSolvedQuestions();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButton();
      return true;
    });
  };
  handleBackButton() {
    this.props.navigation.goBack()
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  getSolvedQuestions = async () => {
    try {
      const getQuestions = await axiosInstance.get('questions/myquestions');
      this.setState({ data: getQuestions.data });
    } catch (e) {
      console.log(e);
    }
  };

  renderAnswer = item => {
    const myAnswer = item.my_answer;
    const questionId = item.question.id;
    const questionText = item.question.text;
    const answers = item.question.answers;
    const myAnswerArray = answers.filter(x => x.id === myAnswer).map(x => x);
    return this.renderQuestion(questionText, myAnswerArray, questionId);
  };

  renderQuestion = (title, data, answerQuestionId) => (
    <View
      style={styles.contentView}
      key={title
        .replace(/\s/g, '')
        .toLowerCase()
        .toString()}>
      <View style={styles.questionView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {data.map((x, i) => {
        return (
          <View style={styles.box} key={i.toString()}>
            <View style={styles.meAnswerView}>
              <Text style={{ color: 'white' }}>{x.answer}</Text>
            </View>
            <TouchableOpacity
              style={styles.edit}
              onPress={() =>
                NavigationService.navigate('AnswerQuestions', {
                  answerQuestionId,
                  getFuncRefresh: () => this.getSolvedQuestions(),
                })
              }>
              <Text style={{ color: 'white' }}>Değiştir</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.backButtonIcon}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Çözdüğüm Sorular</Text>
        </View>
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listWrapper}
            renderItem={({ item }) => this.renderAnswer(item)}
          />
        ) : (
            <Text style={styles.noSolvedText}>
              Henüz çözülmüş sorunuz hiç bulunamadı.
            </Text>
          )}
      </SafeAreaView>
    );
  }
}

export default SolvedQuestions;
