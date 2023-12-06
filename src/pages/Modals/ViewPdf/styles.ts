import styled from 'styled-components';

export const InfoHeader = styled.p`
  color: #000;
  & strong {
    color: #333;
    font-weight: 700;
    margin-left: 0.5rem;
  }
`;

export const TableContainer = styled.table`
  width: 100%;
  font-size: 1.3rem;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid #000;
`;

export const THead = styled.th`
  padding: 0.5rem;
`;

export const THeadL = styled(THead)`
  text-align: left;
`;

export const THeadR = styled(THead)`
  text-align: right;
`;

export const THeadC = styled(THead)`
  text-align: center;
`;

export const TData = styled.td`
  padding: 0.5rem;
`;

export const TDataL = styled(TData)`
  text-align: left;
`;

export const TDataR = styled(TData)`
  text-align: right;
`;

export const TDataC = styled(TData)`
  text-align: center;
`;

export const TRow = styled.tr`
  background: #aaa;
  &:nth-child(even) {
    background: transparent;
  }
`;
