import React from 'react';
import useAllMedia from '../hooks/api/useAllMedia';

import PostCarousel from '../components/PostCarousel';

const LoginScreen = () => {
  const data = useAllMedia();
  return <PostCarousel data={data} style={{ flex: 1 }} />;
};

export default LoginScreen;
