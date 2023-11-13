import { Black, Dark, Gray, Light, Primary, Secondary } from '../colors';

export const DarkTheme = {
  name: 'dark',
  colors: {
    primary: Primary.main,
    secondary: Secondary.main,
    background: Black.main,
    surface: Dark.main,
    gray: Gray.Dark,
    onPrimary: Light.main,
    onSecondary: Light.main,
    onBackground: Light.main,
    onSurface: Light.main,
    onGray: Gray.Light,
  },
};
