import { createContext, useContext, useEffect, useState } from 'react';
import { iUserLogin } from '../../@types/index';
import api from '../../services';
import jwtDecode from 'jwt-decode';

type iStateUser = {
  isLogged: boolean;
  isError: boolean;
  errorMsg: string;
  isLoading: boolean;
  loginUser: (user: iUserLogin) => void;
  logoutUser: () => void;
};

const LoginContext = createContext({} as iStateUser);

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Token, setToken] = useState('');

  const [isError, setIsError] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('@PWEMSoft');
    setIsLogged(token ? true : false);
  }, []);

  const loginUser = async (user: iUserLogin) => {
    api
      .post('/login/atendente', user)
      .then(async (response) => {
        setIsLoading(true);
        const userLogin = response.data;
        setToken(userLogin.value);

        console.log('token =>', userLogin);

        console.log('token decoded=>', jwtDecode(userLogin.value));

        localStorage.setItem('@PWEMSoft', JSON.stringify(userLogin.value));
      })
      .catch((error) => {
        setErrorMsg(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logoutUser = () => {};

  return (
    <LoginContext.Provider
      value={{ loginUser, isLoading, isLogged, logoutUser, errorMsg, isError }}
    >
      {children}
    </LoginContext.Provider>
  );
};
