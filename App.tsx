import { LogBox } from 'react-native';
import { AppNavigator } from 'navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { theme } from 'theme';
import { cometChatConfig } from 'configs';
import { useEffect } from 'react';
import { logd } from 'shared';

const TAG = 'APP';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export default function App() {
  useEffect(() => {
    initCometChat();
  }, []);

  const initCometChat = async () => {
    const appID = `${cometChatConfig.cometChatAppId}`;
    const region = `${cometChatConfig.cometChatRegion}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        logd(TAG, `CometChat was initialized successfully`);
      },
      (error) => {
        logd(TAG, `Initialization failed with error:${error}`);
      }
    );
  };

  return (
    <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

LogBox.ignoreLogs(['NativeBase:', 'Require cycle:', 'AsyncStorage', 'Setting a timer']);
