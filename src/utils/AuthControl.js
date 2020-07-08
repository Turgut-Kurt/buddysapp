import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../services/NavigationService';
import store from '../store/index';
import { axiosInstance } from './Api';

const saveToken = async (key, value, isNewUser) => {
  try {
    await AsyncStorage.setItem(
      key,
      key === 'userId' ? JSON.stringify(value) : value,
    );
    await setupAuth(isNewUser);
  } catch (e) {
    console.log(e);
  }
};

const getToken = async (isNewUser) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    if (!token && !userId) {
      NavigationService.navigate('Auth');
      return false;
    }
    if (isNewUser) {
      store.getState().SignInReducer.token = token;
      store.getState().SignInReducer.userId = JSON.parse(userId);
      NavigationService.navigate('AnswerQuestions');
    } else {
      store.getState().SignInReducer.token = token;
      store.getState().SignInReducer.userId = JSON.parse(userId);
      NavigationService.navigate('App');
    }
  } catch (e) {
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    store.getState().SignInReducer.token = null;
    store.getState().SignInReducer.userId = null;
    await setupAuth();
  } catch (e) {
    console.log(e);
  }
};

const setupAuth = async (isNewUser) => {
  await getToken(isNewUser);
};

export default {
  saveToken,
  getToken,
  removeToken,
  setupAuth,
};
