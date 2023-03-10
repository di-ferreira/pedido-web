import styled from 'styled-components';
import { colors } from '../../colors';

interface iInput {
  active: boolean;
}

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0.7rem;
  height: 3.5rem;
  border: solid 0.1rem ${colors.BlueInst};
  border-radius: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  z-index: 100;
`;

export const Label = styled.label<iInput>`
  position: absolute;
  color: ${colors.BlueInst};
  font-variant: small-caps;
  text-transform: lowercase;
  font-size: 1.7rem;
  top: ${(props) => (props.active ? '0rem' : '1rem')};
`;

