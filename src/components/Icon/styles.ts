import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../colors';

export type iIconType = 'default' | 'success' | 'warn' | 'danger';

interface iStyleIcon {
  typeButton?: iIconType;
}

export const Container = styled(FontAwesomeIcon)<iStyleIcon>`
  color: ${(props) =>
    props.typeButton === 'danger'
      ? colors.danger
      : props.typeButton === 'warn'
      ? colors.warn
      : props.typeButton === 'success'
      ? colors.success
      : `rgba(${colors.darkRgb}, 0.85)`};
`;

