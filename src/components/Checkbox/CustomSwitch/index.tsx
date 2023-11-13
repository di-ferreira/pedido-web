import React from 'react';
import { iSwitchType } from '../../../@types/Button';
import { Container, Label, LabelSwitch, SliderSwitch, TypeToColor } from './styles';

export interface iCustomSwitch {
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

export const CustomSwitch: React.FC<iCustomSwitch> = ({
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
  const { switcherOff, switcherOn } = TypeToColor[style || 'default'];
  return (
    <Container onClick={() => onClick && onClick()} width={width} height={height}>
      {label && (
        <Label TextColor={labelColor} hasLabel={!!label}>
          {label}
        </Label>
      )}
      <LabelSwitch>
        <SliderSwitch
          hasLabel={!!label}
          handdleSwitchOn={checkedOnColor || switcherOn}
          handdleSwitchOff={checkedOffColor || switcherOff}
          handdleSwitchOffBackground={checkedOffBackground}
          handdleSwitchOnBackground={checkedOnBackground}
          checked={checked}
        ></SliderSwitch>
      </LabelSwitch>
    </Container>
  );
};
