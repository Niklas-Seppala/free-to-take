import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import {ChatMessageListItem} from './ChatMessageListItem';
import PropTypes from 'prop-types';
import {EmptyResults} from './EmptyResults';
import { GlobalContext } from '../context/GlobalContext';

export default function ChatMessageList({data, media, navigation}) {
  const { user } = useContext(GlobalContext);
  console.log("data", data)
  console.log("comments", )
  if (data.length === 0) return <EmptyResults />;
  return (
    <FlatList
      style={{marginTop: 5, width:'100%', height: '100%', backgroundColor:'green'}}
      keyExtractor={(item) => item.comment_id.toString()}
      data={data}
      initialScrollIndex={data.length-1}
      ListFooterComponent={<View style={{height: 20}}/>}
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
