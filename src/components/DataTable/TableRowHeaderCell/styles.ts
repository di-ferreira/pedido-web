import styled from 'styled-components';
import { devices } from '../../../utils/Constants';

interface iTableCell {
  isHideMobile?: boolean;
  min_width?: string;
}

export const TableCell = styled.td<iTableCell>`
  padding: 1.2rem 0;
  font-size: 1.5rem;
  text-align: center;
  flex-grow: 1;
  color: ${(props) => props.theme.colors.onSurface};
  text-transform: capitalize;
  font-variant: small-caps;
  width: ${(props) => (props.min_width ? props.min_width : 'auto')};
  overflow: hidden;
  table-layout: fixed;
  display: none;
  font-weight: bold;

  ${`@media screen and ${devices.xs}`} {
    display: ${(props) => (props.isHideMobile ? 'none' : 'flex')};
    width: 50%;
    align-items: center;
  }
  ${`@media only screen and ${devices.md} and (orientation:landscape)`} {
    display: ${(props) => props.isHideMobile && 'none'};
  }
`;

export const ActionContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
