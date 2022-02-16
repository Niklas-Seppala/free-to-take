import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { routes } from '../utils/api';
import MiniProfile from './MiniProfile';

export default function CarouselCard({ item }) {
  const datetime = new Date(item.time_added);

  return (
    <View style={styles.card}>
      <MiniProfile user={item.owner}></MiniProfile>
      <Image
        style={styles.image}
        source={{ uri: routes.uploads.file(item.thumbnails.w640) }}
      ></Image>
      <View style={styles.details}>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', borderColor: 'black', borderBottomWidth: 1,  padding: 10, justifyContent: 'space-between'}}>
          <Text h3 style={{color: '#242624'}}>{item.title}</Text>
          <View>
          <Text style={styles.timestr}>{datetime.toLocaleTimeString()}</Text>
          <Text style={styles.timestr}>{datetime.toLocaleDateString()}</Text>
          </View>
        </View>
        <Text style={{margin: 10}}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 400,
  },
  details: {
    flex: 1,
    width: '100%',
    marginBottom: 63,
  },
  timestr: {
    color: '#888',
    fontStyle: 'italic'
  }
});
