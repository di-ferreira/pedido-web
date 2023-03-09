import styled from 'styled-components';
import { colors } from '../../colors';

export const TableCell = styled.td`
  padding: 1.2rem;
  font-size: 1.5rem;
  text-align: center;
  color: rgba(${colors.darkRgb}, 0.85);
  text-transform: capitalize;
  font-variant: small-caps;
`;

export const ActionContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
