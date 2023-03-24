import React from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { Container, Label } from './styles';
import { Black, Dark, DarkRed, Light, Primary, Secondary } from '../../colors';
import { useTheme } from '../useTheme';
import { HEXToRGB } from '../../utils';

export interface iOption {
  label: string;
  value: string;
}
interface iCustomSelect {
  label?: string;
  options: iOption[];
  onChange?: (
    newValue: SingleValue<iOption>,
    actionMeta: ActionMeta<iOption>
  ) => void;
}

const RenderSelect: React.FC<iCustomSelect> = ({
  label,
  options,
  onChange,
}) => {
  const { ThemeName } = useTheme();
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Select
        onChange={onChange}
        options={options}
        defaultValue={options[0]}
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
            boxShadow: state.isFocused
              ? `0px 0px 3px 1px rgba(${HEXToRGB(Secondary.main)}, 0.7);`
              : `0 0 0 1px transparent`,
            background: `${ThemeName === 'light' ? Light.surface : Black.main}`,
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
            background: `${ThemeName === 'light' ? Light.surface : Black.main}`,
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
              background: `${
                ThemeName === 'dark' ? Light.surface : Black.text
              }`,
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

