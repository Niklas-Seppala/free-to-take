import React, {useEffect, useState} from 'react';
import useAllMedia from '../hooks/api/useAllMedia';
import {ScreenLoader} from '../components/ScreenLoader';
import TagFilter from '../components/TagFilter';
import {useFilters} from '../hooks/useFilters';
import {useCategories} from '../hooks/useCategories';
import ContentList from '../components/ContentList';

const HomeScreen = ({navigation}) => {
  const [filters, toggle] = useCategories();
  const [data, loading] = useAllMedia();
  const [ready, setReady] = useState(false);
  const filteredData = useFilters(data, filters);
  useEffect(() => setReady(Boolean(data)), [data]);

  if (loading) return <ScreenLoader />;

  return (
    <>
      <TagFilter onChange={toggle} />
      <ContentList data={filteredData} navigation={navigation} />
    </>
  );
};

export default HomeScreen;
