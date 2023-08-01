import React from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { iSwitchType } from '../../../@types/Button';
import { Icon } from '../../Icon';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Text,
  TypeToColor,
} from './styles';

interface iCustomCheckbox {
  label?: string;
  labelColor?: string;
  checked: boolean;
  width?: string;
  height?: string;
  onClick?: () => void;
  style?: iSwitchType;
  checkedOffColor?: string;
  checkedOnColor?: string;
  checkedOffBackground?: string;
  checkedOnBackground?: string;
}

export const CustomCheckbox: React.FC<iCustomCheckbox> = ({
  checked,
  onClick,
  checkedOffColor,
  checkedOnColor,
  checkedOffBackground,
  checkedOnBackground,
  height,
  label,
  labelColor,
  style,
  width,
}) => {
  const { switcherOff, switcherOn } = TypeToColor[style ? style : 'default'];
  return (
    <CheckboxContainer
      width={width}
      height={height}
      checked={checked}
      onClick={() => onClick && onClick()}
      handdleCheckboxOn={checkedOnColor ? checkedOnColor : switcherOn}
      handdleCheckboxOff={checkedOffColor ? checkedOffColor : switcherOff}
    >
      <HiddenCheckbox checked={checked} />
      <StyledCheckbox checked={checked}>
        <Icon Icon={faCheck} Type={style ? style : 'default'} />
      </StyledCheckbox>
      <Text>{label}</Text>
    </CheckboxContainer>
  );
};

