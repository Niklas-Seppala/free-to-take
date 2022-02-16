import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { routes } from '../utils/api';
import CardHeader from './CardHeader';
import MiniProfile from './MiniProfile';

/**
 * @param {{item: {
 *  description: string,
 *  file_id: number,
 *  filename: string,
 *  media_type: string,
 *  owner: {
 *    email: string,
 *    user_id: string,
 *    username: string
 *  },
 *  screenshot: string,
 *  thumbnails: {
 *    w160: string,
 *    w320: string,
 *    w640: string
 *  },
 *  time_added: string,
 *  title: string}}} _
 */
export default function CarouselCard({ item }) {
  return (
    <View style={styles.card}>
      <CardHeader item={item}></CardHeader>
      <Image
        style={styles.image}
        source={{ uri: routes.uploads.file(item.thumbnails.w640) }}
      ></Image>
      <View style={styles.details}>
        <Card.Divider style={{ paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => console.log('TODO: Move to profile')}>
            <MiniProfile user={item.owner} />
          </TouchableOpacity>
        </Card.Divider>
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    width: '100%',
    height: 400,
  },
  details: {
    flex: 1,
    width: '100%',
    marginBottom: 63,
  },
});
