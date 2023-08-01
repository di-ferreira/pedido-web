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

interface iCheckbox {
  checked: boolean;
}

interface iContainerCheckbox extends iCheckbox {
  handdleCheckboxOn: string;
  handdleCheckboxOff: string;
  width?: any;
  height?: any;
}

export const CheckboxContainer = styled.div<iContainerCheckbox>`
  cursor: pointer;
  ${(props) => props.width && `width: ${props.width}`};

  height: ${(props) => (props.height ? props.height : `4rem`)};
  padding: 0.8rem;
  margin: 0rem 0.4rem;
  border-radius: 0.5rem;

  background-color: ${(props) =>
    props.checked ? props.handdleCheckboxOn : props.handdleCheckboxOff};

  display: flex;
  align-items: center;
  transition: all ease 0.5s;
`;
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
`;

export const Text = styled.label`
  cursor: pointer;
  color: ${(props) => props.theme.colors.onPrimary};
  transition: all ease 0.5s;
`;

export const StyledCheckbox = styled.label<iCheckbox>`
  cursor: pointer;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.onBackground};
  margin-right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 0.5s;
  svg {
    height: 2.5rem;
    color: ${(props) => (props.checked ? Success.main : 'transparent')};
    transition: all ease 0.5s;
  }
`;

