import React from 'react';
import { CustomCheckbox } from './CustomCheckbox';
import { CustomSwitch, iCustomSwitch } from './CustomSwitch';

// import { Container } from './styles';
interface iCheckbox extends iCustomSwitch {
  type: 'switch' | 'checkbox';
}
const Checkbox: React.FC<iCheckbox> = ({
  type,
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
  return type === 'switch' ? (
    <CustomSwitch
      checked={checked}
      onClick={onClick}
      checkedOffColor={checkedOffColor}
      checkedOffBackground={checkedOffBackground}
      checkedOnBackground={checkedOnBackground}
      checkedOnColor={checkedOnColor}
      height={height}
      label={label}
      labelColor={labelColor}
      style={style}
      width={width}
    />
  ) : (
    <CustomCheckbox
      checked={checked}
      onClick={onClick}
      checkedOffColor={checkedOffColor}
      checkedOnColor={checkedOnColor}
      height={height}
      label={label}
      style={style}
      width={width}
    />
  );
};

export default Checkbox;
