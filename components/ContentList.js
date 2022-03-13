import React from 'react';
import {FlatList} from 'react-native';
import {ContentListItem} from './ContentListItem';
import PropTypes from 'prop-types';
import {EmptyResults} from './EmptyResults';

export default function ContentList({data, navigation}) {
  if (data.length === 0) return <EmptyResults />;
  return (
    <FlatList
      style={{margin: 10, marginTop: 5}}
      keyExtractor={(item) => item.file_id.toString()}
      data={data.slice().reverse()}
      renderItem={({item, index}) => (
        <ContentListItem
          item={item}
          index={index}
          onProfilePress={(owner) =>
            navigation.navigate('ProfileVisitor', {user: owner})
          }
          onFocus={(item) => navigation.navigate('Single', {item: item})}
        />
      )}
    />
  );
}

ContentList.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};
