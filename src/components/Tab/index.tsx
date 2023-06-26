import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { isActiveLink } from '../../utils';
import { Container, IconClose, IconMain, TabLink, TabTitle } from './styles';

interface iTab {
  Icon: IconProp;
  Closable?: boolean;
  Link: string;
  TitleTab: string;
  onClose?: () => void;
}

export const Tab: React.FC<iTab> = ({
  Icon,
  Closable,
  Link,
  TitleTab,
  onClose,
}) => {
  return (
    <Container active={isActiveLink(Link)} title={TitleTab}>
      <TabLink to={Link}>
        <IconMain icon={Icon} />
        {Closable ? <IconClose onClick={onClose} icon={faTimes} /> : ''}
      </TabLink>
      <TabTitle active={isActiveLink(Link)}>{TitleTab}</TabTitle>
    </Container>
  );
};

