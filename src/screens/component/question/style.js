import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundView: {
    width: '100%',
    height: 250,
    borderWidth: 2,
    borderColor: '#E299A6',
    marginBottom: 10,
  },
  contentView: {
    padding: 10,
    flex: 1,
  },
  questionView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  answerView: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  meAnswerView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#7755CD',
    borderRadius: 25,
  },
  toAnswerView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F61D45',
    borderRadius: 25,
  },
  edit: {
    height: 30,
    width: '100%',
    backgroundColor: '#7755CD',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default styles;
