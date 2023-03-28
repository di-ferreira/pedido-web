import React, { useState } from 'react';
import { NavButton } from '../NavButton';
import {
  faHouseChimney,
  faUsers,
  faFileLines,
  faFileInvoiceDollar,
  faPowerOff,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImage from '../../assets/avatar_4.png';
import LogoLight from '../../assets/EMSoft_icon.v2.png';
import LogoDark from '../../assets/favicon_white.png';
import {
  BorderImage,
  Container,
  NavigationContainer,
  OpenCloseButton,
  Profile,
  ProfileName,
  Top,
} from './styles';
import { useTheme } from '../../hooks/useTheme';
import { useLogin } from '../../hooks/useLogin';
import { Navigate } from 'react-router-dom';

interface iNavBar {
  Open: Boolean;
}

export const NavBar: React.FC<iNavBar> = ({ Open }) => {
  const { ThemeName } = useTheme();
  const [OpenCloseNavBar, SetOpenCloseNavBar] = useState(Open);
  const { logoutUser } = useLogin();

  const Logout = () => {
    logoutUser();
    <Navigate to='/login' replace />;
  };
  const IconOpenCloseButton = OpenCloseNavBar ? (
    <FontAwesomeIcon icon={faArrowLeft} />
  ) : (
    <FontAwesomeIcon icon={faArrowRight} />
  );
  return (
    <Container isOpen={OpenCloseNavBar}>
      <OpenCloseButton onClick={() => SetOpenCloseNavBar(!OpenCloseNavBar)}>
        {IconOpenCloseButton}
      </OpenCloseButton>
      <Top>
        <img
          src={ThemeName === 'light' ? LogoLight : LogoDark}
          alt='Logo EMSoft'
        />{' '}
        Pedido Web
      </Top>
      <Profile>
        <BorderImage>
          <img src={ProfileImage} alt='Profile Image' />
        </BorderImage>
        <ProfileName>Diego Ferreira</ProfileName>
      </Profile>
      <NavigationContainer>
        <NavButton Icon={faHouseChimney} Text='dashboard' Link='home' />
        <NavButton Icon={faUsers} Text='clientes' Link='clientes' />
        <NavButton Icon={faFileLines} Text='orçamentos' Link='orcamentos' />
        <NavButton
          Icon={faFileInvoiceDollar}
          Text='pré-vendas'
          Link='pre-vendas'
        />
        <NavButton Icon={faFileInvoiceDollar} Text='vendas' Link='vendas' />
        <NavButton
          Icon={faPowerOff}
          Text='sair'
          Link='logout'
          isButton={true}
          onClick={Logout}
        />
      </NavigationContainer>
    </Container>
  );
};
