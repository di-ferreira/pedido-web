import React from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Container, IconButton } from './styles';
import { iButtonType } from '../../@types';

interface iButton {
  Text?: string;
  Title?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  Rounded?: boolean;
  Type?: iButtonType;
  onclick: () => void;
}

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

