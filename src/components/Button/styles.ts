import styled from 'styled-components';
import { colors } from '../../colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iButtonType } from '../../@types';

interface isButton {
  typeButton?: iButtonType;
  rounded?: boolean;
}

export const Container = styled.button<isButton>`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  cursor: pointer;
  color: ${colors.white};
  border: none;
  opacity: 1;
  padding: ${(props) =>
    props.rounded ? '0.25rem 0.3rem' : '0.1rem 0.5rem 0.1rem 0.3rem'};
  border-radius: ${(props) => (props.rounded ? '50%' : '0.2rem')};
  background-color: ${(props) =>
    props.typeButton === 'danger'
      ? colors.red
      : props.typeButton === 'warn'
      ? colors.warn
      : props.typeButton === 'success'
      ? colors.green
      : colors.gray};
  transition: opacity ease 0.5s;
  &:hover {
    transition: opacity ease 0.5s;
    opacity: 0.7;
  }
`;

export const IconButton = styled(FontAwesomeIcon)`
  margin: 0.5rem;
`;
