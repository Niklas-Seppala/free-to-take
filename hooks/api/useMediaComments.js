import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { TAG, client, routes, setJWT } from '../../utils/api';


export default function useMediaComments() {
  const { user } = useContext(GlobalContext);

  const getCommentsByMedia = async (id) => {
    if (!user) return;
    try {
      const resp = await client.get(routes.comment.getByFile(id), { headers: setJWT(user.token) })
      const comments = resp.data

      const refinedComments = comments.map(comment => {

          try {
            // get the comment owner
            console.log("GET", routes.user.info(comment.user_id))
            const userResp = client.get(routes.user.info(comment.user_id), { headers: setJWT(user.token) }).then(
              r => {comment.owner = r.data}
            ).catch(e => console.log(e));
            comment.comment = comment.comment.replace(/\{.*?\}/, ''); // remove legacy JSON header from existing comments that have it
            return comment
          } catch(error) {
            console.log(error, "in useMediaComments hook")
          }
        })
        
      return refinedComments
    } catch (error) {
      console.error(error);
      return null
    }
  } 

  return getCommentsByMedia;
}
