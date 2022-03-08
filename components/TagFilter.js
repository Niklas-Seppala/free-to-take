import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { CATEGORY_TAGS } from '../utils/api';
import CategoryTag from './CategoryTag';
import PropTypes from 'prop-types';
import { Card } from 'react-native-elements';

/**
 * @param {{onChange: (boolean, string) => void}} props 
 */
export default function TagFilter({ onChange }) {
  return (
    <View style={styles.container}>
      <ScrollView persistentScrollbar horizontal style={{paddingBottom: 10}}>
        {CATEGORY_TAGS.map((tag) => (
          <CategoryTag
            key={tag.tag}
            tag={tag}
            onPress={(active) => onChange?.call(this, active, tag.tag)}
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
    paddingTop: 10
  },
});

TagFilter.propTypes = {
  onChange: PropTypes.func.isRequired
}