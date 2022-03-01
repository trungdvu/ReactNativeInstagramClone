import { extendTheme } from 'native-base';
import { colors } from './colors';

export const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'light',
  },
});

type TCustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends TCustomThemeType {}
}
