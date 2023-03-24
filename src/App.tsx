import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RoutesPage from './router';
import GlobalStyle from './GlobalStyle';
import { AppThemeProvider } from './hooks/useTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <BrowserRouter>
        <GlobalStyle />
        <RoutesPage />
      </BrowserRouter>
    </AppThemeProvider>
  </React.StrictMode>
);
