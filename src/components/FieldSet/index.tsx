import React, { ReactNode } from 'react';

import { Container, TitleField } from './styles';

interface iFieldSet {
  children?: ReactNode;
  legend: string;
  disabled?: boolean;
}

export const FieldSet: React.FC<iFieldSet> = ({ children, legend, disabled }) => {
  return (
    <Container disabled={disabled || false}>
      <TitleField>{legend}</TitleField>
      {children}
    </Container>
  );
};
