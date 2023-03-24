import styled from 'styled-components';
import { Light, Primary } from '../../colors';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: auto;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  background-color: ${Light.main};
`;

export const Label = styled.label`
  position: absolute;
  color: ${Primary.main};
  font-weight: 500;
  font-variant: small-caps;
  text-transform: lowercase;
  font-size: 1.8rem;
  top: -2.2rem;
  left: 0.5rem;
  z-index: 500;
`;

