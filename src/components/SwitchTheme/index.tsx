import React from 'react';
import Switch from 'react-switch';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import { Black, Light, Secondary, Warn } from '../../colors';

import { Container, IconSwitch } from './styles';

export const SwitchTheme: React.FC = () => {
  const { toggleTheme, ThemeName } = useTheme();
  return (
    <Container>
      <Switch
        checked={ThemeName === 'light'}
        onChange={toggleTheme}
        checkedIcon={<IconSwitch color={Secondary.main} icon={faSun} />}
        uncheckedIcon={<IconSwitch color={Light.main} icon={faMoon} />}
        onHandleColor={Light.main}
        offHandleColor={Light.main}
        offColor={Black.main}
        onColor={Warn.light}
      />
    </Container>
  );
};
