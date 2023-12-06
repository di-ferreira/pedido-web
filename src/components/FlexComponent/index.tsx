import React, { ReactNode } from 'react';

import { Container } from './styles';

interface iFlexStyle {
  style?: React.CSSProperties | undefined;
  container?: boolean;
  isHide?: boolean;
  direction?: 'row' | 'column';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  margin?: string;
  padding?: string;
  gapRow?: string;
  gapColumn?: string;
  order?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | 'auto' | 'max-content' | 'min-content' | 'fit-content';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  background?: string;
  overflow?:
    | 'hidden'
    | 'hidden scroll'
    | 'hidden auto'
    | 'scroll'
    | 'scroll hidden'
    | 'scroll auto'
    | 'auto'
    | 'auto hidden'
    | 'auto scroll';
}

interface iFlexComponent extends iFlexStyle {
  xs?: iFlexStyle;
  sm?: iFlexStyle;
  md?: iFlexStyle;
  lg?: iFlexStyle;
  xl?: iFlexStyle;
  children?: ReactNode;
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
  id?: string | undefined;
}

export const FlexComponent: React.FC<iFlexComponent> = ({
  isHide,
  alignItems,
  alignSelf,
  children,
  alignContent,
  container,
  direction,
  flexBasis,
  flexGrow,
  flexShrink,
  gapColumn,
  gapRow,
  background,
  height,
  justifyContent,
  order,
  width,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  wrap,
  overflow,
  margin,
  padding,
  lg,
  md,
  sm,
  xl,
  xs,
  ref,
  id,
  style,
}) => {
  return (
    <Container
      style={style}
      id={id}
      ref={ref}
      isHide={isHide || false}
      container={container || true}
      direction={direction}
      alignItems={alignItems}
      alignSelf={alignSelf}
      flexBasis={flexBasis}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      gapColumn={gapColumn}
      gapRow={gapRow}
      height={height}
      justifyContent={justifyContent}
      order={order}
      width={width}
      wrap={wrap}
      alignContent={alignContent}
      overflow={overflow}
      margin={margin}
      padding={padding}
      background={background}
      lg={lg}
      md={md}
      sm={sm}
      xl={xl}
      xs={xs}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      {children}
    </Container>
  );
};
