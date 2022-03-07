import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {routes} from '../utils/api';
import CarouselItemHeader from './CarouselItemHeader';
import MiniProfile from './MiniProfile';
import {PostPropType} from '../utils/appPropTypes';

/**
 * @param {{item: {
 *  description: string,
 *  file_id: number,
 *  filename: string,
 *  media_type: string,
 *  owner: {
 *    email: string,
 *    user_id: number,
 *    username: string
 *  },
 *  screenshot: string | undefined,
 *  thumbnails: {
 *    w160: string,
 *    w320: string,
 *    w640: string
 *  },
 *  time_added: string,
 *  title: string}}} props
 */
export default function CarouselItem({item}) {
  return (
    <View style={styles.card}>
      <CarouselItemHeader item={item}></CarouselItemHeader>
      <Image
        style={styles.image}
        source={{uri: routes.uploads.file(item.thumbnails.w640)}}
      ></Image>
      <View>
        <Card.Divider style={{marginBottom: 5}}>
          <TouchableOpacity onPress={() => console.log('Move to profile')}>
            <MiniProfile user={item.owner} />
          </TouchableOpacity>
        </Card.Divider>
        <Text style={{marginHorizontal: 5, fontSize: 18}}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

CarouselItem.propTypes = {item: PostPropType};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    flex: 1,
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    height: 350,
  },
});
