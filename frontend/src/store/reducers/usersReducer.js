import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../actions/usersActions";

const initialState = {
  registerLoading: false,
  registerError: null,
  getUsersLoading: false,
  getUsersError: null,
  user: null,
  users: null,
  loginLoading: false,
  loginError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, getUsersLoading: true };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        getUsersLoading: false,
        getUsersError: null,
      };
    case GET_USERS_FAILURE:
      return { ...state, getUsersError: action.error, getUsersLoading: false };
    case REGISTER_USER_REQUEST:
      return { ...state, registerLoading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, registerLoading: false, registerError: null };
    case REGISTER_USER_FAILURE:
      return { ...state, registerError: action.error, registerLoading: false };
    case LOGIN_USER_REQUEST:
      return { ...state, loginLoading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginError: null,
        user: action.user,
      };
    case LOGIN_USER_FAILURE:
      return { ...state, loginLoading: false, loginError: action.error };
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default usersReducer;
