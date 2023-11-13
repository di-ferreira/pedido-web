import styled from 'styled-components';
import { devices } from '../../utils/Constants';

interface iStyle {
  isHide?: boolean;
  width?: string;
  height?: string;
  container?: boolean;
  direction?: string;
  wrap?: string;
  justifyContent?: string;
  alignContent?: string;
  alignItems?: string;
  gapRow?: string;
  gapColumn?: string;
  order?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  alignSelf?: string;
  overflow?: string;
  margin?: string;
  padding?: string;
}

interface iFlexComponentStyle extends iStyle {
  xs?: iStyle;
  sm?: iStyle;
  md?: iStyle;
  lg?: iStyle;
  xl?: iStyle;
}

export const Container = styled.div<iFlexComponentStyle>`
  ${({
    width,
    height,
    order,
    flexGrow,
    flexShrink,
    flexBasis,
    alignSelf,
    overflow,
    margin,
    padding,
  }) => `
    ${width ? `width:${width};` : 'width:100%;'}
    ${height ? `height:${height};` : 'height:auto;'}
    ${order ? `order:${order};` : ''}
    ${flexGrow ? `flex-grow:${flexGrow};` : ''}
    ${flexShrink ? `flex-shrink:${flexShrink};` : ''}
    ${flexBasis ? `flex-basis:${flexBasis};` : ''}
    ${alignSelf ? `align-self:${alignSelf};` : ''}
    ${overflow ? `overflow:${overflow};` : ''}
    ${margin ? `margin:${margin};` : ''}
    ${padding ? `padding:${padding};` : ''}
