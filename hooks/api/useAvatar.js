import {useContext, useEffect, useState} from 'react';
import {client, routes} from '../../utils/api';
import defaultAvatar from '../../assets/user.png';
import {GlobalContext} from '../../context/GlobalContext';
export default function useAvatar(user) {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const {apiAction} = useContext(GlobalContext);
  const [id, setId] = useState(-1);

  useEffect(async () => {
    const avatarResponse = await client.get(
      routes.tag.files(`avatar_${user.user_id}`)
    );
    if (avatarResponse.data?.length > 0) {
      setAvatar({uri: routes.uploads.file(avatarResponse.data[0].filename)});
      setId(avatarResponse.data[0].file_id);
    }
  }, [user, apiAction]);

  return [avatar, id];
}
