import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalStyle from './GlobalStyle';
import { AppThemeProvider } from './hooks/useTheme';
import RoutesPage from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <HashRouter>
        <GlobalStyle />
        <RoutesPage />
      </HashRouter>
    </AppThemeProvider>
  </React.StrictMode>
);

