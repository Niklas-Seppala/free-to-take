import React, { useEffect, useState } from 'react';
import PostCarousel from '../components/PostCarousel';
import useAllMedia from '../hooks/api/useAllMedia';
import { ScreenLoader } from '../components/ScreenLoader';
import TagFilter from '../components/TagFilter';
import { useFilters } from '../hooks/useFilters';
import { useCategories } from "../hooks/useCategories";

const HomeScreen = ({navigation}) => {
  const [filters, toggle] = useCategories();
  const data = useAllMedia();
  const [ready, setReady] = useState(false);
  const filteredData = useFilters(data, filters);
  useEffect(() => setReady(Boolean(data)), [data]);

  if (!ready) return <ScreenLoader></ScreenLoader>;

  // TODO: Test filters when upload is ready.
  return (
    <>
      <TagFilter
        onChange={toggle}
      />
      <PostCarousel data={data} navigation={navigation} />
    </>
  );
};

export default HomeScreen;
