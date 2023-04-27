import React from 'react';

import { Container } from './styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { iIconType } from '../../@types/Button';

interface iIconProps {
  Icon: IconProp;
  Type?: iIconType;
}

export const Icon: React.FC<iIconProps> = ({ Icon, Type }) => {
  return <Container icon={Icon} type={Type} />;
};

