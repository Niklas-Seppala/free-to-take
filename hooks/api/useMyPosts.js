import {useContext, useState, useEffect} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {client, routes, setJWT} from '../../utils/api';

export function useUsersPosts(user) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    if (!user)  return;
    
    setLoading(true);
    try {
      const postResponse = await client.get(routes.media.usersFiles(user.user_id));
      const detailed = await Promise.all(postResponse.data.map(async post => {
        const deets = await client.get(routes.media.file(post.file_id));
        return {...deets.data, owner: user};
      }))
      setPosts(detailed);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [user]);
  return [posts, loading];
}

export default function useMyPosts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const {apiAction, user} = useContext(GlobalContext);
  useEffect(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const postResponse = await client.get(routes.media.currentUsersFiles, {
        headers: setJWT(user.token),
      });
      const asd = await Promise.all(postResponse.data.map(async post => {
        const deets = await client.get(routes.media.file(post.file_id));
        return {...deets.data, owner: user};
      }))
      setPosts(asd);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [apiAction, user]);
  return [posts, loading];
}