`}

  ${({
    isHide,
    container,
    direction,
    wrap,
    justifyContent,
    alignContent,
    alignItems,
    gapRow,
    gapColumn,
  }) =>
    container &&
    `
        display:${isHide ? 'none' : 'flex'};
        flex-direction: ${direction || 'row'};
        ${wrap ? `flex-wrap: ${wrap};` : ''}
        ${justifyContent ? `justify-content:${justifyContent};` : ''}
        ${alignItems ? `align-items: ${alignItems};` : ''}
        ${alignContent ? `align-content:${alignContent};` : ''}  
        ${gapRow ? `row-gap:${gapRow};` : ''}  
        ${gapColumn ? `column-gap:${gapColumn};` : ''}  
    `}
  
  
  ${({ sm }) =>
    sm &&
    `
        @media only screen and ${devices.sm} {
          ${sm.isHide === true ? 'display:none' : 'display:flex'};
          ${sm.direction ? `flex-direction:${sm.direction}` : ''};
          ${sm.wrap ? `flex-wrap: ${sm.wrap};` : ''}
          ${sm.justifyContent ? `justify-content:${sm.justifyContent};` : ''}
          ${sm.alignItems ? `align-items: ${sm.alignItems};` : ''}
          ${sm.alignContent ? `align-content:${sm.alignContent};` : ''}  
          ${sm.gapRow ? `row-gap:${sm.gapRow};` : ''}  
          ${sm.gapColumn ? `column-gap:${sm.gapColumn};` : ''}  
          ${sm.width ? `width:${sm.width};` : ''}
          ${sm.height ? `height:${sm.height};` : ''}
          ${sm.order ? `order:${sm.order};` : ''}
          ${sm.flexGrow ? `flex-grow:${sm.flexGrow};` : ''}
          ${sm.flexShrink ? `flex-shrink:${sm.flexShrink};` : ''}
          ${sm.flexBasis ? `flex-basis:${sm.flexBasis};` : ''}
          ${sm.alignSelf ? `align-self:${sm.alignSelf};` : ''}
          ${sm.overflow ? `overflow:${sm.overflow};` : ''}
          ${sm.margin ? `margin:${sm.margin};` : ''}
          ${sm.padding ? `padding:${sm.padding};` : ''}
        }
    `}

  ${({ xs }) =>
    xs &&
    `
        @media only screen and ${devices.xs} {
          ${xs.isHide ? 'display:none' : 'display:flex'};
          ${xs.direction ? `flex-direction:${xs.direction}` : ''};
          ${xs.wrap ? `flex-wrap: ${xs.wrap};` : ''}
          ${xs.justifyContent ? `justify-content:${xs.justifyContent};` : ''}
          ${xs.alignItems ? `align-items: ${xs.alignItems};` : ''}
          ${xs.alignContent ? `align-content:${xs.alignContent};` : ''}  
          ${xs.gapRow ? `row-gap:${xs.gapRow};` : ''}  
          ${xs.gapColumn ? `column-gap:${xs.gapColumn};` : ''}  
          ${xs.width ? `width:${xs.width};` : ''}
          ${xs.height ? `height:${xs.height};` : ''}
          ${xs.order ? `order:${xs.order};` : ''}
          ${xs.flexGrow ? `flex-grow:${xs.flexGrow};` : ''}
          ${xs.flexShrink ? `flex-shrink:${xs.flexShrink};` : ''}
          ${xs.flexBasis ? `flex-basis:${xs.flexBasis};` : ''}
          ${xs.alignSelf ? `align-self:${xs.alignSelf};` : ''}
          ${xs.overflow ? `overflow:${xs.overflow};` : ''}
          ${xs.margin ? `margin:${xs.margin};` : ''}
          ${xs.padding ? `padding:${xs.padding};` : ''}
        }
    `}

  ${({ md }) =>
    md &&
    `
        @media only screen and ${devices.md} {
          ${md.isHide ? 'display:none' : 'display:flex'};
          ${md.direction ? `flex-direction:${md.direction}` : ''};
          ${md.wrap ? `flex-wrap: ${md.wrap};` : ''}
          ${md.justifyContent ? `justify-content:${md.justifyContent};` : ''}
          ${md.alignItems ? `align-items: ${md.alignItems};` : ''}
          ${md.alignContent ? `align-content:${md.alignContent};` : ''}  
          ${md.gapRow ? `row-gap:${md.gapRow};` : ''}  
          ${md.gapColumn ? `column-gap:${md.gapColumn};` : ''}  
          ${md.width ? `width:${md.width};` : ''}
          ${md.height ? `height:${md.height};` : ''}
          ${md.order ? `order:${md.order};` : ''}
          ${md.flexGrow ? `flex-grow:${md.flexGrow};` : ''}
          ${md.flexShrink ? `flex-shrink:${md.flexShrink};` : ''}
          ${md.flexBasis ? `flex-basis:${md.flexBasis};` : ''}
          ${md.alignSelf ? `align-self:${md.alignSelf};` : ''}
          ${md.overflow ? `overflow:${md.overflow};` : ''}
          ${md.margin ? `margin:${md.margin};` : ''}
          ${md.padding ? `padding:${md.padding};` : ''}
        }
    `}

  ${({ lg }) =>
    lg &&
    `
        @media only screen and ${devices.lg} {
          ${lg.isHide ? 'display:none' : 'display:flex'};
          ${lg.direction ? `flex-direction:${lg.direction}` : ''};
          ${lg.wrap ? `flex-wrap: ${lg.wrap};` : ''}
          ${lg.justifyContent ? `justify-content:${lg.justifyContent};` : ''}
          ${lg.alignItems ? `align-items: ${lg.alignItems};` : ''}
          ${lg.alignContent ? `align-content:${lg.alignContent};` : ''}  
          ${lg.gapRow ? `row-gap:${lg.gapRow};` : ''}  
          ${lg.gapColumn ? `column-gap:${lg.gapColumn};` : ''}  
          ${lg.width ? `width:${lg.width};` : ''}
          ${lg.height ? `height:${lg.height};` : ''}
          ${lg.order ? `order:${lg.order};` : ''}
          ${lg.flexGrow ? `flex-grow:${lg.flexGrow};` : ''}
          ${lg.flexShrink ? `flex-shrink:${lg.flexShrink};` : ''}
          ${lg.flexBasis ? `flex-basis:${lg.flexBasis};` : ''}
          ${lg.alignSelf ? `align-self:${lg.alignSelf};` : ''}
          ${lg.overflow ? `overflow:${lg.overflow};` : ''}
          ${lg.margin ? `margin:${lg.margin};` : ''}
          ${lg.padding ? `padding:${lg.padding};` : ''}
        }
    `}

  ${({ xl }) =>
    xl &&
    `
        @media only screen and ${devices.xl} {
         ${xl.isHide ? 'display:none' : 'display:flex'};
           ${xl.direction ? `flex-direction:${xl.direction}` : ''};
          ${xl.wrap ? `flex-wrap: ${xl.wrap};` : ''}
          ${xl.justifyContent ? `justify-content:${xl.justifyContent};` : ''}
          ${xl.alignItems ? `align-items: ${xl.alignItems};` : ''}
          ${xl.alignContent ? `align-content:${xl.alignContent};` : ''}  
          ${xl.gapRow ? `row-gap:${xl.gapRow};` : ''}  
          ${xl.gapColumn ? `column-gap:${xl.gapColumn};` : ''}  
          ${xl.width ? `width:${xl.width};` : ''}
          ${xl.height ? `height:${xl.height};` : ''}
          ${xl.order ? `order:${xl.order};` : ''}
          ${xl.flexGrow ? `flex-grow:${xl.flexGrow};` : ''}
          ${xl.flexShrink ? `flex-shrink:${xl.flexShrink};` : ''}
          ${xl.flexBasis ? `flex-basis:${xl.flexBasis};` : ''}
          ${xl.alignSelf ? `align-self:${xl.alignSelf};` : ''}
          ${xl.overflow ? `overflow:${xl.overflow};` : ''}
          ${xl.margin ? `margin:${xl.margin};` : ''}
          ${xl.padding ? `padding:${xl.padding};` : ''}
        }
    `}

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.onSurface};
  }
`;
