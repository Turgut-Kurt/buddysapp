import {
  GIVES_WANTED_ANSWERS_USERS_PENDING,
  GIVES_WANTED_ANSWERS_USERS_FULFILLED,
  GIVES_WANTED_ANSWERS_USERS_REJECTED,
} from '../../Actions/GivesWantedAnswersUsers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function GivesWantedAnswersUsers(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GIVES_WANTED_ANSWERS_USERS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case GIVES_WANTED_ANSWERS_USERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GIVES_WANTED_ANSWERS_USERS_REJECTED:
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
