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
  Height,
  Width,
  background,
  textColor,
}) => {
  const { bgColor, color, hoverColor } = TypeToColor[Type ? Type : 'default'];

  return (
    <Container
      height={Height}
      width={Width}
      bgColor={background ? background : bgColor}
      hoverColor={hoverColor}
      color={textColor ? textColor : color}
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

