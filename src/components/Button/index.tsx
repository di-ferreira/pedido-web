import React from 'react';
import { iButton } from '../../@types/Button';
import { Container, IconButton, TypeToColor } from './styles';

const Button: React.FC<iButton> = ({
  Type,
  TypeButton,
  Icon,
  Text,
  style,
  Size,
  Rounded,
  Title,
  onclick,
  Height,
  Width,
  background,
  textColor,
  disabled,
  AnimationPulse,
  AnimationSpin,
}) => {
  const { bgColor, color, hoverColor } = TypeToColor[Type || 'default'];

  return (
    <Container
      style={style}
      type={TypeButton || 'button'}
      height={Height}
      width={Width}
      bgColor={background || bgColor}
      hoverColor={hoverColor}
      color={textColor || color}
      rounded={Rounded}
      title={Title}
      onClick={() => onclick && onclick()}
      disabled={!!disabled}
    >
      {Icon && (
        <IconButton
          icon={Icon}
          size={Size}
          spin={AnimationSpin}
          spinPulse={AnimationPulse}
          onClick={() => onclick && onclick()}
        />
      )}
      {Text && <span>{Text}</span>}
    </Container>
  );
};

export default Button;
