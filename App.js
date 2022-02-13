import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalProvider } from './context/GlobalContext';
import Navigator from './navigation/Navigator';

export default function App() {
  return (
    <GlobalProvider>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </GlobalProvider>
  );
}
