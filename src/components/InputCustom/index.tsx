import React from 'react';

import { Container, Input, LabelInput } from './styles';

interface iInputCustom {
  label?: string;
  labelAlign?: 'left' | 'right' | 'center';
  textAlign?: 'left' | 'right' | 'center';
  type?: 'text' | 'password' | 'date' | 'number';
  value?: any;
  name?: string;
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  widht?: string;
  onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCustom: React.FC<iInputCustom> = ({
  onChange,
  type,
  labelAlign,
  textAlign,
  label,
  placeholder,
  onKeydown,
  readOnly,
  ref,
  name,
  value,
  height,
  widht,
}) => {
  return (
    <Container height={height} widht={widht}>
      {label && <LabelInput align={labelAlign}>{label}</LabelInput>}
      <Input
        align={textAlign}
        readOnly={readOnly ? readOnly : false}
        value={value}
        name={name}
        ref={ref}
        type={type ? type : 'text'}
        placeholder={placeholder}
        onKeyDown={(e) => onKeydown && onKeydown(e)}
        onChange={(e) => onChange && onChange(e)}
      />
    </Container>
  );
};

