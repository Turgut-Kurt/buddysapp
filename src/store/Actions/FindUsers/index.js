import { axiosInstance as api } from '../../../utils/Api';
import {
  FIND_USERS_PENDING,
  FIND_USERS_FULFILLED,
  FIND_USERS_REJECTED,
} from './types';
import { fetchingRequest, fetchingSuccess, fetchingFailure } from '../index';

export const GetFindUsers = (distance) => {
  return async dispatch => {
    dispatch(fetchingRequest(FIND_USERS_PENDING));
    try {
      const response = await api.get('action/find-users/?distance=' + distance);
      const payload = await response.data;
      dispatch(fetchingSuccess(FIND_USERS_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(FIND_USERS_REJECTED, error.response.data));
    }
  };
};
