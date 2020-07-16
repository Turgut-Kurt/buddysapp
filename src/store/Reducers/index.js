import { combineReducers } from 'redux';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import GivesWantedAnswersUsers from './GivesWantedAnswersUsers';
import FindUsers from './FindUsers';
import LastOnlineUsers from './LastOnlineUsers';
import LikedMe from './LikedMe';
import ILiked from './ILiked';
import Like from './Like';
import Vip from './Vip';
import Showcase from './Showcase';
import Showuser from './Showuser';
import AnswerToSpecialQuestion from './AnswerToSpecialQuestion';
import Messages from './Messages';
import CheckUserQuestions from './CheckUserQuestions';
import Filters from './Filters';

export default combineReducers({
  SignInReducer: SignIn,
  SignUpReducer: SignUp,
  GivesWantedAnswersUsersReducer: GivesWantedAnswersUsers,
  FindUsersReducer: FindUsers,
  //LastOnlineUsersReducer: LastOnlineUsers,
  LikedMeReducer: LikedMe,
  ILikedReducer: ILiked,
  LikeReducer: Like,
  VipReducer: Vip,
  ShowcaseReducer: Showcase,
  ShowuserReducer: Showuser,
  AnswerToSpecialQuestionReducer: AnswerToSpecialQuestion,
  MessagesReducer: Messages,
  CheckUserQuestionsReducer: CheckUserQuestions,
  FiltersReducer: Filters,
});
