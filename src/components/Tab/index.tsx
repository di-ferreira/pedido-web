import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isActiveLink } from '../../utils';
import { Container, ContainerIconClose, IconClose, IconMain, TabLink, TabTitle } from './styles';

interface iTab {
  Icon: IconProp;
  Closable?: boolean;
  Link: string;
  TitleTab: string;
  onClose?: () => void;
}

export const Tab: React.FC<iTab> = ({ Icon, Closable, Link, TitleTab, onClose }) => {
  const navigate = useNavigate();

  const CloseBtn = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose && onClose();
  };
  const GotoLink = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(link);
  };

  return (
    <Container active={isActiveLink(Link)} title={TitleTab}>
      <TabLink onClick={(e) => GotoLink(e, Link)}>
        {Closable ? (
          <ContainerIconClose onClick={CloseBtn}>
            <IconClose icon={faTimes} />
          </ContainerIconClose>
        ) : (
          ''
        )}
        <IconMain icon={Icon} />
      </TabLink>
      <TabTitle active={isActiveLink(Link)}>{TitleTab}</TabTitle>
    </Container>
  );
};
