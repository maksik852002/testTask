import {GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, DELETE_CATEGORY_FAILURE} from "../actions/categoriesActions";

const initialState = {
  categories: [],
  error: null,
  loading: false
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_CATEGORIES_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories,loading: false };
    case GET_CATEGORIES_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default categoriesReducer;