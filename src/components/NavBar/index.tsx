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
import Logo from '../../assets/favicon_white.png';
import ProfileImage from '../../assets/avatar_4.png';
import {
  BorderImage,
  Container,
  NavigationContainer,
  OpenCloseButton,
  Profile,
  ProfileName,
  Top,
} from './styles';

interface iNavBar {
  Open: Boolean;
}

export const NavBar: React.FC<iNavBar> = ({ Open }) => {
  const [OpenCloseNavBar, SetOpenCloseNavBar] = useState(Open);
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
        <img src={Logo} alt='Logo EMSoft' /> Pedido Web
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
        <NavButton Icon={faPowerOff} Text='sair' Link='logout' />
      </NavigationContainer>
    </Container>
  );
};

