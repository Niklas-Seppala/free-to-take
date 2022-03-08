import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {UserPropType} from '../utils/appPropTypes';

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
  return (
    <View style={[style, styles.container]}>
      <Image
        style={{width: 40, height: 40, borderRadius: 25}}
        source={{uri: 'https://placekitten.com/300/300'}}
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
