import { LogBox } from 'react-native';
import { AppNavigator } from 'navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { theme } from 'theme';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export default function App() {
  return (
    <NativeBaseProvider theme={theme} config={config}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

LogBox.ignoreLogs(['NativeBase:', 'Require cycle:']);
