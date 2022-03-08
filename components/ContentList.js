import React from 'react';
import {FlatList} from 'react-native';
import {ContentListItem} from './ContentListItem';

export function ContentList({data, navigation}) {
  return (
    <FlatList
      style={{margin: 10, marginTop: 5}}
      keyExtractor={(item) => item.file_id.toString()}
      data={data}
      renderItem={({item, index}) => (
        <ContentListItem
          item={item}
          index={index}
          onProfilePress={(owner) => console.log(owner)}
          onFocus={(item) => navigation.navigate('Single', {item: item})}
        />
      )}
    />
  );
}
