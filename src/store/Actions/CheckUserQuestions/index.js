import {axiosInstance as api} from '../../../utils/Api';
import {
  CHECK_USER_QUESTIONS_PENDING,
  CHECK_USER_QUESTIONS_FULFILLED,
  CHECK_USER_QUESTIONS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetCheckUserQuestions = id => {
  return async dispatch => {
    dispatch(fetchingRequest(CHECK_USER_QUESTIONS_PENDING));
    try {
      const response = await api.get(
        `questions/checkUserQuestions?user_id=${id}`,
      );
      const payload = await response.data;
      dispatch(fetchingSuccess(CHECK_USER_QUESTIONS_FULFILLED, payload));
    } catch (error) {
      dispatch(
        fetchingFailure(CHECK_USER_QUESTIONS_REJECTED, error.response.data),
      );
    }
  };
};
