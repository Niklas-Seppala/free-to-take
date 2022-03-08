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

      const headerRegex = /\{.*?\}/;
      const parsedComments = comments.map(comment => {
        const headerMatch = comment.comment.match(headerRegex);
        if (!headerMatch) return null;
        if(headerMatch) {
          // parse the header into an object
          try {
            //console.log("Header found: ", headerMatch[0])
            const header = JSON.parse(headerMatch[0]);

            const commentText = comment.comment.substr(headerMatch[0].length, comment.comment.length);
            console.log(`Recipient: ${header.rid} - text: ${commentText}`);
            comment.recipient_id = header.rid;
            comment.comment = commentText;

            return comment
          } catch(error) {
            //console.log(error)
          }

        }
        
      }).filter(c => c != null);      
      console.log("Comments", parsedComments);
      return resp.data
    } catch (error) {
      console.error(error);
      return null
    }
  } 

  return getCommentsByMedia;
}
