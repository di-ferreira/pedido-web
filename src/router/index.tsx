import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MainLayout } from '../components/MainLayout';
import { Clientes } from '../pages/Clientes';
import { Orcamentos } from '../pages/Orcamentos';
import { PreVendas } from '../pages/PreVendas';
import { Vendas } from '../pages/Vendas';
import { isActiveLink } from '../utils';
import { Login } from '../pages/Login';

const RoutesPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          // isActiveLink('/') ? <Navigate to='/home' replace /> : <MainLayout />
          isActiveLink('/') ? <Login /> : <MainLayout />
        }
      >
        <Route path='home' element={<Home />} />
        <Route path='clientes' element={<Clientes />} />
        <Route path='orcamentos' element={<Orcamentos />} />
        <Route path='pre-vendas' element={<PreVendas />} />
        <Route path='vendas' element={<Vendas />} />
      </Route>
    </Routes>
  );
};

export default RoutesPage;
