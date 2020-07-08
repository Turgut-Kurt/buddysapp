import {axiosInstance as api} from '../../../utils/Api';
import {MESSAGES_PENDING, MESSAGES_FULFILLED, MESSAGES_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetMessages = () => {
  return async dispatch => {
    dispatch(fetchingRequest(MESSAGES_PENDING));
    try {
      const response = await api.get('chat/threads/');
      const payload = await response.data;
      dispatch(fetchingSuccess(MESSAGES_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(MESSAGES_REJECTED, error.response.data));
    }
  };
};
