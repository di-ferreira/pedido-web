import { Black, Gray, Light, Primary, Secondary } from '../colors';

export const LightTheme = {
  name: 'light',
  colors: {
    primary: Primary.main,
    secondary: Secondary.main,
    surface: Light.surface,
    background: Light.main,
    gray: Gray.Dark,
    onPrimary: Light.main,
    onSecondary: Light.main,
    onBackground: Black.text,
    onSurface: Black.text,
    onGray: Gray.Light,
  },
};
