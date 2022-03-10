import React, { useContext } from 'react';
import { FlatList, View, Text } from 'react-native';
import {ChatMessageListItem} from './ChatMessageListItem';
import PropTypes from 'prop-types';
import {EmptyResults} from './EmptyResults';
import { GlobalContext } from '../context/GlobalContext';

export default function ChatMessageList({data, media, navigation, loadComments, isRefreshing}) {
  const { user } = useContext(GlobalContext);

  console.log("comments", isRefreshing)
  if (!data || data.length === 0) return (
    <View style={{width: '100%', flex:1, alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold'}}>Loading comments</Text>
    </View>
  );

  return (
    <FlatList
      reversed
      style={{marginTop: 5, width:'100%', height: '100%'}}
      keyExtractor={(item) => item.comment_id.toString()}
      data={data.reverse()}
      ListFooterComponent={<View style={{height: 20}}/>}
      onRefresh={loadComments}
      refreshing={isRefreshing}
      renderItem={({item, index}) => (
        <ChatMessageListItem
          item={item}
          media={media}
          index={index}
          user={user}
          onFocus={() => {console.log("focus")}}
        />
      )}
    />
  );
}

ChatMessageList.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}
