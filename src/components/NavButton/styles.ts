import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { HEXToRGB } from '../../utils';

interface isActiveLink {
  active: boolean;
}

export const Container = styled.li<isActiveLink>`
  width: 100%;
  height: 4.4rem;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.active
      ? `rgba(${HEXToRGB(props.theme.colors.onSurface)}, 0.1)`
      : 'transparent'};
  padding-left: ${(props) => (props.active ? '0rem' : '0.6rem')};
  padding-top: 3%;
  transition: all 0.3s ease;
  &:hover {
    padding-left: 0rem;
    border-left-width: 0.6rem;
    background: ${(props) =>
      `rgba(${HEXToRGB(props.theme.colors.onSurface)}, 0.1)`};
    transition: all 0.3s ease;
  }
`;

export const NavButtonLink = styled(Link)<isActiveLink>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: baseline;
  color: ${(props) =>
    props.active ? props.theme.colors.secondary : props.theme.colors.onSurface};
  font-weight: ${(props) => (props.active ? '700' : '400')};
  text-decoration: none;
  text-transform: capitalize;
  font-variant: small-caps;
`;

export const IconButton = styled(FontAwesomeIcon)`
  margin: 0.5rem 1rem;
`;

export const ContainerButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 4.4rem;
  display: flex;
  align-items: baseline;
  color: ${(props) => props.theme.colors.onSurface};
  font-weight: 400;
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: capitalize;
  font-variant: small-caps;
  border: none;
  background: transparent;
  padding-left: 0.6rem;
  padding-top: 3%;
  transition: all 0.3s ease;
  &:hover {
    padding-left: 0rem;
    border-left-width: 0.6rem;
    background: ${(props) =>
      `rgba(${HEXToRGB(props.theme.colors.onSurface)}, 0.1)`};
    transition: all 0.3s ease;
  }
`;
