import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { client, routes, setJWT } from '../../utils/api';
import { storeToken } from '../../utils/storage';

import { getToken } from '../../utils/storage';

import { TAG } from '../../utils/api';

export default function useTagPost() {
  const { user } = useContext(GlobalContext);
  const token = user.token;

  /**
    Adds a tag with the given content to the given item
    The tag is prepended with the application's own general tag to ensure its easier to identify the tags from this app
  */
  const postTag = async (tagContent, item) => {
    try {

      const tagData = {
        file_id: item.file_id,
        tag: `${TAG}${tagContent}`
      }
      console.log("tagData", tagData)
      const resp = await client.post(routes.tag.create, tagData, {headers: setJWT(token)});
      console.log("resp:",resp)
      return resp
    } catch (error) {
      console.error(error, 'at useCommentTag hook');
    }
  };


  return postTag
}