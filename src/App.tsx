import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RoutesPage from "./router";
import GlobalStyle from './GlobalStyle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle/>
      <RoutesPage />
    </BrowserRouter>
  </React.StrictMode>,
)