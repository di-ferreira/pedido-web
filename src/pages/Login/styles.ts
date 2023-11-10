import styled from 'styled-components';
import { Black, Dark, DarkRed, Light } from '../../colors';
import { HEXToRGB } from '../../utils';
import { devices } from '../../utils/Constants';

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

  ${`@media screen and ${devices.sm}`} {
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    border-radius: 0rem;
  }
`;

export const LoginHeader = styled.header`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${`@media screen and ${devices.sm}`} {
    height: 49%;
    width: 100%;
  }
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
  margin: 0 auto;
  ${`@media screen and ${devices.sm}`} {
    height: 49%;
    width: 100%;
    padding: 6% 1rem;
  }
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
  margin: 0 0.5rem;
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

  ${`@media screen and ${devices.sm}`} {
    width: 100%;
    height: 1px;
    margin: 4rem 0 0.5rem 0;
    background: ${(props) => `linear-gradient(
    90deg,
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
  }
`;

