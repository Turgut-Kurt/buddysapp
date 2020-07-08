import { axiosInstance as api } from '../../../utils/Api';
import { LIKED_ME_PENDING, LIKED_ME_FULFILLED, LIKED_ME_REJECTED } from './types';
import { fetchingRequest, fetchingSuccess, fetchingFailure } from '../index';

export const LikedMe = (isNext, next) => {
  return async dispatch => {
    dispatch(fetchingRequest(LIKED_ME_PENDING));
    try {
      const response = isNext ? await api.get(next) : await api.get('action/liked-me/');
      const payload = await response.data;
      dispatch(fetchingSuccess(LIKED_ME_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(LIKED_ME_REJECTED, error.response.data));
    }
  };
};
