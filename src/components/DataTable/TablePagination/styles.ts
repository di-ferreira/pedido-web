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

  ${`@media screen and ${devices.md} and (orientation: landscape)`} {
    padding-right: 1.5rem;
    height: 13vh;
  }

  ${`@media screen and ${devices.xs}`} {
    flex-direction: column;
    height: 25vh;
    overflow: hidden auto;
    padding-bottom: 5.5rem;
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

  ${`@media screen and ${devices.xs}`} {
    flex-direction: column;
    padding: 0 25%;
    width: 100%;
    height: 50%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    & > div {
      width: 100%;
    }
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0rem;
  width: 50%;
  height: 100%;

  ${`@media screen and ${devices.xs}`} {
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 1rem;
    width: 100%;
    height: auto;
    padding-bottom: 5%;
    & > button {
      width: 45% !important;
      height: 3.5rem;
    }
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
