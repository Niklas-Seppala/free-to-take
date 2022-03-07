import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalProvider } from './context/GlobalContext';
import Navigator from './navigation/Navigator';
import Toast from 'react-native-toast-message';



export default function App() {
  console.log(' ---------------------- APP RENDER ----------------------');
  return (
    <>
    <GlobalProvider>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </GlobalProvider>
    <Toast/>
    </>
  );
}
