import React from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { iSwitchType } from '../../../@types/Button';
import { Icon } from '../../Icon';
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, Text, TypeToColor } from './styles';

interface iCustomCheckbox {
  label?: string;
  checked: boolean;
  width?: string;
  height?: string;
  onClick?: () => void;
  style?: iSwitchType;
  checkedOffColor?: string;
  checkedOnColor?: string;
}

export const CustomCheckbox: React.FC<iCustomCheckbox> = ({
  checked,
  onClick,
  checkedOffColor,
  checkedOnColor,
  height,
  label,
  style,
  width,
}) => {
  const { switcherOff, switcherOn } = TypeToColor[style || 'default'];
  return (
    <CheckboxContainer
      width={width}
      height={height}
      checked={checked}
      onClick={() => onClick && onClick()}
      handdleCheckboxOn={checkedOnColor || switcherOn}
      handdleCheckboxOff={checkedOffColor || switcherOff}
    >
      <HiddenCheckbox onChange={() => onClick && onClick()} checked={checked} />
      <StyledCheckbox checked={checked}>
        <Icon Icon={faCheck} Type={style || 'default'} />
      </StyledCheckbox>
      <Text>{label}</Text>
    </CheckboxContainer>
  );
};
