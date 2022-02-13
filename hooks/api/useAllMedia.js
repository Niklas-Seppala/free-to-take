import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { TAG, client, routes } from '../../utils/api';

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
  const { apiAction } = useContext(GlobalContext);
  const [media, setMedia] = useState([]);

  useEffect(async () => {
    try {
      const fileList = (await client.get(routes.tag.files(TAG))).data;
      const filesWithInfo = await Promise.all(
        fileList.map(async (file) => {
          return (await client.get(routes.media.file(file.file_id))).data;
        })
      );
      setMedia(filesWithInfo);
    } catch (error) {
      console.error(error);
    }
  }, [apiAction]);

  return media;
}
