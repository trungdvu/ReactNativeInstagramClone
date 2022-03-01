import { LogBox } from 'react-native';
import { AppNavigator } from 'navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { theme } from 'theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

LogBox.ignoreLogs(['NativeBase:']);
