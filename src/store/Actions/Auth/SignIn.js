import {axiosInstance as api} from '../../../utils/Api';
import {SIGN_IN_PENDING, SIGN_IN_FULFILLED, SIGN_IN_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';
import jwtDecode from 'jwt-decode';

export const SignIn = (username, password) => {
  return async dispatch => {
    dispatch(fetchingRequest(SIGN_IN_PENDING));
    try {
      const response = await api.post('https://onappserver.com/api/token/', {username, password});
      const payload = await response.data;
      const tokenDecoded = await jwtDecode(payload.access);
      const newPayload = await {
        ...payload,
        userId: tokenDecoded.user_id,
      };
      dispatch(fetchingSuccess(SIGN_IN_FULFILLED, newPayload));
    } catch (error) {
      dispatch(fetchingFailure(SIGN_IN_REJECTED, error.response.data));
    }
  };
};
