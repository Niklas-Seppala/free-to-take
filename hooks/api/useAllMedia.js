import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { TAG, client, routes, setJWT } from '../../utils/api';

/**
 * Get all of the latest media uploads by tag unique to this app.
 * @see https://media.mw.metropolia.fi/wbma/docs/#api-Tag-GetTagFiles
 *
 * Hook depends on apiAction state of @see GlobalContext .
 *
 * @returns {Array<{
 *  file_id: number,
 *  filename: string,
 *  tag: string,
 *  media_type: string,
 *  title: string,
 *  time_added: string,
 *  description: string}>} Media
 */
export default function useAllMedia() {
  const { apiAction, user } = useContext(GlobalContext);
  const [media, setMedia] = useState(null);

  useEffect(async () => {
    if (!user) return;
    try {
      const [users, posts] = await Promise.all([
        client.get(routes.user.all, { headers: setJWT(user.token) }),
        client.get(routes.tag.files(TAG)),
      ]);
      const userMap = new Map(users.data.map((i) => [i.user_id, i]));

      const filesWithInfo = await Promise.all(
        posts.data.map(async (file) => {
          const details = (await client.get(routes.media.file(file.file_id))).data;
          const id = details.user_id;
          delete details.user_id;
          return { ...details, owner: userMap.get(id) };
        })
      );
      setMedia(filesWithInfo);
    } catch (error) {
      console.error(error);
    }
  }, [apiAction, user]);

  return media;
}
