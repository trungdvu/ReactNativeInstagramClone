import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import {
  PartialState,
  NavigationAction,
  NavigationState,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { ScreenName } from 'consts';

export const RootNavigation = {
  navigate(_name: string, _params?: any) {},
  goBack() {},
  resetRoot(_state?: PartialState<NavigationState> | NavigationState) {},
  getRootState(): NavigationState {
    return {} as any;
  },
  dispatch(_action: NavigationAction) {},
};

export const navigationRef = createNavigationContainerRef();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
) {
  const route = state.index ? state.routes[state.index] : undefined;

  if (!route?.state) {
    return route?.name;
  }

  return getActiveRouteName(route.state);
}

export function useBackButtonHandler(
  canExit: (routeName: ScreenName) => boolean
) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (canExitRef.current(routeName)) {
        BackHandler.exitApp();
        return true;
      } else if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isRestored, setIsRestored] = useState(!__DEV__);
  const routeNameRef = useRef<string | undefined>();

  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.log(currentRouteName);
    }

    routeNameRef.current = currentRouteName;

    storage.save(persistenceKey, state);
  };

  const restoreState = async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) {
        setInitialNavigationState(state);
      }
    } finally {
      setIsRestored(true);
    }
  };

  useEffect(() => {
    if (!isRestored) {
      restoreState();
    }
  }, [isRestored]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}

export function navigate(name: ScreenName, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}

export function replace(name: ScreenName, params?: any) {
  navigationRef.dispatch(StackActions.replace(name, params));
}

export function popToTop() {
  navigationRef.dispatch(StackActions.popToTop());
}

export function resetWithScreen(name: ScreenName, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name, params }],
    });
  }
}

export function resetWithScreens(names: ScreenName[], params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: names.map((name) => ({ name, params })),
    });
  }
}
