import {axiosInstance as api} from '../../../utils/Api';
import {LIKE_PENDING, LIKE_FULFILLED, LIKE_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const Like = id => {
  return async dispatch => {
    dispatch(fetchingRequest(LIKE_PENDING));
    try {
      const response = await api.post('action/like/', {user_id: id});
      const payload = await response.data;
      dispatch(fetchingSuccess(LIKE_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(LIKE_REJECTED, error.response.data));
    }
  };
};
