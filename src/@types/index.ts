import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

export interface iButtonAction<T> {
  Text?: string;
  Title?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  Rounded?: boolean;
  Type?: iButtonType;
  onclick: (item: T) => void;
}

export interface iColumnType<T> {
  key: string;
  title: string;
  width?: number;
  isHideMobile?: boolean;
  render?: (column: iColumnType<T>, item: T) => void;
  action?: iButtonAction<T>[];
}

export interface iTableProps<T> {
  data: T[];
  columns: iColumnType<T>[];
}

export interface iModalRender {
  Title: string;
  OnClose: () => void;
  children?: ReactNode;
}
export interface iModal {
  Title: string;
  children?: ReactNode;
}
export interface iButton {
  Text?: string;
  TypeButton?: 'button' | 'reset' | 'submit';
  Title?: string;
  Height?: string;
  Width?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  Rounded?: boolean;
  Type?: iButtonType;
  background?: string;
  textColor?: string;
  onclick?: () => void;
}

export type iButtonType =
  | 'default'
  | 'success'
  | 'warn'
  | 'danger'
  | 'primary'
  | 'secondary';

export type iIconType = iButtonType;

export type iTabData = {
  Icon: IconProp;
  TitleTab: string;
  Link: string;
  Closable?: boolean;
  isActive: boolean;
};

export interface iUserLogin {
  username: string;
  password: string;
}

export interface iCurrentUser {
  username: string;
  type: string;
  level: number;
}

export interface iTokenPayload {
  Chave: string;
  Nivel: string;
  Tipo: string;
  Usuario: string;
  Validade: Date;
  iss: string;
}
