 import {axiosInstance as api} from '../../../utils/Api';
import {SHOWUSER_PENDING, SHOWUSER_FULFILLED, SHOWUSER_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetShowuser = () => {
  return async dispatch => {
    dispatch(fetchingRequest(SHOWUSER_PENDING));
    try {
      const response = await api.get('api/showusers/?vitrin=True');
      const payload = await response.data.results;
      dispatch(fetchingSuccess(SHOWUSER_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(SHOWUSER_REJECTED, error.response.data));
    }
  };
};
