import styled from 'styled-components';
import { colors } from '../../colors';

export const TableRowItem = styled.tr`
  cursor: auto;
  &:nth-child(even) {
    background-color: rgba(${colors.whiteGrayRgb}, 1);
  }
  &:last-child {
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
  }
`;

