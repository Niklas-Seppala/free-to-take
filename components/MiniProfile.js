import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {UserPropType} from '../utils/appPropTypes';
import { client, routes } from '../utils/api';
import defaultAvatar from '../assets/user.png'

/**
 *
 * @param {{
 * user:{
 *   email: string,
 *   user_id: number,
 *   username: string,
 *   full_name: string
 *   }
 * }} props
 */
export default function MiniProfile({user, style}) {
  const [avatar, setAvatar] = useState(defaultAvatar);
  useEffect(async () => {
    const avatarResponse = await client.get(routes.tag.files(`avatar_${user.user_id}`));
    if (avatarResponse?.data?.length > 0) {
      setAvatar({uri: routes.uploads.file(avatarResponse.data[0].filename)})
    }
  }, [user])

  return (
    <View style={[style, styles.container]}>
      <Image
        style={{width: 40, height: 40, borderRadius: 25}}
        source={avatar}
      />
      <View style={{alignItems: 'flex-start', marginLeft: 5}}>
        <Text style={styles.name}>{user.username}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></View>
      </View>
    </View>
  );
}

MiniProfile.propTypes = {
  user: UserPropType,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    marginLeft: 5,
  },
});
