import React, { useState } from 'react';

import { Container, Input, Label } from './styles';

interface iOption {
  label: string;
  value: string;
}
interface iCustomSelect {
  label?: string;
}

export const Select: React.FC<iCustomSelect> = ({ label }) => {
  const [CurrentValue, setCurrentValue] = useState<iOption>({
    label: '',
    value: '',
  });

  const [Active, setActive] = useState(false);
  const haddleActiveInput = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.target.value !== '') {
      setActive(true);
    } else {
      setActive(false);
    }
    console.log(Active);
  };

  return (
    <Container>
      {label && <Label active={Active}>{label}</Label>}
      <Input
        type='text'
        // value={CurrentValue.label}
        onFocus={(e) => haddleActiveInput(e)}
        onBlur={(e) => haddleActiveInput(e)}
      />
      {/* <Input />
      <Options>
        <Option></Option>
      </Options> */}
    </Container>
  );
};

