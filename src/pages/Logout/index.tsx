import React, { useEffect, useRef, useState } from 'react';
import { Container } from './styles';
import { useNavigate } from 'react-router-dom';

export const Logout: React.FC = () => {
  const [time, setTime] = useState(3);
  const timeout = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setTime((t) => t - 1);
    }, 2000);

    if (time <= 0) {
      navigate('/login');
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [time]);

  return (
    <Container>
      <h1>Saindo...</h1>
    </Container>
  );
};
