import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../colors';
import { Link } from 'react-router-dom';

interface isActiveLink {
  Active: boolean;
}

export const Container = styled.li<isActiveLink>`
  width: 100%;
  height: 4.4rem;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.Active ? `rgba(${colors.whiteGrayRgb}, 0.3)` : 'transparent'};
  padding-left: ${(props) => (props.Active ? '0rem' : '0.6rem')};
  padding-top: 3%;
  border-left: solid 0rem ${colors.RedRose};
  border-left-width: ${(props) => (props.Active ? '0.6rem' : '0rem')};
  transition: all 0.3s ease;
  &:hover {
    padding-left: 0rem;
    border-left-width: 0.6rem;
    background: rgba(${colors.whiteGrayRgb}, 0.3);
    transition: all 0.3s ease;
  }
`;

export const NavButtonLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: baseline;
  color: ${colors.white};
  text-decoration: none;
  text-transform: capitalize;
  font-variant: small-caps;
`;

export const IconButton = styled(FontAwesomeIcon)`
  margin: 0.5rem 1rem;
`;

