import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, Avatar, Icon} from 'react-native-elements';
import colors from '../utils/colors';
import * as ImagePickerUtil from 'expo-image-picker';

import useAvatar from '../hooks/api/useAvatar';
import {getToken} from '../utils/storage';
import {handleFetch, extractFileExt, extractFilename} from '../utils/forms';
import {client, routes, setJWT} from '../utils/api';
import {useContext} from 'react';
import {GlobalContext} from '../context/GlobalContext';


const postAvatar = async (img, user, avatar, onSuccess) => {
  const token = await getToken();

  try {
    await client.delete(routes.media.delete(avatar), {headers: setJWT(token)});
  } catch (error) {}

  const formData = new FormData();
  const filename = extractFilename(img.uri);
  const fExtension = extractFileExt(filename);
  const mimetype = `${img.type}/${fExtension === 'jpg' ? 'jpeg' : fExtension}`;

  const upload = {
    uri: img.uri,
    name: filename,
    type: mimetype,
  };

  formData.append('file', upload);
  const options = {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  };
  const result = await handleFetch(routes.media.uploads, options);
  if (Object.hasOwnProperty.call(result, 'file_id')) {
    const options = {headers: setJWT(token)};
    const avatarTag = {
      file_id: result.file_id,
      tag: `avatar_${user.user_id}`,
    };
    const res = await client.post(routes.tag.create, avatarTag, options);
    if (res.status === 201) {
      onSuccess();
    }
  }
};

export default function UserInfo({user, visitor}) {
  const [avatar, avatarId] = useAvatar(user);
  const {apiActionComplete} = useContext(GlobalContext);

  return (
    <View
      style={{alignItems: 'center', width: '100%', marginBottom: 80, flex: 1}}
    >
      <View style={styles.backgroundCircle}></View>
      {visitor && (
        <Avatar
          containerStyle={{backgroundColor: 'white'}}
          rounded
          size={100}
          onPress={async () => {
            const img = await ImagePickerUtil.launchImageLibraryAsync({
              mediaTypes: ImagePickerUtil.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 0.7,
            });

            if (!img.cancelled) {
              console.log(img);
              await postAvatar(img, user, apiActionComplete);
            }
          }}
          source={avatar}
        />
      )}
      {!visitor && (
        <View>
          <Avatar
            containerStyle={{backgroundColor: 'white'}}
            rounded
            size={100}
            onPress={async () => {
              const img = await ImagePickerUtil.launchImageLibraryAsync({
                mediaTypes: ImagePickerUtil.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 0.7,
              });

              if (!img.cancelled) {
                console.log(img);
                await postAvatar(img, user, avatarId, apiActionComplete);
              }
            }}
            source={avatar}
          />
          <View
            style={{
              justifyContent: 'center',
              right: 0,
              position: 'absolute',
              alignItems: 'center',
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'white',
            }}
          >
            <Icon name="photo" color={colors.dark}></Icon>
          </View>
        </View>
      )}

      <View style={{width: '100%'}}>
        <View style={styles.infoTextContainer}>
          <Icon
            style={{marginRight: 5}}
            name="person"
            color={colors.light}
          ></Icon>
          <Text style={styles.infoText}>{user.username}</Text>
        </View>

        <View style={styles.infoTextContainer}>
          <Icon
            style={{marginRight: 5}}
            name="mail"
            color={colors.light}
          ></Icon>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: colors.light,
  },

  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 0.5,
    width: '100%',
    color: '#3f3f3f',
  },
  iconContainerStyle: {
    width: '15%',
    marginLeft: '20%',
  },
  backgroundCircle: {
    alignSelf: 'center',
    backgroundColor: colors.main,
    height: Dimensions.get('window').width * 2,
    width: Dimensions.get('window').width * 2,
    borderRadius: 1200,
    position: 'absolute',
    top: -Dimensions.get('window').width * 1.53,
  },
});
