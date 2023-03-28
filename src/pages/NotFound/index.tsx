import React from 'react';
import { Container, Image, Title } from './styles';
import NotFoundIlustration from '../../assets/404.svg';

export const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>PÁGINA NÃO ENCONTRADA</Title>
      <Image src={NotFoundIlustration} />
    </Container>
  );
};

