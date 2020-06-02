import axiosApi from "../../axiosApi";
import { toast } from "react-toastify";
import { push } from "connected-react-router";

export const GET_ARTICLES_REQUEST = "GET_ARTICLES_REQUEST";
export const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS";
export const GET_ARTICLES_FAILURE = "GET_ARTICLES_FAILURE";

export const GET_ARTICLE_REQUEST = "GET_ARTICLE_REQUEST";
export const GET_ARTICLE_SUCCESS = "GET_ARTICLE_SUCCESS";
export const GET_ARTICLE_FAILURE = "GET_ARTICLE_FAILURE";

export const CREATE_ARTICLE_FAILURE = "CREATE_ARTICLE_FAILURE";

export const EDIT_ARTICLE_FAILURE = "EDIT_ARTICLE_FAILURE";

export const DELETE_ARTICLE_FAILURE = "DELETE_ARTICLE_FAILURE";

export const getArticlesRequest = () => ({ type: GET_ARTICLES_REQUEST });
export const getArticlesSuccess = (articles) => ({
  type: GET_ARTICLES_SUCCESS,
  articles,
});
export const getArticlesFailure = (error) => ({
  type: GET_ARTICLES_FAILURE,
  error,
});

export const getArticleRequest = () => ({ type: GET_ARTICLE_REQUEST });
export const getArticleSuccess = (article) => ({
  type: GET_ARTICLE_SUCCESS,
  article,
});
export const getArticleFailure = (error) => ({
  type: GET_ARTICLE_FAILURE,
  error,
});

export const createArticleFailure = (error) => ({
  type: CREATE_ARTICLE_FAILURE,
  error,
});

export const editArticleFailure = (error) => ({
  type: EDIT_ARTICLE_FAILURE,
  error,
});

export const deleteArticleFailure = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  error,
});


export const getArticles = (categoryId) => {
  return async (dispatch) => {
    let url = "/articles";
    if (categoryId && categoryId !== '') {
      url += "?category=" + categoryId;
    }
    try {
      dispatch(getArticlesRequest());
      const response = await axiosApi.get(url);
      dispatch(getArticlesSuccess(response.data));
    } catch (error) {
      dispatch(getArticlesFailure(error.response.data));
    }
  };
};

export const getArticle = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getArticleRequest());
      const response = await axiosApi.get("/articles/" + id);
      dispatch(getArticleSuccess(response.data));
    } catch (error) {
      dispatch(getArticleFailure(error.response.data));
    }
  };
};

export const createArticle = (data) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.post("/articles", data);
      toast.success(response.data.message);
      dispatch(push('/adm/articles'))
    } catch (error) {
      dispatch(createArticleFailure(error.response.data));
    }
  };
};

export const editArticle = (data, id) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.put(`/articles/${id}`, data);
      toast.success(response.data.message);
      dispatch(push('/adm/articles'))
    } catch (error) {
      dispatch(editArticleFailure(error.response.data));
    }
  };
};

export const deleteArticle = (id, category) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.delete(`/articles/${id}`);
      toast.success(response.data.message);
      dispatch(getArticles(category));
    } catch (error) {
      dispatch(deleteArticleFailure(error.response.data));
    }
  };
};