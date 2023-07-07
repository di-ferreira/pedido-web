import React from 'react';
import { Container } from './styles';

export const InputRadio: React.FC = () => {
  return (
    <Container>
      <input
        type='radio'
        name='topping'
        value='Regular'
        id='regular'
        checked={false}
        onChange={(e) => e}
      />
    </Container>
  );
};

