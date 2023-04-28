import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RoutesPage from './router';
import { AppThemeProvider } from './hooks/useTheme';
import { QueryClientProvider, QueryClient } from 'react-query';
import GlobalStyle from './GlobalStyle';
import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <BrowserRouter basename='/pedido-web'>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <RoutesPage />
        </QueryClientProvider>
      </BrowserRouter>
    </AppThemeProvider>
  </React.StrictMode>
);
