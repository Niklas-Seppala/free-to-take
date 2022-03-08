import React, {useContext, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, Button, Avatar} from 'react-native-elements';
import {client, routes, setJWT} from '../utils/api';
import {View} from 'react-native';
import Time from './DateTime';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {getToken} from '../utils/storage';
import {GlobalContext} from '../context/GlobalContext';


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
export default function MiniContentListItem({
  item,
  index,
  onFocus,
  navigation,
}) {
  const {apiActionComplete} = useContext(GlobalContext);
  const [delAction, setDelAction] = useState(false);
  
  return (
    <View
      style={{
        marginTop: index === 0 ? 0 : 10,
        borderWidth: 1,
        borderColor: colors.main,
        borderRadius: 5,
        overflow: 'hidden',
      }}
    >
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <Avatar size={130} source={{uri: routes.uploads.file(item.filename)}} />

        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, marginLeft: 10}}>{item.title}</Text>

          <View style={styles.panel}>
            <Button
              containerStyle={{marginRight: 10}}
              buttonStyle={styles.button}
              icon={{name: 'comment', size: 20, color: colors.light}}
              onPress={() => {
                console.log('COMMENTS');
              }}
            />
            <Button
              containerStyle={{marginRight: 10}}
              buttonStyle={styles.button}
              icon={{name: 'edit', size: 20, color: colors.light}}
              onPress={() => {
                navigation.navigate('EditPost', {item: item});
              }}
            />
            <Button
              loadingProps={{size: 20}}
              loading={delAction}
              containerStyle={{marginRight: 10}}
              buttonStyle={styles.button}
              icon={{name: 'delete', size: 20, color: colors.light}}
              onPress={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure you want to delete this post?',
                  [
                    {text: 'cancel', style: 'cancel'},
                    {
                      text: 'ok',
                      onPress: async () => {
                        try {
                          setDelAction(true);
                          const token = await getToken();
                          await client.delete(
                            routes.media.delete(item.file_id),
                            {headers: setJWT(token)}
                          );
                          apiActionComplete();
                          setDelAction(false);
                        } catch (error) {
                          setDelAction(false);
                          console.error(error);
                        }
                      },
                      style: 'cancel',
                    },
                  ]
                );
              }}
            />
            <Button
              containerStyle={{marginRight: 10}}
              buttonStyle={styles.button}
              icon={{name: 'chevron-right', size: 20, color: colors.light}}
              onPress={() => onFocus?.call(this, item)}
            />
          </View>
          <View style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 10}}>
            <Time ISOString={item.time_added}></Time>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
  },
  panel: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

MiniContentListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};
