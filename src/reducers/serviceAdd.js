import {
  CHANGE_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE
} from '../actions/actionTypes'

const initialState = {
  item: {
    id: '',
    name: '',
    price: '',
    content: ''
  },
  loading: false,
  error: null,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_SERVICE_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case ADD_SERVICE_SUCCESS:
      return {...initialState};
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const { item } = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        }
      };
    case FETCH_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }
    case FETCH_SERVICE_FAILURE:
      const {serviceError} = action.payload;
      return {
        ...state,
        loading: false,
        error: serviceError
      }
    default:
      return state;
  }
}
