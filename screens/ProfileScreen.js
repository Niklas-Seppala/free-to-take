import { useContext, useState } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Card, Divider, Avatar, Icon } from 'react-native-elements';
import useLogout from '../hooks/api/useLogout';

import EditProfileForm  from '../components/EditProfileForm';
import UserInfo  from '../components/UserInfo';

import { GlobalContext } from '../context/GlobalContext';


const ProfileScreen = () => {
  const logout = useLogout();
  const { user } = useContext(GlobalContext);
  const [ isEditingProfile, setIsEditingProfile ] = useState(false);

  return (

    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <View style={styles.backgroundCircle}></View>
      <Avatar
        size={160}
        source={{ uri: 'https://www.placecage.com/c/800/800' }}
        containerStyle={{marginBottom: 20}}
        rounded
      />

      {/* user info */}
      {!isEditingProfile ? (<UserInfo user={user} />) : (<EditProfileForm onEditSuccess={() => {setIsEditingProfile(false)}}/>)}

      <Divider />
      {
        !isEditingProfile ? (
        <>
          <Button 
            buttonStyle={styles.button}
            onPress={() => {setIsEditingProfile(!isEditingProfile)}}
            title={"Edit profile"}
          >
          </Button>

          <Button
             buttonStyle={styles.button}
             title="Log out"
             onPress={() => logout()}
           >
           </Button>
        </>
        ) : (<></>)
      }
    </View>
  );
};
const styles = StyleSheet.create({
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
  cardContainerStyle: {
    width: '95%',
    //backgroundColor: 'rgba(96, 162, 23, 0.5)',
  },
  button: {
    backgroundColor: '#5F9A3B',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainerStyle: {
    width: '15%',
    marginLeft: '20%',
  },
  bold: {
    fontWeight: 'bold',
  },
  backgroundCircle: {
    backgroundColor: '#6ab07c',
    //backgroundColor: 'green',
    height: Dimensions.get('window').width * 2,
    width: Dimensions.get('window').width * 2,
    borderRadius: 1200,
    position: 'absolute',
    top: -Dimensions.get('window').width * 1.6,
  },
});


export default ProfileScreen;
