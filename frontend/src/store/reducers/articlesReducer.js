import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  CREATE_ARTICLE_FAILURE,
  EDIT_ARTICLE_FAILURE,
  DELETE_ARTICLE_FAILURE,
} from "../actions/articlesActions";

const initialState = {
  articles: [],
  article: null,
  error: null,
  loading: false,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_FAILURE:
      return { ...state, error: action.error, loading: false };
    case EDIT_ARTICLE_FAILURE:
      return { ...state, error: action.error, loading: false };
    case DELETE_ARTICLE_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_ARTICLES_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        article: null,
        loading: false,
      };
    case GET_ARTICLES_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_ARTICLE_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ARTICLE_SUCCESS:
      return { ...state, article: action.article, loading: false };
    case GET_ARTICLE_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default articlesReducer;
