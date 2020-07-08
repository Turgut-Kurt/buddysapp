import {
  VIP_PENDING,
  VIP_FULFILLED,
  VIP_REJECTED,
} from '../../Actions/Vip/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function Vip(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case VIP_PENDING:
      return {...state, loading: true, data: null, error: null};
    case VIP_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case VIP_REJECTED:
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
