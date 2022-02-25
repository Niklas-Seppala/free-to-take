
import { useContext, useState } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Card, Divider, Avatar, Icon } from 'react-native-elements';
import useLogout from '../hooks/api/useLogout';

import { GlobalContext } from '../context/GlobalContext';

const UserInfo = (props) => {
  const user = props.user;
  return (
      <>
      <View style={styles.backgroundCircle}></View>

      <Avatar
        size={160}
        source={{ uri: 'https://www.placecage.com/c/800/800' }}
        containerStyle={{marginBottom: 20}}
        rounded
      />
      <View style={{ width: '100%', flex: 1, alignItems: 'flex-start'}}>
        {/* user info */}
        <View style={styles.vertical}>
          <Icon
            name="user"
            type="font-awesome"
            color="#3f3f3f"
            containerStyle={styles.iconContainerStyle}
          />
          <Text>{user.username}</Text>
        </View>

        <Divider />

        <View style={styles.vertical}>
          <Icon
            name="envelope"
            type="font-awesome"
            color="#3f3f3f"
            containerStyle={styles.iconContainerStyle}
          />
          <Text>{user.email}</Text>
        </View>

        <Divider />

        <View style={styles.vertical}>
          <Icon
            name="map-marker"
            type="font-awesome"
            color="#3f3f3f"
            containerStyle={styles.iconContainerStyle}
          />
          <Text>742 Evergreen Terrace</Text>
        </View>
      </View>
      </>
  )

};

const styles = StyleSheet.create({
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 0.5,
    width: '100%',
    color: '#3f3f3f',
  },
  cardContainerStyle: {
    width: '95%',
    //backgroundColor: 'rgba(96, 162, 23, 0.5)',
  },
  button: {
    backgroundColor: '#5F9A3B',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainerStyle: {
    width: '15%',
    marginLeft: '20%',
  },
  bold: {
    fontWeight: 'bold',
  },
  backgroundCircle: {
    backgroundColor: '#6ab07c',
    //backgroundColor: 'green',
    height: Dimensions.get('window').width * 2,
    width: Dimensions.get('window').width * 2,
    borderRadius: 1200,
    position: 'absolute',
    top: -Dimensions.get('window').width * 1.6,
  },
});

export default UserInfo;
