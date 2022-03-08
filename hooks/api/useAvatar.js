import { useEffect, useState } from "react";
import { client, routes } from "../../utils/api";
import defaultAvatar from '../../assets/user.png'

export default function useAvatar(user) {
  const [avatar, setAvatar] = useState(defaultAvatar);
  useEffect(async () => {
    const avatarResponse = await client.get(routes.tag.files(`avatar_${user.user_id}`));
    if (avatarResponse.data?.length > 0) {
      setAvatar({uri: routes.uploads.file(avatarResponse.data[0].filename)})
    }
  }, [user]);

  return avatar;
}