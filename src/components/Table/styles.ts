import styled from 'styled-components';
import { devices } from '../../utils/Constants';

export const TableWrapper = styled.table`
  border-collapse: collapse;
  border: none;
  width: 100%;
  height: 100%;
  table-layout: fixed;
`;

export const TableBody = styled.tbody`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.onSurface};
  }

  ${`@media screen and ${devices.sm}`} {
    overflow: auto;
  }
`;

export const MessageNoData = styled.p`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.5rem;
  width: 100%;
`;

