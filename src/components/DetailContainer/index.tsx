import React from 'react';

import { Container, Summary } from './styles';

interface iDetailComponent {
  summary: string;
  children: React.ReactNode;
}

export const DetailContainer: React.FC<iDetailComponent> = ({
  children,
  summary,
}) => {
  return (
    <Container>
      <Summary>{summary}</Summary>
      {children}
    </Container>
  );
};

