import { createContext, useContext, useEffect, useState } from 'react';
import { iCurrentUser, iTokenPayload, iUserLogin } from '../../@types/index';
import api from '../../services';
import jwtDecode from 'jwt-decode';
import { AddZeros } from '../../utils';

type iStateLogin = {
  isLogged: boolean;
  isError: boolean;
  errorMsg: string;
  isLoading: boolean;
  currentUser: iCurrentUser;
  loginUser: (user: iUserLogin) => void;
  logoutUser: () => void;
};

const LoginContext = createContext({} as iStateLogin);

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const TOKEN_NAME_STORE = '@PWEMSoftToken';
  const USER_NAME_STORE = '@PWEMSoftUser';

  const [isError, setIsError] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState<iCurrentUser>(
    {} as iCurrentUser
  );

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

    setCurrentUser({
      username: jwtDecode<iTokenPayload>(token).Usuario,
      level: parseInt(jwtDecode<iTokenPayload>(token).Nivel),
      type: jwtDecode<iTokenPayload>(token).Tipo,
      group: jwtDecode<iTokenPayload>(token).Grupo,
    });

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
        console.log(jwtDecode<iTokenPayload>(userLogin.value));
        setCurrentUser({
          username: jwtDecode<iTokenPayload>(userLogin.value).Usuario,
          level: parseInt(jwtDecode<iTokenPayload>(userLogin.value).Nivel),
          type: jwtDecode<iTokenPayload>(userLogin.value).Tipo,
          group: jwtDecode<iTokenPayload>(userLogin.value).Grupo,
        });

        localStorage.setItem(TOKEN_NAME_STORE, JSON.stringify(userLogin.value));

        localStorage.setItem(
          USER_NAME_STORE,
          JSON.stringify(jwtDecode<iTokenPayload>(userLogin.value))
        );
        api.defaults.headers.common['Authorization'] =
          'Bearer ' + userLogin.value;
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
    localStorage.removeItem(USER_NAME_STORE);
    api.defaults.headers.common['Authorization'] = undefined;
    setIsLogged(false);
  };

  return (
    <LoginContext.Provider
      value={{
        loginUser,
        isLoading,
        isLogged,
        logoutUser,
        errorMsg,
        isError,
        currentUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
