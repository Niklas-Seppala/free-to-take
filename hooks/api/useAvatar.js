import { useEffect, useState } from "react";

export default function useAvatar(user) {
  const [avatar, setAvatar] = useState(null);
  useEffect(async () => {
    const file = await client.get(routes.tag.files(`avatar_${user.user_id}`));
    let result = '';
    if (file.data?.length > 0) {
      result = routes.uploads.file(file.data[0].filename);
    }
    setAvatar(result);
  }, [user])

  return avatar;
}