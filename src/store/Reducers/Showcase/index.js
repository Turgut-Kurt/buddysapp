import {
  SHOWCASE_PENDING,
  SHOWCASE_FULFILLED,
  SHOWCASE_REJECTED,
} from '../../Actions/Showcase/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  next: '',
  error: null,
};

export default function Showcase(state = INITIAL_STATE, action) {
  const {type, payload, next} = action;
  switch (type) {
    case SHOWCASE_PENDING:
      return {...state, loading: true, data: null, error: null, next: ''};
    case SHOWCASE_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        next: next,
        error: null,
      };
    case SHOWCASE_REJECTED:
      return {
        ...state,
        loading: false,
        data: null,
        next: null,
        error: payload,
      };
    default:
      return state;
  }
}
