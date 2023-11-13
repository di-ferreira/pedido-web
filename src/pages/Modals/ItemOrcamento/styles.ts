import styled from 'styled-components';
import { devices } from '../../../utils/Constants';

interface iInputContainer {
  width?: string;
}

interface iRow {
  width?: string;
  height?: string;
}

export const FormEditOrcamento = styled.form`
  width: 100%;
  height: 100%;
  padding: 0rem 0rem 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  row-gap: 2rem;
`;

export const FormEditOrcamentoRow = styled.div<iRow>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }

  ${`@media screen and ${devices.sm}`} {
    margin: 0.5rem 0;
  }
`;
export const FormEditOrcamentoColumn = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
`;

export const FormEditOrcamentoInputContainer = styled.div<iInputContainer>`
  width: ${(props) => (props.width ? props.width : '100%')};
  flex-grow: 1;
  margin: 0.5rem;
  & * input {
    font-size: 1.7rem;
  }

  ${`@media screen and ${devices.sm}`} {
    width: ${(props) => (props.width ? '45%' : '100%')};

    & * input {
      font-size: 1.5rem;
    }
  }
`;

export const FormEditOrcamentoSwitchContainer = styled.div<iInputContainer>`
  width: ${(props) => (props.width ? props.width : '100%')};
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  & label {
    margin: 0 0.5rem;
    color: ${(props) => props.theme.colors.onSurface};
  }
`;

export const FormFooter = styled.footer`
  margin: 1.5rem 0 0 0;
  width: 100%;
  display: flex;
  ${`@media screen and ${devices.sm}`} {
    margin: 0 0 1rem 0;
  }
`;
