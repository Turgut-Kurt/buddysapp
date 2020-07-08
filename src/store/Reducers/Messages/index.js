import {
  MESSAGES_PENDING,
  MESSAGES_FULFILLED,
  MESSAGES_REJECTED,
} from '../../Actions/Messages/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function Messages(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case MESSAGES_PENDING:
      return {...state, loading: true, data: null, error: null};
    case MESSAGES_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload.results,
        error: null,
      };
    case MESSAGES_REJECTED:
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
