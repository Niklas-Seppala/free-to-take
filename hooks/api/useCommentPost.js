import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { client, routes, setJWT } from '../../utils/api';
import { storeToken } from '../../utils/storage';

import { getToken } from '../../utils/storage';


export default function useCommentPost() {
  const { user } = useContext(GlobalContext);
  const token = user.token;

  /**
    Adds a comment to the item. 
  */
  const postComment = async (comment, item) => {
    try {

      const commentData = {
        file_id: item.file_id,
        comment: `${comment}`
      }
      const resp = await client.post(routes.comment.post, commentData, {headers: setJWT(token)}).catch(x => console.log("error", x.data));
      console.log("postComment", resp.data)
      return resp
    } catch (error) {
      console.error(error.message, error, 'at useCommentPost hook');
    }
  };


  return postComment
}