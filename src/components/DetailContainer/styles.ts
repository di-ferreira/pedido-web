import styled from 'styled-components';
import { devices } from '../../utils/Constants';

interface iContainerDetails {
  width?: string;
  height?: string;
}

export const Container = styled.details<iContainerDetails>`
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

  ${`@media screen and ${devices.xs}`} {
    margin: 0.5rem 0;
  }
`;

export const Summary = styled.summary``;
