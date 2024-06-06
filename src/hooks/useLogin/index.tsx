import jwtDecode from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { iCurrentUser, iTokenPayload, iVendaLogin } from '../../@types/Login';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services';
import { formatLocalDate } from '../../utils';
import {
    ROUTE_GET_VENDEDOR,
    ROUTE_LOGIN,
    ROUTE_LOGIN_VENDEDOR,
    TOKEN_NAME_STORE,
    USER_NAME_STORE,
    VENDA_LOGIN,
    VENDA_PASSWORD,
    VENDEDOR_STORE,
} from '../../utils/Constants';

type iStateLogin = {
    isLogged: boolean;
    isError: boolean;
    errorMsg: string;
    isLoading: boolean;
    currentUser: iCurrentUser;
    loginUser: (user: iVendaLogin) => void;
    logoutUser: () => void;
};

const LoginContext = createContext({} as iStateLogin);

export const useLogin = () => {
    return useContext(LoginContext);
};

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isError, setIsError] = useState(false);

    const [isLogged, setIsLogged] = useState(false);

    const [errorMsg, setErrorMsg] = useState<string>('');

    const [isLoading, setIsLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState<iCurrentUser>({} as iCurrentUser);

    const GenerateNewToken = async () => {
        api.defaults.headers.common.Authorization = undefined;
        let VendedorLocal: iVendedor;
        api.post(ROUTE_LOGIN, {
            usuario: VENDA_LOGIN,
            senha: VENDA_PASSWORD,
        })
            .then(async (response) => {
                const userLogin = response.data;
                api.defaults.headers.common.Authorization = `bearer ${userLogin.value}`;

                setCurrentUser({
                    username: jwtDecode<iTokenPayload>(userLogin.value).Usuario,
                    level: parseInt(jwtDecode<iTokenPayload>(userLogin.value).Nivel),
                    type: jwtDecode<iTokenPayload>(userLogin.value).Tipo,
                    group: jwtDecode<iTokenPayload>(userLogin.value).Grupo,
                });

                localStorage.setItem(TOKEN_NAME_STORE, JSON.stringify(userLogin.value));

                localStorage.setItem(
                    USER_NAME_STORE,
                    JSON.stringify({
                        ...jwtDecode<iTokenPayload>(userLogin.value),
                    }),
                );

                VendedorLocal = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));
            })
            .finally(async () => {
                if (VendedorLocal.VENDEDOR) {
                    const DataVendedor = await api.get(
                        `${ROUTE_GET_VENDEDOR}(${VendedorLocal.VENDEDOR})`,
                    );
                    const vendedor: iVendedor = DataVendedor.data;
                    vendedor.SENHA = '';
                    setCurrentUser({
                        ...currentUser,
                        vendedor,
                    });
                    localStorage.setItem(VENDEDOR_STORE, JSON.stringify(vendedor));
                }
            });
    };

    const VerifyToken = (token: string | null): boolean => {
        if (token === null) return false;

        const [day, month, year] = jwtDecode<iTokenPayload>(token).Validade.split('/');

        const expirationDate = new Date(`${month}/${day}/${year}`);

        const today = new Date();
        GenerateNewToken();

        setCurrentUser({
            username: jwtDecode<iTokenPayload>(token).Usuario,
            level: parseInt(jwtDecode<iTokenPayload>(token).Nivel),
            type: jwtDecode<iTokenPayload>(token).Tipo,
            group: jwtDecode<iTokenPayload>(token).Grupo,
        });

        return (
            formatLocalDate(expirationDate.toString(), 'dd/MM/yyyy') >=
            formatLocalDate(today.toString(), 'dd/MM/yyyy')
        );
    };

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_NAME_STORE);
        setIsLogged(false);
        if (VerifyToken(token)) {
            setIsLogged(true);
            api.defaults.headers.common.Authorization = `bearer ${token}`;
        }
    }, []);

    const loginUser = async (user: iVendaLogin) => {
        setIsError(false);
        setIsLoading(true);

        api.post(ROUTE_LOGIN, {
            usuario: VENDA_LOGIN,
            senha: VENDA_PASSWORD,
        }).then(async (response) => {
            const userLogin = response.data;
            const IsTokenValid = VerifyToken(userLogin.value);
            api.defaults.headers.common['cache-control'] = ' no-cache, no-store, must-revalidate';
            api.defaults.headers.common.pragma = 'no-cache';
            api.defaults.headers.common.Expires = 0;
            api.defaults.headers.common.Accept = '*/*';
            api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            api.defaults.headers.common['Content-Type'] = 'application/json';
            api.defaults.headers.common.Authorization = `bearer ${userLogin.value}`;

            if (IsTokenValid)
                api.post(ROUTE_LOGIN_VENDEDOR, {
                    codigo: parseInt(user.codigoVendedor),
                    senha: user.password,
                })
                    .then(async (res) => {
                        if (res.data.value === 'erro') {
                            setIsError(true);
                            logoutUser();
                            setErrorMsg('Usuario ou senha incorreta');
                            return;
                        }

                        setIsLogged(IsTokenValid);

                        setCurrentUser({
                            username: jwtDecode<iTokenPayload>(userLogin.value).Usuario,
                            level: parseInt(jwtDecode<iTokenPayload>(userLogin.value).Nivel),
                            type: jwtDecode<iTokenPayload>(userLogin.value).Tipo,
                            group: jwtDecode<iTokenPayload>(userLogin.value).Grupo,
                        });

                        localStorage.setItem(TOKEN_NAME_STORE, JSON.stringify(userLogin.value));

                        localStorage.setItem(
                            USER_NAME_STORE,
                            JSON.stringify({
                                ...jwtDecode<iTokenPayload>(userLogin.value),
                                vendedor: user.codigoVendedor,
                            }),
                        );

                        const DataVendedor = await api.get(
                            `${ROUTE_GET_VENDEDOR}(${parseInt(user.codigoVendedor)})`,
                        );

                        const vendedor: iVendedor = DataVendedor.data;

                        vendedor.SENHA = '';

                        setCurrentUser({
                            ...currentUser,
                            vendedor,
                        });

                        localStorage.setItem(VENDEDOR_STORE, JSON.stringify(vendedor));
                    })
                    .catch((error) => {
                        if (!error?.response) {
                            setErrorMsg('Sem resposta do servidor');
                        } else if (error.response?.status === 400) {
                            setErrorMsg('Usuario ou senha incorreta');
                        } else if (error.response?.status === 401) {
                            setErrorMsg(error.response.data.error.message);
                        } else {
                            setErrorMsg('Falha ao realizar login');
                        }
                        setIsError(true);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
        });
    };

    const logoutUser = () => {
        localStorage.removeItem(TOKEN_NAME_STORE);
        localStorage.removeItem(USER_NAME_STORE);
        localStorage.removeItem(VENDEDOR_STORE);
        api.defaults.headers.common.Authorization = undefined;
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
