export const fetchingRequest = type => ({type});

export const fetchingSuccess = (type, json) => ({type, payload: json});

export const fetchingFailure = (type, error) => ({type, payload: error});

export default {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
};
