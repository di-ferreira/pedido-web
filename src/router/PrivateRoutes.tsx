import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin/index';

const PrivateRoute = () => {
  const { isLogged } = useLogin();
  const location = useLocation();
  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateRoute;
