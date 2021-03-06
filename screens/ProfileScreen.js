import {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import useLogout from '../hooks/api/useLogout';
import UserInfo from '../components/UserInfo';
import {GlobalContext} from '../context/GlobalContext';
import colors from '../utils/colors';
import useMyPosts from '../hooks/api/useMyPosts';
import MiniContentList from '../components/MiniContentList';

const ProfileScreen = ({navigation}) => {
  const user = useContext(GlobalContext).user;
  const [posts, loading] = useMyPosts();
  const logout = useLogout();

  return (
    <View style={styles.container}>
      <UserInfo user={user} />
      <MiniContentList navigation={navigation} loading={loading} data={posts} />
      <View style={{flexDirection: 'row'}}>
        <Button
          buttonStyle={[styles.button, {marginRight: 15}]}
          onPress={() => navigation.navigate('EditProfile')}
          title={'Edit profile'}
        />
        <Button
          buttonStyle={styles.button}
          title="Log out"
          onPress={() => logout()}
        />
      </View>
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
    flex: 1,
    alignItems: 'center',
  },
});

export default ProfileScreen;
