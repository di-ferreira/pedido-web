import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { iVendaLogin } from '../../@types/Login';
import LogoLight from '../../assets/EMSoft_icon.v2.png';
import LoginIllustration from '../../assets/Login.svg';
import LogoDark from '../../assets/favicon_white.png';
import Button from '../../components/Button';
import { InputCustom } from '../../components/InputCustom';
import { useLogin } from '../../hooks/useLogin';
import { useTheme } from '../../hooks/useTheme';
import {
  Container,
  ContainerInput,
  ErrorLoginMsg,
  ImageLogin,
  LineDivisor,
  LoginContainer,
  LoginForm,
  LoginHeader,
  LoginTitle,
} from './styles';

export const Login: React.FC = () => {
  const { ThemeName } = useTheme();
  const { loginUser, isError, isLoading, isLogged, errorMsg } = useLogin();

  const [UserLogin, setUserLogin] = useState<iVendaLogin>({
    codigoVendedor: '',
    password: '',
  });

  const PassRef = useRef<HTMLInputElement>(null!);

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setUserLogin({
      ...UserLogin,
      [name]: value,
    });
  };

  const ClearFields = () => {
    setUserLogin({
      codigoVendedor: '',
      password: '',
    });
  };

  const OnKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.name === 'codigoVendedor') {
      PassRef.current.focus();
    }
    if (e.key === 'Enter' && e.currentTarget.name === 'password') {
      onSubmit();
    }
  };

  const onSubmit = () => {
    loginUser({
      codigoVendedor: UserLogin.codigoVendedor,
      password: UserLogin.password,
    });

    isLogged ? <Navigate to='/home' /> : ClearFields();
  };

  return isLogged ? (
    <Navigate to='/home' />
  ) : (
    <Container>
      <LoginContainer>
        <LoginHeader>
          <LoginTitle>
            <img
              src={ThemeName === 'light' ? LogoLight : LogoDark}
              alt='Logo EMSoft'
            />
            PEDIDO WEB
          </LoginTitle>
          <ImageLogin src={LoginIllustration} />
        </LoginHeader>
        <LineDivisor />
        <LoginForm>
          <ContainerInput>
            <InputCustom
              autofocus={true}
              name='codigoVendedor'
              value={UserLogin.codigoVendedor}
              onChange={OnChangeInput}
              label='CÓDIGO DE VENDEDOR'
              onKeydown={OnKeyEnter}
            />
          </ContainerInput>
          <ContainerInput>
            <InputCustom
              name='password'
              value={UserLogin.password}
              onChange={OnChangeInput}
              label='SENHA'
              type='password'
              ref={PassRef}
              onKeydown={OnKeyEnter}
            />
          </ContainerInput>
          <Button
            Text={isLoading ? 'Carregando...' : 'LOGIN'}
            Type='secondary'
            Width='90%'
            Height='3.5rem'
            Icon={isLoading ? faSpinner : faLock}
            disabled={isLoading}
            AnimationSpin={isLoading}
            onclick={() => onSubmit()}
          />
          <ErrorLoginMsg>{isError && errorMsg}</ErrorLoginMsg>
        </LoginForm>
      </LoginContainer>
    </Container>
  );
};

