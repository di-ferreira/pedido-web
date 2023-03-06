import React from 'react';
import { Container } from './styles';
import LogoEmpresa from '../../assets/imperio_logo.png';
interface iMenuBar {
  title: string;
}

export const MenuBar: React.FC<iMenuBar> = ({ title }) => {
  return (
    <Container>
      <img src={LogoEmpresa} alt={title} />
    </Container>
  );
};

