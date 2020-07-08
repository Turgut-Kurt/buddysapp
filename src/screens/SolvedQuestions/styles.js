import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 50,
    height: 50,
    padding: 10,
  },
  backButtonIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: '#3E3F68',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 20,
    marginLeft: 20,
  },
  listWrapper: {
    paddingHorizontal: 20,
  },
  contentView: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E299A6',
    marginBottom: 20,
  },
  questionView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: '#3E3F68',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
  },
  box: {
    width: '100%',
    alignItems: 'center',
  },
  meAnswerView: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#7755CD',
    borderRadius: 30,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  edit: {
    width: '100%',
    height: 30,
    backgroundColor: '#7755CD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSolvedText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7755CD',
    paddingVertical: 30,
  },
});

export default styles;
