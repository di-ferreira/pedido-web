import { colors } from './../../colors';
import styled from 'styled-components';

export const Container = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5.5rem;
  margin-top: 5rem;
  justify-content: center;
  background-color: ${colors.RedInst};

  & h1 {
    font-size: 3.5rem;
    color: ${colors.white};
    text-transform: uppercase;
    margin-left: 5rem;
  }
`;

export const TabList = styled.ul`
  position: absolute;
  top: -4rem;
  display: flex;
  width: 100%;
  height: 4rem;
`;

