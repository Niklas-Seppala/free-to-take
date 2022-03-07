import React, { useEffect, useState } from 'react';
import PostCarousel from '../components/PostCarousel';
import useAllMedia from '../hooks/api/useAllMedia';
import { ScreenLoader } from '../components/ScreenLoader';
import TagFilter from '../components/TagFilter';
import { CATEGORY_TAGS } from '../utils/api';

const reduceCategories = (categories, tag) => {
  categories[tag.tag] = true;
  return categories;
};

const toggleCategory = (state, tag, prev) => {
  const copy = { ...prev };
  copy[tag] = !state;
  return copy;
};

const HomeScreen = () => {
  const [ready, setReady] = useState(false);
  const data = useAllMedia();
  const [filters, setFilters] = useState(CATEGORY_TAGS.reduce(reduceCategories, {}));
  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => setReady(Boolean(data)), [data]);
  if (!ready) return <ScreenLoader></ScreenLoader>;

  return (
    <>
      <TagFilter
        onChange={(state, tag) => setFilters(toggleCategory(state, tag, filters))}
      />
      <PostCarousel data={data} />
    </>
  );
};

export default HomeScreen;
