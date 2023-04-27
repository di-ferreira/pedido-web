import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Danger, Gray, Success, Warn } from '../../colors';
import { iIconType } from '../../@types/Button';

interface iStyleIcon {
  type?: iIconType;
}

export const Container = styled(FontAwesomeIcon)<iStyleIcon>`
  color: ${(props) =>
    props.type === 'danger'
      ? Danger.main
      : props.type === 'warn'
      ? Warn.main
      : props.type === 'success'
      ? Success.main
      : Gray.Medium};
`;
