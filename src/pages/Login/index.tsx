import React from 'react';
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

export const Login: React.FC = () => {
  const { ThemeName } = useTheme();
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
        <LoginForm>
          <ContainerInput>
            <InputCustom
              onChange={() => {}}
              label='USUÁRIO'
              placeholder='DIGITE SEU USUÁRIO'
            />
          </ContainerInput>
          <ContainerInput>
            <InputCustom
              onChange={() => {}}
              label='SENHA'
              type='password'
              placeholder='DIGITE SUA SENHA'
            />
          </ContainerInput>
          <Button
            onclick={() => {}}
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

