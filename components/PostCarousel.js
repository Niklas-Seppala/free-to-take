import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';
import PropTypes from 'prop-types';
import { CarouselControls } from './CarouselControls';
import { EmptyResults } from './EmptyResults';

/**
 * Carousel for browsing app content.
 * @param {{data: [any]}} props
 */
const PostCarousel = ({ data, navigation }) => {
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const carouselRef = React.createRef();

  if (data.length === 0) return <EmptyResults style={{flex: 1}} />;
  return (
    <View style={{flex: 1}}>
      <Carousel
        scrollEnabled={false}
        ref={carouselRef}
        data={data}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        layoutCardOffset={18}
        renderItem={({ item }) => <CarouselItem item={item} />}
        layout={'default'}
      />
      <CarouselControls
        onRight={() => carouselRef.current.snapToNext()}
        onLeft={() => carouselRef.current.snapToPrev()}
        count={data.length}
        onSelect={(index) => navigation.navigate('Single', {item: data[index]})}
      ></CarouselControls>
    </View>
  );
};

PostCarousel.propTypes = {
  data: PropTypes.array.isRequired,
};

export default React.memo(PostCarousel);
