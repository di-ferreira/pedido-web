import React, { forwardRef } from 'react';

import { Container, Input, LabelInput } from './styles';

interface iInputCustom {
  label?: string;
  labelAlign?: 'left' | 'right' | 'center';
  labelPosition?: 'left' | 'right' | 'top';
  textAlign?: 'left' | 'right' | 'center';
  type?: 'text' | 'password' | 'date' | 'number' | 'radio';
  value?: string | number | readonly string[] | undefined | null;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  widht?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
type Ref = HTMLInputElement;

export const InputCustom = forwardRef<Ref, iInputCustom>(function InputContainer(
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
    disabled,
  },
  ref,
) {
  return (
    <Container
      labelPosition={labelPosition || 'top'}
      height={height}
      widht={widht}
      label={label}
      type={type}
      disabled={disabled || false}
    >
      {label && (
        <LabelInput labelPosition={labelPosition || 'top'} align={labelAlign}>
          {label}
        </LabelInput>
      )}
      <Input
        autoFocus={autofocus || false}
        align={textAlign}
        readOnly={readOnly || false}
        value={value || ''}
        name={name}
        ref={ref}
        type={type || 'text'}
        placeholder={placeholder}
        onKeyDown={(e) => onKeydown && onKeydown(e)}
        onChange={(e) => onChange && onChange(e)}
        onBlur={(e) => onBlur && onBlur(e)}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || false}
      />
    </Container>
  );
});
