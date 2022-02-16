import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import CarouselCard from './CarouselCard';

const PostCarousel = ({ data, style }) => {
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const carouselRef = React.createRef();

  if (data.length === 0)  {
    return (
      <View style={[style, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text>Nothing here</Text>
      </View>
    )
  }
  
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
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          icon={{ name: 'chevron-left', size: 40, color: '#daf2d3' }}
          onPress={() => carouselRef.current.snapToPrev()}
        ></Button>
        <Button
          buttonStyle={{ backgroundColor: '#6ab07c', paddingVertical: 10 }}
          title={<Text style={{color: '#daf2d3'}}>Reserve</Text>}
        ></Button>
        <Button
          buttonStyle={styles.button}
          icon={{ name: 'chevron-right', size: 40, color: '#daf2d3' }}
          onPress={() => carouselRef.current.snapToNext()}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    padding: 0,
    backgroundColor: '#5ba86f',
  },
});

export default PostCarousel;
