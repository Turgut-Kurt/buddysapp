import {axiosInstance as api} from '../../../utils/Api';
import {SHOWCASE_PENDING, SHOWCASE_FULFILLED, SHOWCASE_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetShowcase = () => {
  return async dispatch => {
    dispatch(fetchingRequest(SHOWCASE_PENDING));
    try {
      const response = await api.get('api/showvitrin/');
      const payload = await response.data;
      dispatch(fetchingSuccess(SHOWCASE_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(SHOWCASE_REJECTED, error.response.data));
    }
  };
};
