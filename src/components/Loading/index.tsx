import React from 'react';
import Lottie from 'lottie-react';
import LoadingAnim from '../../assets/EMLoading.json';
import { Container } from './styles';

export const Loading: React.FC = () => {
  return (
    <Container>
      <Lottie animationData={LoadingAnim} />
    </Container>
  );
};
