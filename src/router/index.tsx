import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MainLayout } from '../components/MainLayout';
import { Clientes } from '../pages/Clientes';
import { Orcamentos } from '../pages/Orcamentos';
import { PreVendas } from '../pages/PreVendas';
import { Vendas } from '../pages/Vendas';
import { Login } from '../pages/Login';
import { LoginProvider } from '../hooks/useLogin';
import PrivateRoute from './PrivateRoutes';
import { Logout } from '../pages/Logout';

const RoutesPage: React.FC = () => {
  return (
    <LoginProvider>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='' element={<Navigate to='home' />} />
            <Route path='logout' element={<Logout />} />
            <Route path='home' element={<Home />} />
            <Route path='clientes' element={<Clientes />} />
            <Route path='orcamentos' element={<Orcamentos />} />
            <Route path='pre-vendas' element={<PreVendas />} />
            <Route path='vendas' element={<Vendas />} />
          </Route>
        </Route>
      </Routes>
    </LoginProvider>
  );
};

export default RoutesPage;
