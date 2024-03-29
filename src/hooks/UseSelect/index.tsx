import React from 'react';
import Select, { ActionMeta, MenuPlacement, PropsValue, SingleValue } from 'react-select';
import { iOption } from '../../@types/Table';
import { Black, Gray, Light, Secondary } from '../../colors';
import { HEXToRGB } from '../../utils';
import { useTheme } from '../useTheme';
import { Container, Label } from './styles';

interface iCustomSelect {
  label?: string;
  menuPosition?: MenuPlacement;
  options: iOption[];
  value?: PropsValue<iOption>;
  disabled?: boolean;
  onChange?: (newValue: SingleValue<iOption>, actionMeta: ActionMeta<iOption>) => void;
}

const RenderSelect: React.FC<iCustomSelect> = ({
  label,
  menuPosition,
  options,
  value,
  onChange,
  disabled,
}) => {
  const { ThemeName } = useTheme();
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Select
        isDisabled={disabled}
        onChange={onChange}
        options={options}
        defaultValue={options[0]}
        value={value}
        menuPlacement={menuPosition}
        styles={{
          control: (base, state) => ({
            ...base,
            '&:hover': {
              borderColor: `${Secondary.light}`,
              color: `${Secondary.dark}`,
            },
            borderColor: state.isFocused
              ? `${Secondary.light}`
              : `${ThemeName === 'light' ? Light.surface : Black.text}`,
            height: '100%',
            width: '100%',
            boxShadow: state.isFocused
              ? `0px 0px 3px 1px rgba(${HEXToRGB(Secondary.main)}, 0.7);`
              : '0 0 0 1px transparent',
            background: disabled
              ? `${ThemeName === 'light' ? Gray.MediumLight : Gray.Dark}`
              : `${ThemeName === 'light' ? Light.surface : Black.main}`,
          }),
          valueContainer: (base) => ({
            ...base,
            color: 'red',
          }),
          singleValue: (base) => ({
            ...base,
            '&:hover': {
              color: `${Secondary.main}`,
            },
            cursor: 'pointer',
            color: `${ThemeName === 'dark' ? Light.surface : Black.text}`,
            background: disabled
              ? `${ThemeName === 'light' ? Gray.MediumLight : Gray.Dark}`
              : `${ThemeName === 'light' ? Light.surface : Black.main}`,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            '&:hover': {
              color: `${Secondary.main}`,
            },
            cursor: 'pointer',
            color: `${ThemeName === 'dark' ? Light.surface : Black.text}`,
          }),
          indicatorSeparator: (base) => ({
            ...base,
            background: `${Secondary.main}`,
          }),
          menuList: (base) => ({
            ...base,
            color: `${ThemeName === 'dark' ? Light.surface : Black.text}`,
            background: `${ThemeName === 'light' ? Light.surface : Black.text}`,
          }),
          option: (base) => ({
            ...base,
            '&:hover': {
              color: `${ThemeName === 'light' ? Light.surface : Black.text}`,
              background: `${ThemeName === 'dark' ? Light.surface : Black.text}`,
            },
            cursor: 'pointer',
            color: `${ThemeName === 'dark' ? Light.surface : Black.text}`,
            background: `${ThemeName === 'light' ? Light.surface : Black.text}`,
          }),
        }}
      />
    </Container>
  );
};

const useSelect = () => {
  return {
    Select: RenderSelect,
  };
};

export default useSelect;
