import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { TabBar } from '../TabBar';
import { Container, Main } from './styles';
import { MenuBar } from '../MenuBar';
import { isActiveLink } from '../../utils';

export const MainLayout: React.FC = () => {
  const verifyRoute = (): boolean => {
    let result = false;
    if (isActiveLink('/login')) result = true;
    if (isActiveLink('/logout')) result = true;
    return result;
  };

  return verifyRoute() ? (
    <Outlet />
  ) : (
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
