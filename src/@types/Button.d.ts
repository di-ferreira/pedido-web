export interface iButton {
  Text?: string;
  TypeButton?: 'button' | 'reset' | 'submit';
  Title?: string;
  Height?: string;
  Width?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  style?: React.CSSProperties | undefined;
  Rounded?: boolean;
  Type?: iButtonType;
  background?: string;
  textColor?: string;
  disabled?: boolean;
  AnimationSpin?: boolean;
  AnimationPulse?: boolean;
  onclick?: () => void;
}

export type iButtonType =
  | 'default'
  | 'success'
  | 'warn'
  | 'danger'
  | 'primary'
  | 'secondary';

export interface iButtonAction<T> {
  Text?: string;
  Title?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  Rounded?: boolean;
  Type?: iButtonType;
  onclick: (item: T) => void;
}

export type iIconType = iButtonType;

export type iSwitchType = iButtonType;
