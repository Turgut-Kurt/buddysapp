import {
  LIKE_PENDING,
  LIKE_FULFILLED,
  LIKE_REJECTED,
} from '../../Actions/Like/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function Like(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case LIKE_PENDING:
      return {...state, loading: true, data: null, error: null};
    case LIKE_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case LIKE_REJECTED:
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
