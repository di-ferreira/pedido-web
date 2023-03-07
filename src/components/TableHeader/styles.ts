import styled from 'styled-components';
import { colors } from '../../colors';

export const TableHeaderCell = styled.th`
  background-color: rgba(${colors.whiteGrayRgb}, 1);
  padding: 0.8rem;
  font-weight: 500;
  text-align: center;
  font-size: 1.4rem;
  color: rgba(${colors.darkRgb}, 0.5);
  border-bottom: solid 1px ${colors.gray};
`;

export const TableHeaderRow = styled.tr`
  height: 2.5rem;
`;

