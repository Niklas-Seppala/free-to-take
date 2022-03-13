import React, {useContext} from 'react';
import {FlatList, View, Text} from 'react-native';
import {ChatMessageListItem} from './ChatMessageListItem';
import PropTypes from 'prop-types';
import {GlobalContext} from '../context/GlobalContext';
import {EmptyResults} from './EmptyResults';

export default function ChatMessageList({
  data,
  media,
  loadComments,
  isRefreshing,
}) {
  const {user} = useContext(GlobalContext);

  if (!data || data.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <EmptyResults></EmptyResults>
      </View>
    );
  }

  return (
    <FlatList
      reversed
      style={{marginTop: 5, width: '100%', height: '100%'}}
      keyExtractor={(item) => item.comment_id.toString()}
      data={data.reverse()}
      ListFooterComponent={<View style={{height: 20}} />}
      onRefresh={loadComments}
      refreshing={isRefreshing}
      renderItem={({item, index}) => (
        <ChatMessageListItem
          item={item}
          media={media}
          index={index}
          user={user}
        />
      )}
    />
  );
}

ChatMessageList.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};
