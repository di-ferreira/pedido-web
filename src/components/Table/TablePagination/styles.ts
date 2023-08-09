import styled from 'styled-components';
import { devices } from '../../../utils/Constants';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 9vh;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.onSurface};
  border-top: solid 1px ${(props) => props.theme.colors.secondary};

  @media only screen and ${devices.sm} {
    flex-direction: column;
    height: 20rem;
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;

  & > div {
    width: auto;
  }

  @media only screen and ${devices.sm} {
    flex-direction: column;
    padding: 0 25%;
    width: 100%;
    height: 50%;
    margin-top: 1rem;
    & > div {
      width: 100%;
    }
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;

  @media only screen and ${devices.sm} {
    width: 100%;
    height: 40%;
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  font-variant: small-caps;
  margin: 0 1rem;
  strong {
    font-size: 1.8rem;
    margin: 0 0.5rem;
  }
`;

