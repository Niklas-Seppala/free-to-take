import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, ListItem, Avatar, Text, Button} from 'react-native-elements';
import {routes} from '../utils/api';
import {View} from 'react-native';
import Time from './DateTime';
import MiniProfile from './MiniProfile';
import colors from '../utils/colors';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

export function ChatMessageListItem({item, index, onFocus, onProfilePress}) {
  console.log("item", item)
  return (
    <View>
      <ListItem key={index}>
        <ListItem.Content>
          <View style={{flex: 1, flexDirection: item.recipient_id != item.user_id ? 'row' : 'row-reverse', }}>
            <View>
              <Avatar source={{uri: 'https://www.placecage.com/c/64/64'}}/>
            </View>
            <View>
              <Text>Username_ph</Text>
              <Text>{item.comment}</Text>
              <Text style={{fontWeight: '100'}}>{item.time_added}</Text>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}


ChatMessageListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
}
