import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { TAG, client, routes, setJWT } from '../../utils/api';


export default function useMediaTags() {
  const { user } = useContext(GlobalContext);

  const getTagsByMedia = async (id) => {
    if (!user) return;
    try {
      const resp = await client.get(routes.tag.filesTags(id), { headers: setJWT(user.token) })
      const tags = resp.data

      return tags
    } catch (error) {
      console.error(error, "in useMediaTags");
      return null
    }
  } 

  return getTagsByMedia;
}
