import styled from 'styled-components';
import { devices } from '../../../utils/Constants';

interface iInputContainer {
  width?: string;
}

export const FormEditCliente = styled.form`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormEditClienteRow = styled.div`
  width: 100%;
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

  @media screen and ${devices.sm} {
    margin: 0.5rem 0;
  }
`;
export const FormEditClienteColumn = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
`;

export const FormEditClienteInputContainer = styled.div<iInputContainer>`
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: 0.5rem;
  & * input {
    font-size: 1.7rem;
  }

  @media screen and ${devices.sm} {
    width: ${(props) => (props.width ? '45%' : '100%')};

    & * input {
      font-size: 1.5rem;
    }
  }
`;

export const FormEditClienteSwitchContainer = styled.div<iInputContainer>`
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
  width: 100%;
  display: flex;
  margin-top: 1.5rem;
`;

