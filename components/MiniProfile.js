import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Icon, Text } from 'react-native-elements';

/**
 * 
 * @param {{user:{email: string, user_id: number, username: string, full_name: string}}} _ 
 * @returns 
 */
export default function MiniProfile({ user, style}) {
  return (
    <View style={[style, styles.container]}>
      <Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri: 'https://placekitten.com/300/300'}} />
      <View style={{alignItems: 'flex-start', marginLeft: 5}}>
        <Text style={styles.name}>{user.username}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Icon style={{marginLeft: 8}} name='shopping-cart' size={22} color='#6ab07c'></Icon>
          <Text>2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 24,
    marginLeft: 10
  },
});
