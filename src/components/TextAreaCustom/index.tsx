import React from 'react';

import { Container, TextArea, LabelInput } from './styles';

interface iTextAreaCustom {
  label?: string;
  value?: any;
  name?: string;
  readOnly?: boolean;
  placeholder?: string;
  height?: string;
  widht?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaCustom: React.FC<iTextAreaCustom> = ({
  onChange,
  label,
  placeholder,
  name,
  value,
  readOnly,
  height,
  widht,
}) => {
  return (
    <Container height={height} widht={widht}>
      {label && <LabelInput>{label}</LabelInput>}
      <TextArea
        value={value}
        readOnly={readOnly ? readOnly : false}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e)}
      />
    </Container>
  );
};

