export interface iModalRender extends iModalStyle {
  Title: string;
  OnClose: () => void;
  OnCloseButtonClick?: () => void;
  children?: ReactNode;
  xs?: iModalStyle;
  sm?: iModalStyle;
  md?: iModalStyle;
  lg?: iModalStyle;
  xl?: iModalStyle;
}
interface iModalStyle {
  width?: string;
  height?: string;
}
export interface iModal extends iModalStyle {
  Title: string;
  OnCloseButtonClick?: () => void;
  children?: ReactNode;
  xs?: iModalStyle;
  sm?: iModalStyle;
  md?: iModalStyle;
  lg?: iModalStyle;
  xl?: iModalStyle;
}
