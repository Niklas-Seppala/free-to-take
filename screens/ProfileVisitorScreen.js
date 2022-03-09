import { StyleSheet, View } from 'react-native';
import UserInfo from '../components/UserInfo';
import { useUsersPosts } from '../hooks/api/useMyPosts';
import MiniContentList from '../components/MiniContentList';
import colors from '../utils/colors';
export function ProfileVisitorScreen({ route, navigation }) {
  const user = route?.params?.user;
  const [posts, loading] = useUsersPosts(user);

  return (
    <View style={styles.container}>
      <UserInfo visitor={true} user={user} />
      <MiniContentList style={{flex: 4}} navigation={navigation} visitor={true} loading={loading} data={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.main,
      marginTop: 10,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
    },
  });
  
