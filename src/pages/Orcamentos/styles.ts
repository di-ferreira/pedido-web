import styled from 'styled-components';
import { devices } from '../../utils/Constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${`@media screen and ${devices.xs}`} {
    overflow: hidden auto;
  }
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
  & > div {
    width: auto;
  }

  ${`@media screen and ${devices.xs}`} {
    flex-direction: column;
    min-height: 25rem;
    align-items: center;
    padding: 0rem 2rem;
    justify-content: space-evenly;
    & > div {
      width: 100%;
      order: 0;
    }
    & button {
      order: 1;
    }
  }
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
