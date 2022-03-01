import React, { ComponentProps } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from 'consts';
import { HomeScreen } from 'screens';
import { navigationRef, useBackButtonHandler } from './navigation-utilities';

const Stack = createNativeStackNavigator();

interface AppNavigatorProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: AppNavigatorProps) => {
  useBackButtonHandler(canExit);

  return (
    <NavigationContainer ref={navigationRef} {...props}>
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
