import styled from 'styled-components';
import { Gray } from '../../colors';
import { HEXToRGB } from '../../utils';
import { devices } from '../../utils/Constants';

interface iContainer {
  height?: string;
  widht?: string;
}

export const Container = styled.div<iContainer>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.widht ? props.widht : '100%')};
  margin-top: -0.5rem;
  height: ${(props) => (props.height ? props.height : 'auto')};

  ${`@media screen and ${devices.xs}`} {
    width: 100%;
  }
`;

export const LabelInput = styled.label`
  margin: -0.5rem 0 -0.2rem 0;
  color: ${(props) => props.theme.colors.onSurface};
  font-variant: small-caps;
  text-transform: lowercase;
  padding: 0 0.2rem;
  width: 100%;
  ${`@media screen and ${devices.xs}`} {
    font-size: 1.9rem;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.onBackground};
  width: 100%;
  height: 100%;
  min-height: 2.5rem;
  padding: 0 0.5rem;
  resize: none;
  overflow: auto;
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
    box-shadow: 0px 0px 3px 1px rgba(${(props) => HEXToRGB(props.theme.colors.secondary)}, 0.7);
    transition: all ease 0.5s;
  }
  &:read-only {
    box-shadow: 0px 0px 0px 0px transparent;
    border-color: ${(props) => props.theme.colors.onBackground};
    background: rgba(${(props) => HEXToRGB(props.theme.colors.onGray)}, 0.3);
  }

  ${`@media screen and ${devices.xs}`} {
    font-size: 1.9rem;
  }
`;
