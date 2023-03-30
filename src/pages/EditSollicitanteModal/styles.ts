import styled from 'styled-components';

export const Container = styled.div``;

export const FormEditCliente = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormEditClienteRow = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
`;

export const FormEditClienteInputContainer = styled.div`
  margin: 0 0.5rem;
`;

export const FormEditClienteSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  & label {
    margin: 0 0.5rem;
    color: ${(props) => props.theme.colors.onSurface};
  }
`;

