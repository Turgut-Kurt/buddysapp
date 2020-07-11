import {axiosInstance as api} from '../../../utils/Api';
import {SHOWCASE_PENDING, SHOWCASE_FULFILLED, SHOWCASE_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetShowcase = () => {
  return async (dispatch) => {
    dispatch(fetchingRequest(SHOWCASE_PENDING));
    try {
      const response = await api.get('api/showusers/?user=True');
      const payload = await response.data.results; //response.data.next
      const next = await response.data.next;
      console.log(
        '***************************** PAYLOAD ************************************',
        payload,
      );
      console.log('*********************NEXT**************************', next);
      dispatch(fetchingSuccess(SHOWCASE_FULFILLED, payload, next));
    } catch (error) {
      dispatch(fetchingFailure(SHOWCASE_REJECTED, error.response.data));
    }
  };
};
