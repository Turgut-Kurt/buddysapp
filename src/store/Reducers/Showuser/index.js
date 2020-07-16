import {
  SHOWUSER_PENDING,
  SHOWUSER_FULFILLED,
  SHOWUSER_REJECTED,
} from '../../Actions/Showuser/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function Showcase(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case SHOWUSER_PENDING:
      return {...state, loading: true, data: null, error: null};
    case SHOWUSER_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case SHOWUSER_REJECTED:
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
