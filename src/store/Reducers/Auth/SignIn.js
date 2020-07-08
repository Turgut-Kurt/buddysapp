import {
  SIGN_IN_PENDING,
  SIGN_IN_FULFILLED,
  SIGN_IN_REJECTED,
} from '../../Actions/Auth/types';

const INITIAL_STATE = {
  loading: false,
  token: null,
  userId: null,
  error: null,
  filtersUserFunc: null,
};

export default function SignIn(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case SIGN_IN_PENDING:
      return {...state, loading: true, token: null, userId: null, error: null};
    case SIGN_IN_FULFILLED:
      return {
        ...state,
        loading: false,
        token: payload.access,
        userId: payload.userId,
        error: null,
      };
    case SIGN_IN_REJECTED:
      return {
        ...state,
        loading: false,
        token: null,
        userId: null,
        error: payload,
      };
    default:
      return state;
  }
}
