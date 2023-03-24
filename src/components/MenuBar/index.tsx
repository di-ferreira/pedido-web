import React from 'react';
import { Container } from './styles';
import { SwitchTheme } from '../SwitchTheme';
interface iMenuBar {
  title: string;
  Logo?: string;
}

export const MenuBar: React.FC<iMenuBar> = ({ title, Logo }) => {
  return (
    <Container>
      {Logo ? <img src={Logo} alt={title} /> : <h1>{title}</h1>}
      <SwitchTheme />
    </Container>
  );
};

