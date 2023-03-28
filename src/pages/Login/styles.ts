import styled from 'styled-components';
import { HEXToRGB } from '../../utils';
import { Black, Dark, DarkRed, Light } from '../../colors';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.theme.name === 'light' ? Light.surface : Black.text};
`;
export const LoginContainer = styled.section`
  display: flex;
  width: 60rem;
  height: 35rem;
  padding: 1.5rem;
  overflow: hidden;
  border-radius: 0.5rem;
  background: ${(props) =>
    props.theme.name === 'light' ? Light.main : Dark.text};
  box-shadow: 0px 0px 6px 2px
    rgba(
      ${(props) => HEXToRGB(props.theme.colors.onBackground)},
      ${(props) => (props.theme.name === 'light' ? 0.4 : 0)}
    );
`;

export const LoginHeader = styled.header`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginTitle = styled.h1`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 10%;
    margin-right: 1rem;
  }
`;

export const ImageLogin = styled.img`
  width: 90%;
`;

export const LoginForm = styled.form`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 13% 0;
`;

export const ErrorLoginMsg = styled.span`
  width: 90%;
  font-size: 1.2rem;
  text-align: center;
  color: ${(props) =>
    props.theme.name === 'light' ? DarkRed.dark : DarkRed.light};
`;

export const ContainerInput = styled.div`
  width: 90%;
`;

export const LineDivisor = styled.div`
  width: 1px;
  height: 100%;
  background: ${(props) => `linear-gradient(
    180deg,
    rgba(${
      props.theme.name === 'light' ? HEXToRGB(Light.main) : HEXToRGB(Dark.text)
    }, 1) 0%,
    rgba(${
      props.theme.name === 'light' ? HEXToRGB(Dark.text) : HEXToRGB(Light.main)
    }, 1) 49%,
    rgba(${
      props.theme.name === 'light' ? HEXToRGB(Light.main) : HEXToRGB(Dark.text)
    }, 1) 100%
  )`};
`;

