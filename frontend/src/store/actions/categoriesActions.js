import axiosApi from "../../axiosApi";
import { toast } from "react-toastify";

export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";

export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE";

export const getCategoriesRequest = () => ({ type: GET_CATEGORIES_REQUEST });
export const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});
export const getCategoriesFailure = (error) => ({
  type: GET_CATEGORIES_FAILURE,
  error,
});

export const deleteCategoryFailure = (error) => ({
  type: DELETE_CATEGORY_FAILURE,
  error,
});


export const getCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(getCategoriesRequest());
      const response = await axiosApi.get("/categories");
      dispatch(getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(getCategoriesFailure(error.response.data));
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      await axiosApi.delete(`/categories/${id}`);
      dispatch(getCategories());
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(deleteCategoryFailure(error.response.data));
    }
  };
};