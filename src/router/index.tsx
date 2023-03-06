import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MainLayout } from '../components/MainLayout';
import { Clientes } from '../pages/Clientes';
import { Orcamentos } from '../pages/Orcamentos';
import { PreVendas } from '../pages/PreVendas';
import { Vendas } from '../pages/Vendas';

const RoutesPage: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
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
