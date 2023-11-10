import styled from 'styled-components';
import { Black, Dark, Light } from '../../../colors';
import { devices } from '../../../utils/Constants';
interface iTableRow {
  isHideMobile?: boolean;
}
export const TableRowItem = styled.tr`
  cursor: auto;
  display: flex;
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

  ${`@media screen and ${devices.sm}`} {
    flex-direction: column;
    & > td {
      display: none;
    }
  }
`;

export const TableCellContainer = styled.div<iTableRow>`
  display: none;
  ${`@media screen and ${devices.sm}`} {
    display: ${(props) => (props.isHideMobile ? 'none' : 'flex')};
    padding: 0rem 2.5rem;
    border-bottom: solid 0.1rem ${(props) => props.theme.colors.onSurface};
  }
  &:last-child {
    border-bottom: none;
  }
`;
