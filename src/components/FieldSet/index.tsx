import React, { ReactNode } from 'react';

import { Container, TitleField } from './styles';

interface iFieldSet {
  children?: ReactNode;
  legend: string;
}

export const FieldSet: React.FC<iFieldSet> = ({ children, legend }) => {
  return (
    <Container>
      <TitleField>{legend}</TitleField>
      {children}
    </Container>
  );
};

