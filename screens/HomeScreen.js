import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalContext';
import useFormLogin from '../hooks/api/useFormLogin';
import useLogout from '../hooks/api/useLogout';
import useTokenLogin from '../hooks/api/useTokenLogin';
import { getToken } from '../utils/storage';

import Carousel from 'react-native-snap-carousel';

const LoginScreen = () => {
  // THIS IS A DEMO.

  const { user, isAuthenticated, token } = useContext(GlobalContext);
  const loginWithForm = useFormLogin();
  const loginWithToken = useTokenLogin();
  const logout = useLogout();

  // Try to log in with JWT.
  useEffect(async () => loginWithToken(await getToken()), []);

  const ref = React.createRef();
  // ref.current.


  return (
    <View style={{marginTop: 20}}>
      <Carousel
      scrollEnabled={false}
        ref={ref}
        data={[{ text: 'Item' }, { text: 'Item' }, { text: 'Item' }, { text: 'Item' }, { text: 'Item' }, { text: 'Item' }]}
        sliderWidth={413}
        itemWidth={380}
        layoutCardOffset={18}
        renderItem={({item, index}) => (
          <View style={{height: 630, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8fd660'}}>
            <Text h1>{`${item.text} ${index}`}</Text>
          </View>
        )}
        layout={'default'}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15}}>
        <Button icon={{name: 'arrow-left', size: 40, color: 'white'}} onPress={() => {ref.current.snapToPrev()}}></Button>
        <Button icon={{name: 'arrow-right', size: 40, color: 'white'}} onPress={() => {ref.current.snapToNext()}}></Button>
      </View>
    </View>
  );

  return (
    <View>
      {isAuthenticated ? (
        <View>
          <Text>{user?.username}</Text>
          <Text>{token}</Text>
          <Button title="logout" onPress={() => logout()}></Button>
        </View>
      ) : (
        <View>
          <Button
            title="login"
            onPress={() =>
              loginWithForm({ username: 'nikke-nakke', password: 'salainen-sana' })
            }
          ></Button>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
