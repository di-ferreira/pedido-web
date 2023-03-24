import React from 'react';

import { Container, Input, LabelInput } from './styles';

interface iInputCustom {
  label?: string;
  type?: 'text' | 'password' | 'date';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCustom: React.FC<iInputCustom> = ({
  onChange,
  type,
  label,
  placeholder,
}) => {
  return (
    <Container>
      {label && <LabelInput>{label}</LabelInput>}
      <Input
        type={type ? type : 'text'}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </Container>
  );
};

