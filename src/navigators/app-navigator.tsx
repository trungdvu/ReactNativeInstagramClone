import React, { ComponentProps } from 'react';
import { useColorMode } from 'native-base';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from 'consts';
import { HomeScreen, LaunchScreen, LoginScreen, SignupScreen } from 'screens';
import { navigationRef, useBackButtonHandler } from './navigation-utilities';

const Stack = createNativeStackNavigator();

interface AppNavigatorProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: AppNavigatorProps) => {
  useBackButtonHandler(canExit);
  const { colorMode } = useColorMode();

  const getNavigationTheme = (): Theme => {
    const navigationTheme = DefaultTheme;
    navigationTheme.colors.background =
      colorMode === 'dark' ? '#000000' : '#fafafa';

    return navigationTheme;
  };

  const getStatusBarStyle = (): StatusBarStyle => {
    return colorMode === 'dark' ? 'light' : 'dark';
  };

  return (
    <NavigationContainer
      theme={getNavigationTheme()}
      ref={navigationRef}
      {...props}
    >
      <StatusBar style={getStatusBarStyle()} />
      <Stack.Navigator
        initialRouteName={ScreenName.Launch}
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
        <Stack.Screen name={ScreenName.Launch} component={LaunchScreen} />
        <Stack.Screen name={ScreenName.Login} component={LoginScreen} />
        <Stack.Screen name={ScreenName.Signup} component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const exitRoutes = [ScreenName.Home];

export const canExit = (routeName: ScreenName) =>
  exitRoutes.includes(routeName);
