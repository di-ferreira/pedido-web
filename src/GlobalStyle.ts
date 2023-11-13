import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,body{height: 100%;}
  html{font-size: 62.5%;
    overflow: hidden;}
  ul,
  ol,
  li {
    list-style: none;
  }

  select,
  select:focus,
  input,
  input:focus,
  button,
  button:focus {
    outline: 0;
  }
  select::-ms-expand {
    display: none;
  }
  select {
    appearance: none;
    background-color: transparent;
    border: none;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }

  image {
    max-width: 100%;
  }

  body #root{
    width: 100vw;
    height: 100vh;
  }

  body {
    font-family: "Poppins",Helvetica Neue,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased !important;
    font-size: 1.6rem;
    overflow: hidden;
    color:${(props) => props.theme.colors.onBackground};
    background-color: ${(props) => props.theme.colors.background};
  }
`;

export default GlobalStyle;
