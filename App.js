import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './navigation/Navigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
}
