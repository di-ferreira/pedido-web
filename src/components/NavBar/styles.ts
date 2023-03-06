import styled from 'styled-components';
import { colors } from '../../colors';

interface iNavBarStyle {
  isOpen: Boolean;
}

export const Top = styled.h1`
  width: 100%;
  height: 5.5rem;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 2rem;
  & img {
    width: 3.2rem;
    margin-right: 1.5rem;
  }
`;

export const Profile = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  flex-direction: column;
  align-items: center;
`;

export const BorderImage = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8.5rem;
  height: 8.5rem;
  overflow: hidden;
  border: solid 0.5rem ${colors.white};
  border-radius: 50%;
  & img {
    width: 110%;
  }
`;

export const ProfileName = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 1rem;
  text-transform: uppercase;
`;

export const NavigationContainer = styled.ul`
  width: 100%;
`;

export const OpenCloseButton = styled.button`
  display: flex;
  position: absolute;
  right: -4rem;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 5.5rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  color: ${colors.white};
  background-color: ${colors.BlueInst};
  box-shadow: 1px 0px 3px 0px rgba(${colors.darkRgb}, 0.26);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 4px 1px 3px 0px rgba(${colors.darkRgb}, 0.26);
    transition: all 0.3s ease;
  }
`;

export const Container = styled.nav<iNavBarStyle>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isOpen ? '22rem' : '0rem')};
  height: 100vh;
  color: ${colors.white};
  background-color: ${colors.BlueInst};
  transition: all 0.3s ease;
  & h1,
  div {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  }
  & ul {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
  }
`;

