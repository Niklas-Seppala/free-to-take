import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, Avatar, Icon} from 'react-native-elements';
import colors from '../utils/colors';
import Toast from 'react-native-toast-message';
import useAvatar from '../hooks/api/useAvatar';

export default function UserInfo({user}) {
  const avatar = useAvatar(user);
  const showAvatarTapToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Tap and hold to change your profile picture',
    });
  };

  const initiateProfilePictureChange = () => {
    Toast.show({
      type: 'info',
      text1: 'TODO: implement profile picture change',
    });
  };

  return (
    <View
      style={{alignItems: 'center', width: '100%', marginBottom: 80, flex: 1}}
    >
      <View style={styles.backgroundCircle}></View>
      <Avatar
        containerStyle={{backgroundColor: 'white'}}
        rounded
        size={100}
        onPress={showAvatarTapToast}
        onLongPress={initiateProfilePictureChange}
        source={avatar}
      />

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
    color: colors.main,
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
    borderRadius: 1500,
    position: 'absolute',
    top: -Dimensions.get('window').width * 1.53,
  },
});
