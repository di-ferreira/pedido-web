export interface iModalRender {
  Title: string;
  OnClose: () => void;
  OnCloseButtonClick?: () => void;
  width?: string;
  height?: string;
  children?: ReactNode;
}
export interface iModal {
  Title: string;
  OnCloseButtonClick?: () => void;
  children?: ReactNode;
  width?: string;
  height?: string;
}
