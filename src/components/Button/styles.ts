import styled from 'styled-components';
import {
  Black,
  Danger,
  Gray,
  Light,
  Primary,
  Secondary,
  Success,
  Warn,
} from '../../colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HEXToRGB } from '../../utils';

export const TypeToColor = {
  default: {
    bgColor: Gray.Medium,
    hoverColor: Gray.MediumLight,
    color: Light.main,
  },
  success: {
    bgColor: Success.main,
    hoverColor: Success.dark,
    color: Light.main,
  },
  warn: {
    bgColor: Warn.main,
    hoverColor: Warn.light,
    color: Black.main,
  },
  danger: {
    bgColor: Danger.main,
    hoverColor: Danger.light,
    color: Light.main,
  },
  primary: {
    bgColor: Primary.light,
    hoverColor: Primary.main,
    color: Light.main,
  },
  secondary: {
    bgColor: Secondary.main,
    hoverColor: Secondary.light,
    color: Light.main,
  },
};

type ContainerProps = {
  bgColor: string;
  hoverColor: string;
  height?: string;
  width?: string;
  color: string;
  rounded?: boolean;
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.color};
  height: ${(props) => (props.height ? props.height : 'auto')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  margin: 0 0.5rem;
  border: none;
  padding: ${(props) =>
    props.rounded ? '0.25rem 0.3rem' : '0.1rem 0.8rem 0.1rem 0.5rem'};
  border-radius: ${(props) => (props.rounded ? '50%' : '0.4rem')};
  background-color: ${(props) => props.bgColor};
  transition: background-color ease 0.5s;
  &:hover {
    transition: background-color ease 0.5s;
    background-color: ${(props) => props.hoverColor};
  }
  &[disabled],
  &:disabled {
    transition: background-color ease 0.2s;
    background-color: ${(props) => `rgba(${HEXToRGB(props.hoverColor)},0.5)`};
  }
`;

export const IconButton = styled(FontAwesomeIcon)`
  margin: 0.5rem;
`;
