import { useContext } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Divider, Avatar } from 'react-native-elements';
import useLogout from '../hooks/api/useLogout';

import { GlobalContext } from '../context/GlobalContext';


const ProfileScreen = () => {
  const logout = useLogout();
  const { user } = useContext(GlobalContext);
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Avatar
        size={128}
        source={{ uri: 'https://www.placecage.com/c/800/800' }}
        rounded
      />

      <Card containerStyle={styles.cardContainerStyle}>
        {/* user info */}
        <View>
          <View style={styles.vertical}>
            <Text style={styles.bold}>Full name</Text>
            <Text>{user.full_name}</Text>
          </View>

          <View style={styles.vertical}>
            <Text style={styles.bold}>User name</Text>
            <Text>{user.username}</Text>
          </View>

          <View style={styles.vertical}>
            <Text style={styles.bold}>Email</Text>
            <Text>{user.email}</Text>
          </View>
        </View>

        <View style={styles.vertical}>
          <Button title="Change password"></Button>
          <Button title="Delete account"></Button>
        </View>
      </Card>


      <Button title="Log out" onPress={() => logout()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainerStyle: {
    width: '95%',
    backgroundColor: 'rgba(96, 162, 23, 0.5)',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
