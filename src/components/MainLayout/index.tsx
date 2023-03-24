import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { TabBar } from '../TabBar';
import { Container, Main } from './styles';
import { MenuBar } from '../MenuBar';
import LogoEmpresa from '../../assets/imperio_logo.png';

export const MainLayout: React.FC = () => {
  return (
    <Container>
      <NavBar Open={true} />
      <Main>
        <MenuBar title='Império Diesel' />
        <TabBar />
        <Outlet />
      </Main>
    </Container>
  );
};
