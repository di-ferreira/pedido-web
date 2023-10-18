import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '../components/MainLayout';
import { LoginProvider } from '../hooks/useLogin';
import { useTheme } from '../hooks/useTheme';
import { Clientes } from '../pages/Clientes';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Logout } from '../pages/Logout';
import { NotFound } from '../pages/NotFound';
import { Orcamentos } from '../pages/Orcamentos';
import { PreVendas } from '../pages/PreVendas';
import { Vendas } from '../pages/Vendas';
import PrivateRoute from './PrivateRoutes';

const RoutesPage: React.FC = () => {
  const { ThemeName } = useTheme();
  return (
    <LoginProvider>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={ThemeName}
      />
      <Routes>
        <Route path='' element={<MainLayout />}>
          <Route path='login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='' element={<Navigate to='home' />} />
            <Route path='logout' element={<Logout />} />
            <Route path='home' element={<Home />} />
            <Route path='clientes' element={<Clientes />} />
            <Route path='orcamentos' element={<Orcamentos />} />
            <Route path='pre-vendas' element={<PreVendas />} />
            <Route path='vendas' element={<Vendas />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </LoginProvider>
  );
};

export default RoutesPage;
