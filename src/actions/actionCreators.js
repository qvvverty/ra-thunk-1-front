import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE
  // REMOVE_SERVICE,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = error => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const fetchServiceRequest = () => ({
  type: FETCH_SERVICE_REQUEST
});

export const fetchServiceSuccess = () => ({
  type: FETCH_SERVICE_SUCCESS,
});

export const fetchServiceFailure = serviceError => ({
  type: FETCH_SERVICE_FAILURE,
  payload: {
    serviceError,
  }
});

// export const removeService = id => ({
//   type: REMOVE_SERVICE,
//   payload: {
//     id,
//   },
// });

export const removeService = async (dispatch, id) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {method: 'DELETE'});
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  } finally {
    fetchServices(dispatch);
  }
};

export const fetchServices = async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
}

export const fetchService = async (dispatch, id) => {
  dispatch(fetchServiceRequest());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/' + id);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const service = await response.json();
    console.log(service);
    for (const field in service) {
      if (field !== 'id') {
        dispatch(changeServiceField(field, service[field]));
      }
    }
    dispatch(fetchServiceSuccess());
  } catch (e) {
    dispatch(fetchServiceFailure(e.message));
  }
}

export const addService = async (dispatch, name, price) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  fetchServices(dispatch);
}

export const editService = async (dispatch, historyAPI, item) => {
  dispatch(fetchServiceRequest());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(fetchServiceSuccess());
    historyAPI.push('/services');
  } catch (e) {
    dispatch(fetchServiceFailure(e.message));
  }
}
