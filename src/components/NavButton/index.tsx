import React from 'react';
import { iNavButton } from '../../@types/Navigation';
import useTabListStore from '../../hooks/useTabList';
import { isActiveLink } from '../../utils';
import { Container, IconButton, NavButtonLink } from './styles';

export const NavButton: React.FC<iNavButton> = ({
  Text,
  Icon,
  Link,
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

