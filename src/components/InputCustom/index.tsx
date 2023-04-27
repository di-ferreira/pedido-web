import React from 'react';

import { Container, Input, LabelInput } from './styles';

interface iInputCustom {
  label?: string;
  type?: 'text' | 'password' | 'date' | 'number';
  value?: any;
  name?: string;
  placeholder?: string;
  height?: string;
  widht?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCustom: React.FC<iInputCustom> = ({
  onChange,
  type,
  label,
  placeholder,
  name,
  value,
  height,
  widht,
}) => {
  return (
    <Container height={height} widht={widht}>
      {label && <LabelInput>{label}</LabelInput>}
      <Input
        value={value}
        name={name}
        type={type ? type : 'text'}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </Container>
  );
};

