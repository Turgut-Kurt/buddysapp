import {axiosInstance as api} from '../../../utils/Api';
import {
  GIVES_WANTED_ANSWERS_USERS_PENDING,
  GIVES_WANTED_ANSWERS_USERS_FULFILLED,
  GIVES_WANTED_ANSWERS_USERS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetGivesWantedAnswersUsers = () => {
  return async dispatch => {
    dispatch(fetchingRequest(GIVES_WANTED_ANSWERS_USERS_PENDING));
    try {
      const response = await api.get('action/gives-wanted-answers-users/');
      const payload = await response.data;
      dispatch(fetchingSuccess(GIVES_WANTED_ANSWERS_USERS_FULFILLED, payload));
    } catch (error) {
      dispatch(
        fetchingFailure(
          GIVES_WANTED_ANSWERS_USERS_REJECTED,
          error.response.data,
        ),
      );
    }
  };
};
