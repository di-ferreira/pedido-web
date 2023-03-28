import React, { useState } from 'react';
import {
  Container,
  LoginContainer,
  LoginForm,
  LoginHeader,
  LoginTitle,
  ImageLogin,
  ContainerInput,
  LineDivisor,
} from './styles';
import { InputCustom } from '../../components/InputCustom';
import Button from '../../components/Button';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoginIllustration from '../../assets/Login.svg';
import LogoLight from '../../assets/EMSoft_icon.v2.png';
import LogoDark from '../../assets/favicon_white.png';
import { useTheme } from '../../hooks/useTheme';
import { useLogin } from '../../hooks/useLogin';

interface iUserLogin {
  user: string;
  password: string;
}

export const Login: React.FC = () => {
  const { ThemeName } = useTheme();
  const { loginUser } = useLogin();

  const [UserLogin, setUserLogin] = useState<iUserLogin>({
    user: '',
    password: '',
  });

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserLogin({
      ...UserLogin,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser({
      username: UserLogin.user,
      password: UserLogin.password,
    });
  };

  return (
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
        <LoginForm onSubmit={onSubmit}>
          <ContainerInput>
            <InputCustom
              name='user'
              value={UserLogin.user}
              onChange={OnChangeInput}
              label='USUÁRIO'
              placeholder='DIGITE SEU USUÁRIO'
            />
          </ContainerInput>
          <ContainerInput>
            <InputCustom
              name='password'
              value={UserLogin.password}
              onChange={OnChangeInput}
              label='SENHA'
              type='password'
              placeholder='DIGITE SUA SENHA'
            />
          </ContainerInput>
          <Button
            TypeButton='submit'
            Text='LOGIN'
            Type='secondary'
            Width='90%'
            Height='3.5rem'
            Icon={faLock}
          />
        </LoginForm>
      </LoginContainer>
    </Container>
  );
};

