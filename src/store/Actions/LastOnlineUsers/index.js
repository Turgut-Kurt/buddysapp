import {axiosInstance as api} from '../../../utils/Api';
import {
  LAST_ONLINE_USERS_PENDING,
  LAST_ONLINE_USERS_FULFILLED,
  LAST_ONLINE_USERS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetLastOnlineUsers = () => {
  return async dispatch => {
    dispatch(fetchingRequest(LAST_ONLINE_USERS_PENDING));
    try {
      const response = await api.get('action/last-online-users/');
      const payload = await response.data;
      dispatch(fetchingSuccess(LAST_ONLINE_USERS_FULFILLED, payload));
    } catch (error) {
      dispatch(
        fetchingFailure(LAST_ONLINE_USERS_REJECTED, error.response.data),
      );
    }
  };
};
