import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { client, routes, setJWT } from '../../utils/api';
import { storeToken } from '../../utils/storage';

import { getToken } from '../../utils/storage';


export default function useUserProfile() {
  const { setUser, user } = useContext(GlobalContext);

  const updateUserData = async (userData) => {
    const token = await getToken()
    delete userData.address;
    delete userData.password2;
    if (token) {
      console.log("Updating with userData", userData, token)
      try {
        const resp = await client.put(routes.user.modify, userData, {headers: setJWT(token)});
        //const resp = await client.put(routes.user.modify, data, {'Content-Type': 'application/json', headers: setJWT(token) });
        console.log(await resp.json())
      } catch (error) {
        console.error(error.message, 'at useUserProfile hook');
        return false;
      }
    }
    else {
      return false;
    }
  }

  return updateUserData;
}