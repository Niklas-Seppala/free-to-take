import React, { useEffect, useState } from 'react';
import PostCarousel from '../components/PostCarousel';
import useAllMedia from '../hooks/api/useAllMedia'
import { View, ActivityIndicator } from 'react-native';


const HomeScreen = () => {
  const data = useAllMedia();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(Boolean(data)), [data])

  if (!ready)  {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={120} color='green' />
      </View>
    )
  }
  return <PostCarousel data={data} style={{flex: 1}}/>;
};

export default HomeScreen;
