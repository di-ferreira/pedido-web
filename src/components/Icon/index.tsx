import React from 'react';

import { Container, iIconType } from './styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface iIconProps {
  Icon: IconProp;
  Type?: iIconType;
}

export const Icon: React.FC<iIconProps> = ({ Icon, Type }) => {
  return <Container icon={Icon} typeButton={Type} />;
};

