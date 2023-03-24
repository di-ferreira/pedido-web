import styled from 'styled-components';
import { Black, Dark, Light } from '../../colors';

export const TableRowItem = styled.tr`
  cursor: auto;
  &:nth-child(even) {
    background-color: ${(props) =>
      props.theme.name === 'light' ? Light.surface : Black.text};
  }
  &:nth-child(odd) {
    background-color: ${(props) =>
      props.theme.name === 'light' ? Light.surface : Dark.text};
  }
  &:last-child {
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
  }
`;
