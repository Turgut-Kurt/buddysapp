import {
  LAST_ONLINE_USERS_PENDING,
  LAST_ONLINE_USERS_FULFILLED,
  LAST_ONLINE_USERS_REJECTED,
} from '../../Actions/LastOnlineUsers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function LastOnlineUsers(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case LAST_ONLINE_USERS_PENDING:
      return { ...state, loading: true, data: null, error: null };
    case LAST_ONLINE_USERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case LAST_ONLINE_USERS_REJECTED:
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
