import styled from 'styled-components';
import {
  Danger,
  Gray,
  Primary,
  Secondary,
  Success,
  Warn,
} from '../../../colors';

export const TypeToColor = {
  default: {
    switcherOn: Gray.Light,
    switcherOff: Gray.Dark,
  },
  success: {
    switcherOn: Success.main,
    switcherOff: Success.light,
  },
  warn: {
    switcherOn: Warn.main,
    switcherOff: Warn.light,
  },
  danger: {
    switcherOn: Danger.main,
    switcherOff: Danger.light,
  },
  primary: {
    switcherOn: Primary.main,
    switcherOff: Primary.light,
  },
  secondary: {
    switcherOn: Secondary.main,
    switcherOff: Secondary.light,
  },
};

interface iSwitch {
  checked: boolean;
}

interface iSwitchLabel {
  hasLabel: boolean;
  TextColor?: string;
}

interface iSliderSwitch extends iSwitch, iSwitchLabel {
  handdleSwitchOn: string;
  handdleSwitchOff: string;
  handdleSwitchOffBackground?: string;
  handdleSwitchOnBackground?: string;
}

interface iContainerSwitch {
  width?: any;
  height?: any;
}

export const Container = styled.div<iContainerSwitch>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.width ? props.width : `6rem`)};
  height: ${(props) => (props.height ? props.height : `3rem`)};
`;

export const LabelSwitch = styled.label`
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  transition: all ease 0.5s;
`;

export const SliderSwitch = styled.span<iSliderSwitch>`
  position: absolute;
  top: 10px;
  bottom: -10px;
  left: 0;
  right: 0;
  border-radius: 3rem;
  box-shadow: ${(props) =>
    `0 0 0 1px ${props.theme.colors.onBackground}, 0 0 1px ${props.theme.colors.onBackground}`};
  background: ${(props) => props.theme.colors.background};
  cursor: pointer;
  border: ${(props) =>
    props.checked
      ? `2px solid ${props.handdleSwitchOn}`
      : '2px solid transparent'};
  overflow: hidden;
  transition: all ease 0.5s;

  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
      props.checked ? props.handdleSwitchOn : props.handdleSwitchOff};
    border-radius: 3rem;
    transform: ${(props) =>
      props.checked ? 'translateX(50%)' : 'translateX(-50%)'};
    transition: all ease 0.5s;
  }
`;

export const Label = styled.label<iSwitchLabel>`
  position: absolute;
  top: -13px;
  color: ${(props) =>
    props.TextColor ? props.TextColor : props.theme.colors.surface};
  font-variant: small-caps;
  text-transform: lowercase;
  text-align: center;
`;

