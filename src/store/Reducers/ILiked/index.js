import {
  I_LIKED_PENDING,
  I_LIKED_FULFILLED,
  I_LIKED_REJECTED,
} from '../../Actions/ILiked/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function ILiked(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case I_LIKED_PENDING:
      return {...state, loading: true, data: null, error: null};
    case I_LIKED_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case I_LIKED_REJECTED:
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
