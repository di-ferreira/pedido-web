import {
  faArrowLeft,
  faArrowRight,
  faFileInvoiceDollar,
  faFileLines,
  faHouseChimney,
  faPowerOff,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Navigate } from 'react-router-dom';
import { iNavButton } from '../../@types/Navigation';
import LogoLight from '../../assets/EMSoft_icon.v2.png';
import ProfileImage from '../../assets/avatar_4.png';
import LogoDark from '../../assets/favicon_white.png';
import { useLogin } from '../../hooks/useLogin';
import { useTheme } from '../../hooks/useTheme';
import { NavButton } from '../NavButton';
import { SwitchTheme } from '../SwitchTheme';
import {
  BorderImage,
  Container,
  ContainerNav,
  ContainerSwitchTheme,
  NavigationContainer,
  OpenCloseButton,
  Profile,
  ProfileGroup,
  ProfileName,
  Top,
} from './styles';

interface iNavBar {
  Open: boolean;
}

export const NavBar: React.FC<iNavBar> = memo(({ Open }) => {
  const { ThemeName } = useTheme();
  const [OpenCloseNavBar, SetOpenCloseNavBar] = useState<boolean>(Open);

  const { logoutUser, currentUser } = useLogin();

  const CloseNavBarMobile = () => {
    isMobile && SetOpenCloseNavBar(!OpenCloseNavBar);
  };

  const Logout = () => {
    logoutUser();
    <Navigate to='/login' replace />;
  };

  const IconOpenCloseButton = OpenCloseNavBar ? (
    <FontAwesomeIcon icon={faArrowLeft} />
  ) : (
    <FontAwesomeIcon icon={faArrowRight} />
  );

  const [NavigationButtons, _] = useState<iNavButton[]>([
    {
      Text: 'dashboard',
      Link: 'home',
      Icon: faHouseChimney,
      onClick: CloseNavBarMobile,
    },
    {
      Text: 'clientes',
      Link: 'clientes',
      Icon: faUsers,
      onClick: CloseNavBarMobile,
    },
    {
      Text: 'orçamentos',
      Link: 'orcamentos',
      Icon: faFileLines,
      onClick: CloseNavBarMobile,
    },
    {
      Text: 'pré-vendas',
      Link: 'pre-vendas',
      Icon: faFileInvoiceDollar,
      onClick: CloseNavBarMobile,
    },
    {
      Text: 'vendas',
      Link: 'vendas',
      Icon: faFileInvoiceDollar,
      onClick: CloseNavBarMobile,
    },
    {
      Text: 'sair',
      Link: 'logout',
      Icon: faPowerOff,
      onClick: Logout,
    },
  ]);

  return (
    <Container isOpen={OpenCloseNavBar}>
      <OpenCloseButton onClick={() => SetOpenCloseNavBar(!OpenCloseNavBar)}>
        {IconOpenCloseButton}
      </OpenCloseButton>
      <ContainerNav>
        <Top>
          <img src={ThemeName === 'light' ? LogoLight : LogoDark} alt='Logo EMSoft' /> Pedido Web
        </Top>
        <Profile>
          <BorderImage>
            <img src={ProfileImage} alt='Profile Image' />
          </BorderImage>
          <ProfileName>
            {currentUser.vendedor?.NOME}
            <ProfileGroup>{currentUser.group && currentUser.group}</ProfileGroup>
          </ProfileName>
        </Profile>
        <NavigationContainer>
          {NavigationButtons.map((button, index) => (
            <NavButton
              key={index}
              onClick={button.onClick}
              Icon={button.Icon}
              Text={button.Text}
              Link={button.Link}
            />
          ))}
        </NavigationContainer>
      </ContainerNav>
      <ContainerSwitchTheme>
        <SwitchTheme />
      </ContainerSwitchTheme>
    </Container>
  );
});
