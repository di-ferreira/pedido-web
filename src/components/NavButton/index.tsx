import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Container,
  IconButton,
  NavButtonLink,
  ContainerButton,
} from './styles';
import { isActiveLink } from '../../utils';
import useTabListStore from '../../hooks/useTabList';

interface iNavButton {
  Text: string;
  Link: string;
  Icon: IconProp;
  isButton?: boolean;
  onClick?: () => void;
}

export const NavButton: React.FC<iNavButton> = ({
  Text,
  Icon,
  Link,
  isButton,
  onClick,
}) => {
  const { openTab } = useTabListStore((state) => state);

  const verifyHome = (tabLink: string) => {
    openTab({
      Icon,
      Link: tabLink,
      Closable: tabLink === 'home' ? false : true,
      TitleTab: Text,
      isActive: true,
    });
  };

  const Click = (link: string) => {
    verifyHome(link);
    onClick && onClick();
  };

  return (
    <Container active={isActiveLink(Link)} onClick={() => Click(Link)}>
      <NavButtonLink active={isActiveLink(Link)} to={Link}>
        <IconButton icon={Icon} />
        <span>{Text}</span>
      </NavButtonLink>
    </Container>
  );
};

