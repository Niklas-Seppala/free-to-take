import {useContext, useState, useEffect} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {client, routes, setJWT, TAG} from '../../utils/api';

export function useUsersPosts(user) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const postResponse = await client.get(
        routes.media.usersFiles(user.user_id)
      );
      const detailed = await Promise.all(
        postResponse.data.map(async (post) => {
          const [tags, details] = await Promise.all([
            client.get(routes.tag.filesTags(post.file_id)),
            client.get(routes.media.file(post.file_id)),
          ]);
          return {...details.data, tags: tags.data, owner: user};
        })
      );

      setPosts(
        detailed
          .filter(
            (post) =>
              !post.tags.some((tag) => tag.tag === `avatar_${user.user_id}`)
          )
          .filter((post) => post.tags.some((tag) => tag.tag === TAG))
      );
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
      const detailed = await Promise.all(
        postResponse.data.map(async (post) => {
          const [tags, details] = await Promise.all([
            client.get(routes.tag.filesTags(post.file_id)),
            client.get(routes.media.file(post.file_id)),
          ]);
          return {...details.data, tags: tags.data, owner: user};
        })
      );
      setPosts(
        detailed
          .filter(
            (post) =>
              !post.tags.some((tag) => tag.tag === `avatar_${user.user_id}`)
          )
          .filter((post) => post.tags.some((tag) => tag.tag === TAG))
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [apiAction, user]);
  return [posts, loading];
}
