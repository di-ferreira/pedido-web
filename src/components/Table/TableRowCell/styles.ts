import styled from 'styled-components';
import { devices } from '../../../Constants';

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

  &:first-child {
    width: ${(props) => (props.min_width ? props.min_width : 'auto')};
  }

  @media only screen and ${devices.sm} {
    display: ${(props) => props.isHideMobile && 'none'};
    // width: 100%;
    // min-width: ${(props) => (props.min_width ? props.min_width : 'auto')};
    width: ${(props) => (props.min_width ? props.min_width : 'auto')};
  }
`;

export const ActionContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
