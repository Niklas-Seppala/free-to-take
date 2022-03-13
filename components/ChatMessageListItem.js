import React from 'react';
import {ListItem, Text, Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Time from './DateTime';
import MiniProfile from './MiniProfile';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

export function ChatMessageListItem({item, user, media, index}) {
  const isOwnComment = item.user_id == user.user_id;
  const isItemOwnerComment = item.user_id == media.owner.user_id;
  const commentOwner = isItemOwnerComment ? media.owner : item.owner;

  return (
    <View>
      <ListItem key={index}>
        <ListItem.Content>
          <View
            style={{
              flex: 1,
              width: '100%',
              borderRadius: 5,
              backgroundColor: isOwnComment ? colors.active : colors.inactive,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {commentOwner && (
                <MiniProfile
                  fontColor={colors.light}
                  user={commentOwner}
                  style={{margin: 10}}
                />
              )}
              {isItemOwnerComment && (
                <Icon type="font-awesome" name="gift" color={colors.light} />
              )}
            </View>
            <View style={{margin: 10}}>
              <Text style={{color: colors.light}}>{item.comment}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Time light ISOString={item.time_added} />
              </View>
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
};
