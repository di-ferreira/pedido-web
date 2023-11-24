import styled from 'styled-components';
import { Gray } from '../../../colors';
import { devices } from '../../../utils/Constants';
interface iTableRow {
  isHideMobile?: boolean;
}
export const TableRowItem = styled.tr`
  cursor: auto;
  display: flex;
  &:nth-child(even) {
    background-color: ${(props) => (props.theme.name === 'light' ? Gray.Light : Gray.MediumDark)};
  }
  &:nth-child(odd) {
    background-color: ${(props) => (props.theme.name === 'light' ? Gray.MediumLight : Gray.Dark)};
  }
  &:last-child {
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
  }
  &:hover {
    opacity: 0.8;
  }
  ${`@media screen and ${devices.xs}`} {
    flex-direction: column;
    & > td {
      display: none;
    }
  }
`;

export const TableCellContainer = styled.div<iTableRow>`
  display: none;
  ${`@media only screen and ${devices.md} and (orientation:landscape)`} {
    display: ${(props) => props.isHideMobile && 'none'};
  }
  ${`@media screen and ${devices.xs}`} {
    display: ${(props) => (props.isHideMobile ? 'none' : 'flex')};
    padding: 0rem 2.5rem;
    border-bottom: solid 0.1rem ${(props) => props.theme.colors.onSurface};
  }
  &:last-child {
    border-bottom: none;
  }
`;
