import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Questions from '../screens/profile/questions';
import Filter from '../screens/filter/FilterContainer';
import Chat from '../screens/message/chat';
import Settings from '../screens/settings';
import LoginPage from '../screens/login';
import Register from '../screens/register';
import AnswerQuestions from '../screens/AnswerQuestions';
import Notifications from '../screens/Notifications';
import InfoChange from '../screens/InfoChange';
import PassChange from '../screens/PassChange';
import EpostaChange from '../screens/EpostaChange';
import InstagramChange from '../screens/InstagramChange';
import Action from '../screens/action';
import ShopContainer from '../screens/Shop/ShopContainer';
import SolvedQuestions from '../screens/SolvedQuestions';
import ForgotPass from '../screens/forgotPass';

const AppStack = createStackNavigator(
  {
    Home: Home,
    Profile: Profile,
    Questions: Questions,
    Filter: Filter,
    Chat: Chat,
    Settings: Settings,
    AnswerQuestions,
    Notifications,
    EmailChange: EpostaChange,
    InfoChange,
    PassChange,
    InstagramChange,
    Action,
    Shop: ShopContainer,
    SolvedQuestions,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const AuthStack = createStackNavigator(
  {
    SignIn: LoginPage,
    Register: Register,
    ForgotPass: ForgotPass,
    PassChange,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppNavigator = createAppContainer(RootNavigator);

export default AppNavigator;
