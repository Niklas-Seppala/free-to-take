import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { client, routes, setJWT } from '../../utils/api';
import { storeToken } from '../../utils/storage';

import { getToken } from '../../utils/storage';


export default function useCommentPost() {
  const { user } = useContext(GlobalContext);
  const token = user.token;

  /**
    Adds a comment to the item. Uses a small JSON header to correctly identify the sender 
    and the recipient for a pseudo-"direct message" feature.
    Awful hack, you should never utilize an API like this for direct messages.
  */
  const postComment = async (comment, item) => {
    try {
      const commentData = {
        file_id: item.file_id,
        comment: `{rid:'${item.owner.user_id}',sid:'${user.user_id}'}${comment}`
      }
      const resp = await client.post(routes.comment.post, commentData, {headers: setJWT(token)});
      console.log(commentData)
    } catch (error) {
      console.error(error.message, 'at useCommentPost hook');
    }
  };


  return postComment
}