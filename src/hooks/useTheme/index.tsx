import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from '../../themes';

type Mode = 'light' | 'dark';

interface iThemeContextData {
  ThemeName: Mode;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as iThemeContextData);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isBrowserDefaultDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    let themeResult: Mode = localStorageTheme
      ? (localStorageTheme as Mode)
      : browserDefault;
    return themeResult;
  };

  const [ThemeName, setThemeName] = useState<Mode>(getDefaultTheme() as Mode);

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      return oldThemeName === 'light' ? 'dark' : 'light';
    });
    localStorage.setItem('theme', ThemeName === 'light' ? 'dark' : 'light');
  }, [ThemeName]);

  const theme = useMemo(() => {
    if (ThemeName === 'light') return LightTheme;
    return DarkTheme;
  }, [ThemeName]);

  return (
    <ThemeContext.Provider value={{ ThemeName, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
