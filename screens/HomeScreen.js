import React, {useEffect, useState} from 'react';
// import PostCarousel from '../components/PostCarousel';
import useAllMedia from '../hooks/api/useAllMedia';
import {ScreenLoader} from '../components/ScreenLoader';
import TagFilter from '../components/TagFilter';
import {useFilters} from '../hooks/useFilters';
import {useCategories} from '../hooks/useCategories';
import {FlatList} from 'react-native';
import { ListItem, Text } from 'react-native-elements';


export function ContentListItem({item}) {
  return (
    <ListItem>
      <Text h4>Kakka</Text>
    </ListItem>
  );
}

export function ContentList({data}) {
  console.log(data);
  return (
    <FlatList
      keyExtractor={(item) => item.file_id.toString()}
      data={data}
      renderItem={(item) => <ContentListItem item={item} />}
    ></FlatList>
  );
}

const HomeScreen = () => {
  const [filters, toggle] = useCategories();
  const data = useAllMedia();
  const [ready, setReady] = useState(false);
  const filteredData = useFilters(data, filters);
  useEffect(() => setReady(Boolean(data)), [data]);

  if (!ready) return <ScreenLoader></ScreenLoader>;

  // TODO: Test filters when upload is ready.
  return (
    <>
      <TagFilter onChange={toggle} />
      <ContentList data={filteredData}></ContentList>
      {/* <PostCarousel data={data} /> */}
    </>
  );
};

export default HomeScreen;
