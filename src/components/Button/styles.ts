import styled from 'styled-components';
import { colors } from '../../colors';
import { iButtonType } from '../../@types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface isButton {
  typeButton?: iButtonType;
  rounded?: boolean;
}

export const TypeToColor = {
  default: { bgColor: colors.gray, color: colors.dark },
  success: { bgColor: colors.success, color: colors.white },
  warn: { bgColor: colors.warn, color: colors.white },
  danger: { bgColor: colors.red, color: colors.white },
};

type ContainerProps = {
  bgColor: string;
  color: string;
  rounded?: boolean;
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  cursor: pointer;
  color: ${(props) => props.color};
  border: none;
  opacity: 1;
  padding: ${(props) =>
    props.rounded ? '0.25rem 0.3rem' : '0.1rem 0.5rem 0.1rem 0.3rem'};
  border-radius: ${(props) => (props.rounded ? '50%' : '0.2rem')};
  background-color: ${(props) => props.bgColor};
  transition: opacity ease 0.5s;
  &:hover {
    transition: opacity ease 0.5s;
    opacity: 0.7;
  }
`;

export const IconButton = styled(FontAwesomeIcon)`
  margin: 0.5rem;
`;
