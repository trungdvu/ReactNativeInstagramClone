import React, { ComponentProps } from 'react';
import { useColorMode } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from 'consts';
import { HomeScreen } from 'screens';
import { navigationRef, useBackButtonHandler } from './navigation-utilities';

const Stack = createNativeStackNavigator();

interface AppNavigatorProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: AppNavigatorProps) => {
  useBackButtonHandler(canExit);
  const { colorMode } = useColorMode();

  const getNavigationTheme = () => {
    const navigationTheme = DefaultTheme;
    navigationTheme.colors.background =
      colorMode === 'dark' ? '#000000' : '#fafafa';

    return navigationTheme;
  };

  return (
    <NavigationContainer
      theme={getNavigationTheme()}
      ref={navigationRef}
      {...props}
    >
      <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName={ScreenName.Home}
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const exitRoutes = [ScreenName.Home];

export const canExit = (routeName: ScreenName) =>
  exitRoutes.includes(routeName);
