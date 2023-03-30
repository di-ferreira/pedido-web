import React from 'react';
import {
  Container,
  Label,
  LabelSwitch,
  SliderSwitch,
  TypeToColor,
} from './styles';
import { iSwitchType } from '../../@types';

interface iCustomSwitch {
  label?: string;
  labelColor?: string;
  checked: boolean;
  width?: string;
  height?: string;
  onClick: () => void;
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
  const { switcherOff, switcherOn } = TypeToColor[style ? style : 'default'];
  return (
    <Container onClick={() => onClick()} width={width} height={height}>
      {label && (
        <Label TextColor={labelColor} hasLabel={label ? true : false}>
          {label}
        </Label>
      )}
      <LabelSwitch>
        <SliderSwitch
          hasLabel={label ? true : false}
          handdleSwitchOn={checkedOnColor ? checkedOnColor : switcherOn}
          handdleSwitchOff={checkedOffColor ? checkedOffColor : switcherOff}
          handdleSwitchOffBackground={checkedOffBackground}
          handdleSwitchOnBackground={checkedOnBackground}
          checked={checked}
        ></SliderSwitch>
      </LabelSwitch>
    </Container>
  );
};

