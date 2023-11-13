import styled from 'styled-components';
import { Black, Light } from '../../../colors';
import { devices } from '../../../utils/Constants';

interface iTableCell {
  isHideMobile?: boolean;
  min_width?: string;
}

export const TableHeaderCell = styled.th<iTableCell>`
  background-color: ${(props) => (props.theme.name === 'light' ? Light.surface : Black.text)};
  font-weight: 500;
  text-align: center;
  font-size: 1.4rem;
  padding: 1.2rem 0;
  flex-grow: 1;
  width: ${(props) => (props.min_width ? props.min_width : 'auto')};
  overflow: hidden;
  table-layout: fixed;
  color: ${(props) => props.theme.colors.gray};
  border-bottom: solid 1px ${(props) => props.theme.colors.secondary};

  &:first-child {
    width: ${(props) => (props.min_width ? props.min_width : 'auto')};
  }
  ${`@media screen and ${devices.sm}`} {
    display: ${(props) => props.isHideMobile && 'none'};
  }
`;

export const TableHeaderRow = styled.tr`
  display: flex;
  position: relative;
  height: 5rem;
  ${`@media screen and ${devices.sm}`} {
    display: none;
    overflow: auto hidden;
    height: 100%;
  }
`;
