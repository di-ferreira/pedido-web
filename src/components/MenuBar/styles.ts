import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7.5rem;
  background-color: ${(props) => props.theme.colors.surface};
  & h1 {
    color: ${(props) => props.theme.colors.onSurface};
    font-size: 3rem;
    font-weight: 400;
    text-transform: capitalize;
    font-variant: small-caps;
  }
  & img {
    height: 90%;
    margin-right: 2rem;
  }
`;
