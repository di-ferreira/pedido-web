import React, { forwardRef } from 'react';

import { Container, Input, LabelInput } from './styles';

interface iInputCustom {
  label?: string;
  labelAlign?: 'left' | 'right' | 'center';
  labelPosition?: 'left' | 'right' | 'top';
  textAlign?: 'left' | 'right' | 'center';
  type?: 'text' | 'password' | 'date' | 'number' | 'radio';
  value?: any;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  widht?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  autofocus?: boolean;
  onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
type Ref = HTMLInputElement;

export const InputCustom = forwardRef<Ref, iInputCustom>(
  (
    {
      onChange,
      onKeydown,
      onBlur,
      type,
      labelAlign,
      textAlign,
      label,
      labelPosition,
      placeholder,
      readOnly,
      checked,
      defaultChecked,
      name,
      value,
      height,
      widht,
      autofocus,
    },
    ref
  ) => {
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
          autoFocus={autofocus ? autofocus : false}
          align={textAlign}
          readOnly={readOnly ? readOnly : false}
          value={value}
          name={name}
          ref={ref}
          type={type ? type : 'text'}
          placeholder={placeholder}
          onKeyDown={(e) => onKeydown && onKeydown(e)}
          onChange={(e) => onChange && onChange(e)}
          onBlur={(e) => onBlur && onBlur(e)}
          checked={checked}
          defaultChecked={defaultChecked}
        />
      </Container>
    );
  }
);

