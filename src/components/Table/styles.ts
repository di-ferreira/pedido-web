import styled from 'styled-components';
import { devices } from '../../Constants';

export const TableWrapper = styled.table`
  border-collapse: collapse;
  border: none;
  width: 100%;
  height: 93%;
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

  @media only screen and ${devices.sm} {
    height: 50vh;
    overflow: auto;
  }
`;

export const MessageNoData = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

