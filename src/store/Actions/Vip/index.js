import {axiosInstance as api} from '../../../utils/Api';
import {VIP_PENDING, VIP_FULFILLED, VIP_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetVip = () => {
  return async dispatch => {
    dispatch(fetchingRequest(VIP_PENDING));
    try {
      const response = await api.get('action/find-users/?vip=true');
      const payload = await response.data;
      dispatch(fetchingSuccess(VIP_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(VIP_REJECTED, error.response.data));
    }
  };
};
