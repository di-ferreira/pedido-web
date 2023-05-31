export interface iModalRender {
  Title: string;
  OnClose: () => void;
  OnCloseButtonClick?: () => void;
  children?: ReactNode;
}
export interface iModal {
  Title: string;
  OnCloseButtonClick?: () => void;
  children?: ReactNode;
}
