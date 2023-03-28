import { createContext, useContext, useEffect, useState } from 'react';
import { iTokenPayload, iUserLogin } from '../../@types/index';
import api from '../../services';
import jwtDecode from 'jwt-decode';
import { AddZeros } from '../../utils';
import { Navigate } from 'react-router-dom';

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
  const TOKEN_NAME_STORE = '@PWEMSoftToken';

  const [isError, setIsError] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const VerifyToken = (token: string | null): boolean => {
    if (token === null) return false;
    const expirationDate = jwtDecode<iTokenPayload>(token).Validade;
    let today = new Date();

    let todayFormated =
      today.getUTCDate() +
      '/' +
      AddZeros(today.getUTCMonth() + 1, 2) +
      '/' +
      today.getUTCFullYear();

    return todayFormated === expirationDate.toString();
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_NAME_STORE);
    setIsLogged(VerifyToken(token));
  }, []);

  const loginUser = async (user: iUserLogin) => {
    setIsError(false);
    setIsLoading(true);
    api
      .post('/login/atendente', user)
      .then(async (response) => {
        const userLogin = response.data;
        setIsLogged(VerifyToken(userLogin.value));
        localStorage.setItem(TOKEN_NAME_STORE, JSON.stringify(userLogin.value));
      })
      .catch((error) => {
        console.log(error);
        if (!error?.response) {
          setErrorMsg('Sem resposta do servidor');
        } else if (error.response?.status === 400) {
          setErrorMsg('Usuario ou senha incorreta');
        } else if (error.response?.status === 401) {
          setErrorMsg('não autorizado');
        } else {
          setErrorMsg('Falha ao realizar login');
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem(TOKEN_NAME_STORE);
    setIsLogged(false);
  };

  return (
    <LoginContext.Provider
      value={{ loginUser, isLoading, isLogged, logoutUser, errorMsg, isError }}
    >
      {children}
    </LoginContext.Provider>
  );
};
