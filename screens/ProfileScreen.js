import {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import useLogout from '../hooks/api/useLogout';
import EditProfileForm from '../components/EditProfileForm';
import UserInfo from '../components/UserInfo';
import {GlobalContext} from '../context/GlobalContext';
import colors from '../utils/colors';

const ProfileScreen = () => {
  const logout = useLogout();
  const {user} = useContext(GlobalContext);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <View style={styles.container}>
      {/* user info */}
      {!isEditingProfile ? (
        <UserInfo user={user} />
      ) : (
        <EditProfileForm
          onEditSuccess={() => {
            setIsEditingProfile(false);
          }}
        />
      )}

      <Divider />
      {!isEditingProfile ? (
        <>
          <Button
            buttonStyle={styles.button}
            onPress={() => {
              setIsEditingProfile(!isEditingProfile);
            }}
            title={'Edit profile'}
          ></Button>

          <Button
            buttonStyle={styles.button}
            title="Log out"
            onPress={() => logout()}
          ></Button>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 150,
    backgroundColor: colors.main,
    borderRadius: 24,
    marginVertical: 9,
    paddingVertical: 11,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ProfileScreen;
