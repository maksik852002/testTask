import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import {getUsers, deleteUser} from '../../store/actions/usersActions';
import { apiURL, defaultAvatar } from "../../constants";
import {tableIcons} from './TableIcons';
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";
import FormElement from '../../components/UI/Form/FormElement';

const Users = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const data = useSelector(state => state.users.users);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch]);

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].properties.message;
    } catch (e) {
      return undefined;
    }
  };

  const addUserHandler = (newData) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      Object.keys(newData).forEach(key => {
        data.append(key, newData[key]);
      });
      axiosApi.post('/users', data)
      .then(() => {
        resolve()
        dispatch(getUsers())
      })
      .catch(error => reject(setError(error.response.data)))
    })
  };

  const editUserHandler = (newData) => {
    return new Promise((resolve, reject) => {
      const userData = new FormData();
      Object.keys(newData).forEach(key => {
        userData.append(key, newData[key]);
      });
      axiosApi.patch(`/users/${newData._id}`, userData)
      .then(() => {
        resolve()
        dispatch(getUsers())
      })
      .catch(error => {
        reject()
        setError(error.response.data)
        toast.error(error.response.data.error);
      })
    })
  };

  const columns = [
    { title: 'Avatar', field: 'avatar', 
    render: rowData => <img alt={rowData.username} src={rowData.avatar ? apiURL + '/' + rowData.avatar: defaultAvatar} style={{width: 40, height: 40, borderRadius: '50%'}}/> ,
    editComponent: props => (
      <FormElement
        type="file"
        propertyName="avatar"
        variant='standard'
        size='small'
        placeholder="Choose image"
        onChange={e => props.onChange(e.target.files[0])}
      />
    )},
    { title: 'Username', field: 'username',
    editComponent: props => (
      <FormElement
        type="text"
        propertyName="username"
        value={props.value ? props.value : '' }
        placeholder="Username"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
        error={getFieldError('username')}
      />
    )},
    { title: 'Password', field: 'password', emptyValue: '*******', 
    editComponent: props => (
      <FormElement
        type="password"
        propertyName="password"
        placeholder="Password"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
        error={getFieldError('password')}
      /> )
    },
    { title: 'Role', field: 'role', lookup: { 'admin': 'admin', 'user': 'user' }},
  ];

  return (
    <MaterialTable
      title="Users"
      icons={tableIcons}
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
      }}
      editable={user.role ==='admin' ? { 
        onRowAdd: newData => addUserHandler(newData),
        onRowUpdate: newData => editUserHandler(newData),
        onRowDelete: (oldData) => dispatch(deleteUser(oldData._id)),
      } : {
      }}
    />
  );
}

export default Users;