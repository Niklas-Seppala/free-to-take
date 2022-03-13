import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card} from 'react-native-elements';
import {CATEGORY_TAGS} from '../utils/api';
import CategoryTag from './CategoryTag';

export default function TagSelector({onChange}) {
  const [current, setCurrent] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView persistentScrollbar horizontal style={styles.scroll}>
        {CATEGORY_TAGS.map((tag) => (
          <CategoryTag
            enabled={current === tag.tag}
            key={tag.tag}
            tag={tag}
            onPress={(active) => {
              setCurrent(current === tag.tag ? '' : tag.tag);
              onChange?.call(this, active, tag.tag);
            }}
          />
        ))}
      </ScrollView>
      <Card.Divider style={{marginBottom: 0}}></Card.Divider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  scroll: {
    paddingBottom: 10,
  },
});
