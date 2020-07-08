import {
  CHECK_USER_QUESTIONS_PENDING,
  CHECK_USER_QUESTIONS_FULFILLED,
  CHECK_USER_QUESTIONS_REJECTED,
} from '../../Actions/CheckUserQuestions/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function CheckUserQuestions(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case CHECK_USER_QUESTIONS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case CHECK_USER_QUESTIONS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case CHECK_USER_QUESTIONS_REJECTED:
      return {
        ...state,
        loading: false,
        data: null,
        error: payload,
      };
    default:
      return state;
  }
}
