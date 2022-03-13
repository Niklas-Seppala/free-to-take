import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, ListItem, Text, Button} from 'react-native-elements';
import {routes} from '../utils/api';
import {View} from 'react-native';
import Time from './DateTime';
import MiniProfile from './MiniProfile';
import colors from '../utils/colors';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

/**
 * @param {{
 * index: number,
 * onFocus: (item) => void,
 * onProfilePress: (owner) => void,
 * item: {
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
export function ContentListItem({item, index, onFocus, onProfilePress}) {
  return (
    <View style={[styles.container, {marginTop: index === 0 ? 0 : 20}]}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Button
          onPress={() => onFocus?.call(this, item)}
          icon={{name: 'chevron-right', color: '#daf2d3', size: 30}}
          buttonStyle={{backgroundColor: colors.main, padding: 0}}
        />
      </View>
      <TouchableOpacity activeOpacity = { .5 }  onPress={() => onFocus?.call(this, item)}>
      <Image
       
        style={styles.img}
        source={{uri: routes.uploads.file(item.thumbnails.w640)}}
      />
      </TouchableOpacity>
      <View style={{flex: 1, padding: 5, paddingTop: 0}}>
        <View style={styles.panel}>
          <TouchableOpacity
            onPress={() => onProfilePress?.call(this, item.owner)}
          >
            <MiniProfile user={item.owner} />
          </TouchableOpacity>
          <Time ISOString={item.time_added}></Time>
        </View>
        <Card.Divider color={colors.main} style={styles.divider} />
        <ListItem.Subtitle style={styles.desc} numberOfLines={3}>
          {item.description}
        </ListItem.Subtitle>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.main,
    padding: 5,
  },
  title: {
    fontSize: 24,
    color: colors.light,
  },
  panel: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  img: {
    width: '100%',
    height: 300,
  },
  divider: {
    marginBottom: 0,
  },
  desc: {
    marginTop: 5,
  },
});

ContentListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
  onProfilePress: PropTypes.func.isRequired,
};
