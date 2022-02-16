import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {BASE_URL} from '../../utils/api';

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(BASE_URL + 'users/user', options);
  };

  const getUserById = async (userId, token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(`${BASE_URL}users/${userId}`, options);
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(BASE_URL + 'users', options);
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(BASE_URL + 'users', options);
  };

  const checkUsername = async (username) => {
    const result = await doFetch(BASE_URL + 'users/username/' + username);
    return result.available;
  };

  return {getUserByToken, getUserById, postUser, putUser, checkUsername};
};

export {useUser};
