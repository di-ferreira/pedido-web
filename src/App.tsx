import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalStyle from './GlobalStyle';
import { AppThemeProvider } from './hooks/useTheme';
import RoutesPage from './router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <HashRouter>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <RoutesPage />
        </QueryClientProvider>
      </HashRouter>
    </AppThemeProvider>
  </React.StrictMode>
);
