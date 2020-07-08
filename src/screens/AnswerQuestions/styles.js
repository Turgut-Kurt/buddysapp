import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  loadingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  head: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 10,
  },
  backButtonIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headTitle: {
    fontSize: 16,
    color: '#222222',
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222222',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  answerButton: {
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#b9b9b9',
  },
  answerButtonTitle: {
    color: '#949494',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 40,
  },
  answerButtonActivate: {
    backgroundColor: '#7755CD',
    borderColor: '#5b429e',
  },
  answerButtonActivateTitle: {
    color: '#FFFFFF',
  },
  importanceView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  importanceButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  centerBtn: {
    marginHorizontal: 10,
  },
  importanceButtonTitle: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  importanceButtonActivate: {
    backgroundColor: '#F61D45',
  },
  importanceButtonActivateTitle: {
    color: '#FFFFFF',
  },
  finishedQuestionBtn: {
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#F61D45',
    marginTop: 30,
    marginBottom: 40,
  },
  finishedQuestionBtnTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: '#F61D45',
    fontSize: 16,
    marginVertical: 30,
  },
  noAJ: {
    justifyContent: 'flex-start',
  },
});

export default styles;
