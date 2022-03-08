import {useContext, useState, useEffect} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {client, routes, setJWT} from '../../utils/api';

export default function useMyPosts() {
  const [posts, setPosts] = useState(null);
  const {apiAction, user} = useContext(GlobalContext);
  useEffect(async () => {
    if (!user) return;
    try {
      const postResponse = await client.get(routes.media.currentUsersFiles, {
        headers: setJWT(user.token),
      });
      const asd = await Promise.all(postResponse.data.map(async post => {
        const deets = await client.get(routes.media.file(post.file_id));
        return {...deets.data, owner: user};
      }))
      setPosts(asd);
    } catch (error) {
      console.error(error);
    }
  }, [apiAction, user]);
  return posts;
}
