import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text, Image, Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { routes } from '../utils/api';

const CarouselCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image
        containerStyle={{ width: '100%', height: 300 }}
        source={{ uri: routes.uploads.file(item.thumbnails.w640) }}
      ></Image>
      <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
        <Text h3>{`${item.title}`}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  );
};

const PostCarousel = ({ data, style }) => {
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const carouselRef = React.createRef();

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
          icon={{ name: 'chevron-left', size: 40, color: 'white' }}
          onPress={() => carouselRef.current.snapToPrev()}
        ></Button>
        <Button
          buttonStyle={{ backgroundColor: '#5dd455', paddingVertical: 10 }}
          title="Reserver"
        ></Button>
        <Button
          buttonStyle={styles.button}
          icon={{ name: 'chevron-right', size: 40, color: 'white' }}
          onPress={() => carouselRef.current.snapToNext()}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    marginBottom: 10,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    padding: 0,
    backgroundColor: '#5dd455',
  },
});

export default PostCarousel;
