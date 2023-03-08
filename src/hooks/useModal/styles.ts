import styled from 'styled-components';
import { colors } from '../../colors';

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
  background-color: rgba(${colors.darkRgb}, 0.4);
`;

export const ModalContainer = styled.section`
  position: relative;
  width: 80rem;
  height: 50rem;
  overflow: hidden;
  border-radius: 0.8rem;
  background-color: ${colors.white};
  box-shadow: 6px 5px 5px 0px rgba(${colors.darkRgb}, 0.5);
`;

export const ModalHeader = styled.header`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.BlueInst};
  color: ${colors.white};
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
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
  background-color: ${colors.white};
  transition: background-color 0.3s ease;
  & svg {
    transition: background-color 0.3s ease;
    color: ${colors.RedRose};
  }

  &:hover {
    & svg {
      transition: background-color 0.3s ease;
      color: ${colors.white};
    }
    transition: background-color 0.3s ease;
    background-color: ${colors.RedRose};
  }
`;

