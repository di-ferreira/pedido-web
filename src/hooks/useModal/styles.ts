import styled from 'styled-components';
import { devices } from '../../Constants';
import { Black, DarkRed, Light } from '../../colors';
import { HEXToRGB } from '../../utils';

export const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background-color: rgba(
    ${(props) => HEXToRGB(props.theme.colors.background)},
    0.7
  );
`;

export const ModalContainer = styled.section`
  position: relative;
  width: 80rem;
  min-height: 50rem;
  height: auto;
  max-height: 100vh;
  overflow: hidden;
  border: 1px solid
    rgba(${(props) => HEXToRGB(props.theme.colors.onBackground)}, 0.2);
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 6px 5px 5px 0px rgba(${HEXToRGB(Black.main)}, 0.5);
`;

export const ModalHeader = styled.header`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.onBackground};
  background-color: ${(props) => props.theme.colors.surface};

  & > h1 {
    display: flex;
    justify-content: center;
    width: 65%;
    color: ${(props) => props.theme.colors.onSurface};
    font-size: 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  @media screen and ${devices.sm} {
    & > h1 {
      white-space: normal;
      text-align: center;
    }
    height: auto;
  }
`;

export const ModalBody = styled.article`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${Light.main};
  transition: background-color 0.3s ease;
  & svg {
    transition: background-color 0.3s ease;
    color: ${DarkRed.light};
  }

  &:hover {
    & svg {
      transition: background-color 0.3s ease;
      color: ${Light.main};
    }
    transition: background-color 0.3s ease;
    background-color: ${DarkRed.light};
  }
`;
