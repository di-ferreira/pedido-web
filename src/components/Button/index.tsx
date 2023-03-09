import React from 'react';
import { Container, IconButton } from './styles';
import { iButton } from '../../@types';

const Button: React.FC<iButton> = ({
  Type,
  Icon,
  Text,
  Size,
  Rounded,
  Title,
  onclick,
}) => {
  return (
    <Container
      rounded={Rounded}
      typeButton={Type}
      title={Title}
      onClick={() => onclick()}
    >
      {Icon && <IconButton icon={Icon} size={Size} />}
      {Text && <span>{Text}</span>}
    </Container>
  );
};

export default Button;

