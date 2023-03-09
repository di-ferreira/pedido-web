import React from 'react';
import { Container, IconButton, TypeToColor } from './styles';
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
  const { bgColor, color } = TypeToColor[Type ? Type : 'default'];

  return (
    <Container
      bgColor={bgColor}
      color={color}
      rounded={Rounded}
      title={Title}
      onClick={() => onclick()}
    >
      {Icon && <IconButton icon={Icon} size={Size} />}
      {Text && <span>{Text}</span>}
    </Container>
  );
};

export default Button;

