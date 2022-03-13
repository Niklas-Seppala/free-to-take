import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {EmptyResults} from './EmptyResults';
import MiniContentListItem from './MiniContentListItem';
import {ScreenLoader} from './ScreenLoader';
import {View} from 'react-native';

export default function MiniContentList({
  data,
  visitor,
  navigation,
  loading,
  style,
}) {
  if (loading)
    return (
      <View style={{flex: 3}}>
        <ScreenLoader />
      </View>
    );
  if (!data || data.length === 0) return <EmptyResults style={{flex: 3}} />;

  return (
    <View style={[{width: '100%', flex: 3}, style]}>
      <FlatList
        style={{margin: 10, marginTop: 5}}
        keyExtractor={(item) => item.file_id.toString()}
        data={data}
        renderItem={({item, index}) => (
          <MiniContentListItem
            visitor={visitor}
            item={item}
            navigation={navigation}
            index={index}
            navigation={navigation}
            onFocus={(item) =>
              navigation.navigate('Single', {item: item, owner: true})
            }
          />
        )}
      />
    </View>
  );
}

MiniContentList.propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object.isRequired,
};
