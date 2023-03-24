import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Container, IconButton, NavButtonLink } from './styles';
import { isActiveLink } from '../../utils';
import useTabListStore from '../../stores/TabList';

interface iNavButton {
  Text: string;
  Link: string;
  Icon: IconProp;
}

export const NavButton: React.FC<iNavButton> = ({ Text, Icon, Link }) => {
  const { openTab } = useTabListStore((state) => state);

  const verifyHome = (tabLink: string) => {
    openTab({
      Icon,
      Link,
      Closable: tabLink === 'home' ? false : true,
      TitleTab: Text,
      isActive: true,
    });
  };

  return (
    <Container Active={isActiveLink(Link)} onClick={() => verifyHome(Link)}>
      <NavButtonLink Active={isActiveLink(Link)} to={Link}>
        <IconButton icon={Icon} />
        <span>{Text}</span>
      </NavButtonLink>
    </Container>
  );
};

