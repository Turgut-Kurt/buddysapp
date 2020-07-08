import {axiosInstance as api} from '../../../utils/Api';
import {
  ANSWER_TO_SPECIAL_QUESTIONS_PENDING,
  ANSWER_TO_SPECIAL_QUESTIONS_FULFILLED,
  ANSWER_TO_SPECIAL_QUESTIONS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetAnswerToSpecialQuestion = () => {
  return async dispatch => {
    dispatch(fetchingRequest(ANSWER_TO_SPECIAL_QUESTIONS_PENDING));
    try {
      const response = await api.get(
        'action/find-users/?answer-to-special-question=True/',
      );
      const payload = await response.data;
      dispatch(fetchingSuccess(ANSWER_TO_SPECIAL_QUESTIONS_FULFILLED, payload));
    } catch (error) {
      dispatch(
        fetchingFailure(
          ANSWER_TO_SPECIAL_QUESTIONS_REJECTED,
          error.response.data,
        ),
      );
    }
  };
};
