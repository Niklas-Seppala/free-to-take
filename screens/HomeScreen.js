import React, { useEffect, useState } from 'react';
import PostCarousel from '../components/PostCarousel';
import useAllMedia from '../hooks/api/useAllMedia';
import { ScreenLoader } from '../components/ScreenLoader';

const HomeScreen = () => {
  const data = useAllMedia();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(Boolean(data)), [data]);

  return (
    <>{ready ? <PostCarousel data={data} style={{ flex: 1 }} /> : <ScreenLoader />}</>
  );
};

export default HomeScreen;
