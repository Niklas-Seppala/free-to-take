import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {EmptyResults} from './EmptyResults';
import MiniContentListItem from './MiniContentListItem';
import { ScreenLoader } from './ScreenLoader';
import { View } from 'react-native';

export default function MiniContentList({data, navigation, style}) {

  if (!data) return <ScreenLoader></ScreenLoader>;

  if (data.length === 0) return <EmptyResults />;
  return (
    <View style={{flex: 1, width: '100%'}}>
      <FlatList
        style={{margin: 10, marginTop: 5}}
        keyExtractor={(item) => item.file_id.toString()}
        data={data}
        renderItem={({item, index}) => (
          <MiniContentListItem
            item={item}
            index={index}
            onFocus={(item) => navigation.navigate('Single', {item: item, owner: true})}
          />
        )}
      />
    </View>
  );
}

MiniContentList.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};
