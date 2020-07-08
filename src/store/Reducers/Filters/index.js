import queryString from 'query-string';
import {
  FILTERS_PENDING,
  FILTERS_FULFILLED,
  FILTERS_REJECTED,
  CHANGE_DATA,
} from '../../Actions/Filters/types';

const INITIAL_STATE = {
  filters: '',
  loading: false,
  data: null,
  error: null,
};

export default function Filters(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case 'FILTERS':
      let filters = '';
      const onQueryString = (type, val) => {
        const q = queryString.parse(filters);
        q[type] = `${val}&`;
        return queryString.stringify(q, {encode: false});
      };
      for (let [key, value] of Object.entries(payload)) {
        filters = onQueryString(`${key}`, value.name);
      }
      return {...state, filters};
    case FILTERS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case FILTERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload.results,
        error: null,
      };
    case FILTERS_REJECTED:
      return {
        ...state,
        loading: false,
        data: null,
        error: payload,
      };
    case CHANGE_DATA:
      return {...state, data: payload};
    default:
      return state;
  }
}
