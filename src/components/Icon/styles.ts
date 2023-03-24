import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Danger, Gray, Success, Warn } from '../../colors';
import { iIconType } from '../../@types';

interface iStyleIcon {
  typeButton?: iIconType;
}

export const Container = styled(FontAwesomeIcon)<iStyleIcon>`
  color: ${(props) =>
    props.typeButton === 'danger'
      ? Danger.main
      : props.typeButton === 'warn'
      ? Warn.main
      : props.typeButton === 'success'
      ? Success.main
      : Gray.Medium};
`;
