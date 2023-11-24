import styled from 'styled-components';
import { devices } from '../../utils/Constants';

export const Container = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5.5rem;
  margin-top: 5rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondary};

  & h1 {
    height: 100%;
    font-size: 2.7rem;
    color: ${(props) => props.theme.colors.onSurface};
    text-transform: uppercase;
    margin-left: 5rem;
  }

  ${`@media screen and ${devices.xs}`} {
    & h1 {
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const TabList = styled.ul`
  position: absolute;
  top: -4rem;
  display: flex;
  width: 100%;
  height: 4rem;
`;
