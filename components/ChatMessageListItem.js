import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, ListItem, Avatar, Text, Button, Icon} from 'react-native-elements';
import {routes} from '../utils/api';
import {View} from 'react-native';
import Time from './DateTime';
import MiniProfile from './MiniProfile';
import colors from '../utils/colors';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'


export function ChatMessageListItem({item, user, media, index, onFocus, onProfilePress}) {
  const isOwnComment = item.user_id == user.user_id;
  const isItemOwnerComment = item.user_id == media.owner.user_id;
  console.log("Comment recipient", item.recipient_id, "poster", user.user_id, "isOwnComment", isOwnComment, "owner_id", media.owner.user_id)
  const otherUserName = !isOwnComment ? media.owner.username : 'recipient'

  const date = new Date(item.time_added);
  const dateFormat = 'fi-FI';
  const formattedDate = `${date.toLocaleDateString(dateFormat)} ${date.toLocaleTimeString(dateFormat)}`;

  return (
    <View>
      <ListItem key={index}>
        <ListItem.Content>
          <View style={{flex: 1, width:'100%', backgroundColor: isOwnComment ? colors.active : colors.inactive }}>
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <Avatar rounded containerStyle={{marginRight: 5}} source={{uri: 'https://www.placecage.com/c/64/64'}}/>
              {isItemOwnerComment ? <Icon type="font-awesome" name="gift"/> : <></>}
            </View>
            <View>
              <Text style={{fontWeight: 'bold'}}>{!isOwnComment ? otherUserName : 'Me'}</Text>
              <Text>{item.comment}</Text>
              <Time ISOString={item.time_added} />
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
