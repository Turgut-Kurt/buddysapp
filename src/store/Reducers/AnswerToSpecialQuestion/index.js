import {
  ANSWER_TO_SPECIAL_QUESTIONS_PENDING,
  ANSWER_TO_SPECIAL_QUESTIONS_FULFILLED,
  ANSWER_TO_SPECIAL_QUESTIONS_REJECTED,
} from '../../Actions/AnswerToSpecialQuestion/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function AnswerToSpecialQuestion(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case ANSWER_TO_SPECIAL_QUESTIONS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case ANSWER_TO_SPECIAL_QUESTIONS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case ANSWER_TO_SPECIAL_QUESTIONS_REJECTED:
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
