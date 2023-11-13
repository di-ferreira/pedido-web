import styled from 'styled-components';

interface iFieldSet {
  width?: string;
  height?: string;
}

export const Container = styled.fieldset<iFieldSet>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const TitleField = styled.legend`
  padding: 0 0.5rem;
`;
