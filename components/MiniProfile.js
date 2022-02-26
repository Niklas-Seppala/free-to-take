import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';

/**
 * 
 * @param {{user:{email: string, user_id: number, username: string, full_name: string}}} _ 
 * @returns 
 */
export default function MiniProfile({ user, style, size=50}) {
  return (
    <View style={[style, styles.container]}>
      <Image style={{width: size, height: size, borderRadius: size / 2}} source={{uri: 'https://placekitten.com/300/300'}} />
      <Text h4 style={styles.name}>{user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6ab07c',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: 'white',
    marginLeft: 10
  },
});
