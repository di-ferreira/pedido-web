import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 30rem 0rem 20rem;
  justify-content: space-evenly;
  width: 100%;
  min-height: 6rem;
  background-color: ${(props) => props.theme.colors.onSurface};
  border-bottom: solid 0.2rem ${(props) => props.theme.colors.surface};
`;

export const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

export const SwitchLabel = styled.label`
  color: ${(props) => props.theme.colors.surface};
  font-variant: small-caps;
  text-transform: lowercase;
  width: 100%;
  text-align: center;
  margin-bottom: -0.5rem;
`;

export const ContainerInput = styled.div`
  width: 25rem;
  margin: 0 0.5rem;
`;
