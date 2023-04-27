import React from 'react';
import { Container, IconButton, TypeToColor } from './styles';
import { iButton } from '../../@types/Button';

const Button: React.FC<iButton> = ({
  Type,
  TypeButton,
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
  disabled,
  AnimationPulse,
  AnimationSpin,
}) => {
  const { bgColor, color, hoverColor } = TypeToColor[Type ? Type : 'default'];

  return (
    <Container
      type={TypeButton ? TypeButton : 'button'}
      height={Height}
      width={Width}
      bgColor={background ? background : bgColor}
      hoverColor={hoverColor}
      color={textColor ? textColor : color}
      rounded={Rounded}
      title={Title}
      onClick={() => onclick && onclick()}
      disabled={disabled ? true : false}
    >
      {Icon && (
        <IconButton
          icon={Icon}
          size={Size}
          spin={AnimationSpin}
          spinPulse={AnimationPulse}
        />
      )}
      {Text && <span>{Text}</span>}
    </Container>
  );
};

export default Button;

