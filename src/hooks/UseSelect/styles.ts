import styled from 'styled-components';
import { Light } from '../../colors';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  background-color: ${Light.main};
  & > div {
    width: 100%;
  }
`;

export const Label = styled.label`
  position: absolute;
  color: ${(props) => props.theme.colors.onSurface};
  font-weight: 500;
  font-variant: small-caps;
  text-transform: lowercase;
  font-size: 1.8rem;
  top: -2.5rem;
  left: 0.5rem;
  z-index: 500;
`;

