import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCard from './CarouselCard';

import { CarouselControls } from './CarouselControls';
import { EmptyResults } from './EmptyResults.1';

const PostCarousel = ({ data, style }) => {
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const carouselRef = React.createRef();

  if (data.length === 0) return <EmptyResults style={style} />;
  return (
    <View style={style}>
      <Carousel
        scrollEnabled={false}
        ref={carouselRef}
        data={data}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        layoutCardOffset={18}
        renderItem={({ item }) => <CarouselCard item={item} />}
        layout={'default'}
      />
      <CarouselControls
        onRight={() => carouselRef.current.snapToNext()}
        onLeft={() => carouselRef.current.snapToPrev()}
        count={data.length}
      ></CarouselControls>
    </View>
  );
};

export default PostCarousel;
