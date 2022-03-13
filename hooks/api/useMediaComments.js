import {useContext} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {client, routes, setJWT} from '../../utils/api';

export default function useMediaComments() {
  const {user} = useContext(GlobalContext);

  const getCommentsByMedia = async (id) => {
    if (!user) return;
    try {
      const resp = await client.get(routes.comment.getByFile(id), {
        headers: setJWT(user.token),
      });
      const comments = resp.data;

      // find all the individual comment owners and load only them
      const commentUserIds = [...new Set(comments.map((c) => c.user_id))];
      // get the user data for the unique users who have posted comments
      const users = await Promise.all(
        commentUserIds.map(async (id) => {
          console.log('Fetch from', routes.user.info(id));
          const userResp = await client.get(routes.user.info(id), {
            headers: setJWT(user.token),
          });
          return userResp.data;
        })
      );

      let idUsers = {};
      // make a quick id->user object
      users.map((u) => (idUsers[u.user_id] = u));

      const refinedComments = comments.map((comment) => {
        try {
          // add the comment owner
          comment.owner = idUsers[comment.user_id];
          comment.comment = comment.comment.replace(/\{.*?\}/, ''); // remove legacy JSON header from existing comments that have it
          return comment;
        } catch (error) {
          console.log(error, 'in useMediaComments hook');
        }
      });

      return refinedComments;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return getCommentsByMedia;
}
