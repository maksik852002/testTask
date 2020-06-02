import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { getCategories, deleteCategory } from '../../store/actions/categoriesActions';
import {tableIcons} from '../Users/TableIcons';
import axiosApi from "../../axiosApi";
import FormElement from '../../components/UI/Form/FormElement';


const Users = () => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.cat.categories);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getCategories())
  },[dispatch]);

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].properties.message;
    } catch (e) {
      return undefined;
    }
  };

  const addCategoryHandler = (newData) => {
    return new Promise((resolve, reject) => {
      const data = {};
      Object.keys(newData).forEach(key => {
        data[key] =  newData[key];
      });
         axiosApi.post('/categories', data)
         .then(() => {
          resolve()
          dispatch(getCategories())
        })
        .catch(error => reject(setError(error.response.data)))
    })
  };

  const editCategoryHandler = (newData) => {
    return new Promise((resolve, reject) => {
      const data ={};
      Object.keys(newData).forEach(key => {
        data[key] =  newData[key];
      });
      delete data.articlesCount
      axiosApi.put(`/categories/${newData._id}`, data)
      .then(() => {
        resolve()
        dispatch(getCategories())
      })
      .catch(error => reject(setError(error.response.data)))
    })
  };

  const columns = [
    { title: 'Title', field: 'title',
    editComponent: props => (
      <FormElement
        type="text"
        propertyName="title"
        value={props.value ? props.value : '' }
        placeholder="Title"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
        error={getFieldError('title')}
      />
    )},
    { title: 'Description', field: 'description', 
    editComponent: props => (
      <FormElement
        type="description"
        propertyName="description"
        value={props.value ? props.value : '' }
        placeholder="Description"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
        error={getFieldError('description')}
      /> )
    },
    { title: 'Number of articles in this category', field: 'articlesCount', editable: 'never' }
  ];

  return (
    <MaterialTable
      title="Categories"
      icons={tableIcons}
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
      }}
      editable={{ 
        onRowAdd: newData => addCategoryHandler(newData),
        onRowUpdate: newData => editCategoryHandler(newData),
        onRowDelete: (oldData) => dispatch(deleteCategory(oldData._id))
      }}
    />
  );
}

export default Users;