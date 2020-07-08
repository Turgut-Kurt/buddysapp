import { axiosInstance as api } from '../../../utils/Api';
import {
  FILTERS_PENDING,
  FILTERS_FULFILLED,
  FILTERS_REJECTED,
  FILTERS,
  CHANGE_DATA,
} from './types';
import { fetchingRequest, fetchingSuccess, fetchingFailure } from '../index';
import AsyncStorage from '@react-native-community/async-storage';

export const GetFilters = (filters, isStore) => {
  return async dispatch => {
    dispatch(fetchingRequest(FILTERS_PENDING));
    try {
      if (isStore) {
        let filter = await this.getFilter()
        console.log(filter)
        console.log('-------------------')
        const response = await api.get(`action/filter-users/?${filter}`);
        const payload = await response.data;
        dispatch(fetchingSuccess(FILTERS_FULFILLED, payload));
      } else {
        const response = await api.get(`action/filter-users/?${filters}`);
        const payload = await response.data;
        dispatch(fetchingSuccess(FILTERS_FULFILLED, payload));
      }
    } catch (error) {
      dispatch(fetchingFailure(FILTERS_REJECTED, error.response.data));
    }
  };
};

export const Filters = filters => {
  return async dispatch => {
    dispatch(fetchingSuccess(FILTERS, filters));
  };
};

export const ChangeData = data => {
  console.log(data);
  return async dispatch => {
    dispatch(fetchingSuccess(CHANGE_DATA, data));
  };
};
getFilter = async () => {
  return await AsyncStorage.getItem("filter");
};