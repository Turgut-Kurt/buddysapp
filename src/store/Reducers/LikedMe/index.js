import {
  LIKED_ME_PENDING,
  LIKED_ME_FULFILLED,
  LIKED_ME_REJECTED,
} from '../../Actions/LikedMe/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function LikedMe(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case LIKED_ME_PENDING:
      return {...state, loading: true, data: null, error: null};
    case LIKED_ME_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case LIKED_ME_REJECTED:
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
