import styled from 'styled-components';
import { Gray } from '../../colors';
import { HEXToRGB } from '../../utils';
import { devices } from '../../utils/Constants';

interface iContainer {
  height?: string;
  widht?: string;
  label?: string;
  type?: 'text' | 'password' | 'date' | 'number' | 'radio';
  labelPosition?: 'left' | 'right' | 'top';
}

interface iLabelInput {
  align?: string;
  labelPosition?: 'left' | 'right' | 'top';
}

interface iInput {
  align?: string;
}

export const Container = styled.div<iContainer>`
  display: flex;
  flex-direction: ${(props) =>
    props.labelPosition !== 'top' ? 'row' : 'column'};
  width: ${(props) =>
    props.widht
      ? props.widht
      : props.type === 'radio'
      ? 'fit-content'
      : '100%'};
  margin: ${(props) =>
    props.label ? '-0.5rem 0.5rem 0rem 0rem' : '0rem 0.5rem 0rem 0rem'};
  height: ${(props) => (props.height ? props.height : 'auto')};
  ${(props) => (props.labelPosition !== 'top' ? 'align-items: center' : '')};

  ${`@media screen and ${devices.sm}`} {
    width: 100%;
  }
`;

export const LabelInput = styled.label<iLabelInput>`
  margin: -0.5rem 0 -0.2rem 0;
  color: ${(props) => props.theme.colors.onSurface};
  font-variant: small-caps;
  text-transform: lowercase;
  padding: 0 0.2rem;
  width: 100%;
  text-align: ${(props) => (props.align ? props.align : 'left')};
  ${`@media screen and ${devices.sm}`} {
    font-size: 1.9rem;
  }
`;

export const Input = styled.input<iInput>`
  border: 1px solid ${(props) => props.theme.colors.onBackground};
  width: 100%;
  height: 100%;
  min-height: 2.5rem;
  text-align: ${(props) => (props.align ? props.align : 'left')};
  padding: 0 0.5rem;
  border-radius: 0.4rem;
  color: ${(props) => props.theme.colors.onBackground};
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 0 0 1px transparent;
  transition: all ease 0.5s;

  &::placeholder {
    color: ${Gray.MediumLight};
  }
  &:focus {
    border-color: ${(props) => props.theme.colors.secondary};
    box-shadow: 0px 0px 3px 1px
      rgba(${(props) => HEXToRGB(props.theme.colors.secondary)}, 0.7);
    transition: all ease 0.5s;
  }
  &:read-only {
    box-shadow: 0px 0px 0px 0px transparent;
    border-color: ${(props) => props.theme.colors.onBackground};
    background: rgba(${(props) => HEXToRGB(props.theme.colors.onGray)}, 0.3);
  }
  &[type='password'] {
    color: ${(props) => props.theme.colors.onBackground};
  }
  &[type='date'] {
    cursor: pointer;
    color: ${(props) => props.theme.colors.onBackground};
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }
  &[type='radio'] {
    box-shadow: 0px 0px 0px 0px transparent;
    cursor: pointer;
    width: fit-content;
    color: ${(props) => props.theme.colors.onBackground};
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }

  ${`@media screen and ${devices.sm}`} {
    font-size: 1.9rem;
  }
`;
