import React from 'react';

import { Container, Input, LabelInput } from './styles';

interface iInputCustom {
  label?: string;
  labelAlign?: 'left' | 'right' | 'center';
  labelPosition?: 'left' | 'right' | 'top';
  textAlign?: 'left' | 'right' | 'center';
  type?: 'text' | 'password' | 'date' | 'number' | 'radio';
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
  checked?: boolean;
  defaultChecked?: boolean;
  onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCustom: React.FC<iInputCustom> = ({
  onChange,
  type,
  labelAlign,
  textAlign,
  label,
  labelPosition,
  placeholder,
  onKeydown,
  readOnly,
  checked,
  defaultChecked,
  ref,
  name,
  value,
  height,
  widht,
}) => {
  return (
    <Container
      labelPosition={labelPosition ? labelPosition : 'top'}
      height={height}
      widht={widht}
      label={label}
      type={type}
    >
      {label && (
        <LabelInput
          labelPosition={labelPosition ? labelPosition : 'top'}
          align={labelAlign}
        >
          {label}
        </LabelInput>
      )}
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
        checked={checked}
        defaultChecked={defaultChecked}
      />
    </Container>
  );
};

