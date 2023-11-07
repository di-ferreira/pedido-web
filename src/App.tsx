import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalStyle from './GlobalStyle';
import { AppThemeProvider } from './hooks/useTheme';
import RoutesPage from './router';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <Provider store={store}>
        <HashRouter>
          <GlobalStyle />
          <RoutesPage />
        </HashRouter>
      </Provider>
    </AppThemeProvider>
  </React.StrictMode>
);

