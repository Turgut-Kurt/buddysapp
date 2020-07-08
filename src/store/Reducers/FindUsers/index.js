import {
  FIND_USERS_PENDING,
  FIND_USERS_FULFILLED,
  FIND_USERS_REJECTED,
} from '../../Actions/FindUsers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function FindUsers(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case FIND_USERS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case FIND_USERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case FIND_USERS_REJECTED:
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
