import styled from 'styled-components';
import { Light } from '../../colors';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface iContainer {
  active: boolean;
}

export const Container = styled.li<iContainer>`
  height: 4rem;
  margin: 0rem 0.25rem 1.46rem 0.25rem;
  background-color: ${(props) => props.theme.colors.secondary};
  opacity: ${(props) => (props.active ? '1' : '0.5')};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  overflow: hidden;
`;

export const IconClose = styled(FontAwesomeIcon)`
  position: absolute;
  top: -0.1rem;
  right: 0rem;
  font-size: 1.5rem;
  display: flex;
  width: 1.1rem;
  height: 1.1rem;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.surface};
  background-color: ${(props) => props.theme.colors.onSurface};
`;

export const IconMain = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.onSurface};
  margin-top: 1.2rem;
`;
export const TabLink = styled(Link)`
  position: relative;
  padding: 0.8rem 1.5rem;
  box-sizing: initial;
  height: 100%;
  cursor: pointer;
`;

export const TabTitle = styled.h1<iContainer>`
  position: absolute;
  top: 4rem;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  left: 5rem;
  margin-left: 0rem !important;
`;
