import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RoutesPage from './router';
import GlobalStyle from './GlobalStyle';
import { AppThemeProvider } from './hooks/useTheme';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <BrowserRouter>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <RoutesPage />
        </QueryClientProvider>
      </BrowserRouter>
    </AppThemeProvider>
  </React.StrictMode>
);
