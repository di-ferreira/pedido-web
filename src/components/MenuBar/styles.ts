import styled from 'styled-components';
import { colors } from './../../colors';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  background-color: ${colors.BlueInst};
  & h1 {
    color: ${colors.white};
    font-size: 3rem;
    font-weight: 100;
    text-transform: capitalize;
    font-variant: small-caps;
  }
  & img {
    height: 90%;
    margin-right: 2rem;
  }
`;

