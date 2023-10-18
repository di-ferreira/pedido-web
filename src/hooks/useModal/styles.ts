import styled from 'styled-components';
import { Black, DarkRed, Light } from '../../colors';
import { HEXToRGB } from '../../utils';
import { devices } from '../../utils/Constants';

interface iStyle {
  width?: string;
  height?: string;
}

interface iModalContainerStyle extends iStyle {
  xs?: iStyle;
  sm?: iStyle;
  md?: iStyle;
  lg?: iStyle;
  xl?: iStyle;
}

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

export const ModalContainer = styled.section<iModalContainerStyle>`
  position: relative;
  overflow: hidden;
  border: 1px solid
    rgba(${(props) => HEXToRGB(props.theme.colors.onBackground)}, 0.2);
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 6px 5px 5px 0px rgba(${HEXToRGB(Black.main)}, 0.5);

  max-width: 100vw;
  max-height: 100vh;

  ${({ width, height }) => `
    width: ${width ? width : '100vw'};
    height: ${height ? height : '100vh'};
  `}

  ${({ xs }) =>
    xs &&
    `
      @media only screen and ${devices.xs} {      
          ${xs.width ? `width:${xs.width};` : ''}
          ${xs.height ? `height:${xs.height};` : ''}
      }
    `}
  ${({ sm }) =>
    sm &&
    `
      @media only screen and ${devices.sm} {   
          ${sm.width ? `width:${sm.width};` : ''}
          ${sm.height ? `height:${sm.height};` : ''}
      }
    `}
  ${({ md }) =>
    md &&
    `
      @media only screen and ${devices.md} {     
          ${md.width ? `width:${md.width};` : ''}
          ${md.height ? `height:${md.height};` : ''}
      }
    `}
  ${({ lg }) =>
    lg &&
    `
      @media only screen and ${devices.lg} {     
          ${lg.width ? `width:${lg.width};` : ''}
          ${lg.height ? `height:${lg.height};` : ''}
      }
    `}
  ${({ xl }) =>
    xl &&
    `
      @media only screen and ${devices.xl} {     
          ${xl.width ? `width:${xl.width};` : ''}
          ${xl.height ? `height:${xl.height};` : ''}
      }
    `}
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
  @media screen and (${devices.sm}) {
    & > h1 {
      white-space: normal;
      text-align: center;
    }
    height: auto;
  }
`;

export const ModalBody = styled.article<iStyle>`
  position: relative;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) =>
    props.height ? `calc(${props.height} - 3.5rem)` : 'calc(100vh - 3.5rem)'};
  padding: 1rem;

  @media screen and (${devices.xl}) {
    height: calc(90vh - 3.5rem);
  }
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
