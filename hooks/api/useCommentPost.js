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
  const postComment = async (comment, item, send_to_id=null) => {
    try {
      const recipient_id = send_to_id != null ? send_to_id : item.owner.user_id;
      const header = JSON.stringify({rid:recipient_id});

      const commentData = {
        file_id: item.file_id,
        comment: `${header}${comment}`
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