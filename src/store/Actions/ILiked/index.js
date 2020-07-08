import { axiosInstance as api } from '../../../utils/Api';
import { I_LIKED_PENDING, I_LIKED_FULFILLED, I_LIKED_REJECTED } from './types';
import { fetchingRequest, fetchingSuccess, fetchingFailure } from '../index';

export const ILiked = (isNext, next) => {
  return async dispatch => {
    dispatch(fetchingRequest(I_LIKED_PENDING));
    try {
      const response = isNext ? await api.get(next) : await api.get('action/i-liked/');
      const payload = await response.data;
      dispatch(fetchingSuccess(I_LIKED_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(I_LIKED_REJECTED, error.response.data));
    }
  };
};
