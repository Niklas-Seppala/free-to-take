import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, ListItem, Text, Button, Avatar, Icon} from 'react-native-elements';
import {routes} from '../utils/api';
import {View} from 'react-native';
import Time from './DateTime';
import colors from '../utils/colors';
import PropTypes from 'prop-types'

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
export default function MiniContentListItem({item, index, onFocus}) {
  return (
    <View>
      <View style={{width: '100%', flexDirection: 'row'}}>
      <Avatar size={80} source={{uri: routes.uploads.file(item.filename)}}></Avatar>

      <View style={{flex: 1}}>

      <View style={{flexDirection: 'row',  flex: 1, paddingHorizontal: 5, justifyContent: 'space-between', alignSelf: 'flex-start', alignItems: 'center'}}>
        <Text style={{fontSize: 22}}>{item.title}</Text>
        <Time ISOString={item.time_added}></Time>
      </View>

      <View style={{flexDirection: 'row', paddingHorizontal: 5, marginTop: 15, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Icon name='comment' size={30}></Icon>
        <Icon name='home' size={30}></Icon>
      </View>

      </View>
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
    marginTop: 5
  }
});

MiniContentListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
}
