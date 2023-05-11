import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalContainer,
  Backdrop,
  ModalHeader,
  ModalBody,
  CloseButton,
} from './styles';
import { Icon } from '../../components/Icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { iModal, iModalRender } from '../../@types/Modal';

const RenderLayout: React.FC<iModalRender> = ({ Title, OnClose, children }) => {
  return (
    <Backdrop>
      <ModalContainer>
        <CloseButton onClick={() => OnClose()}>
          <Icon Icon={faTimes} />
        </CloseButton>
        <ModalHeader>
          <h1>{Title}</h1>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Backdrop>
  );
};

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const OnClose = () => setIsVisible(false);

  const Modal: React.FC<iModal> = ({ Title, children }) =>
    ReactDOM.createPortal(
      RenderLayout({ Title, children, OnClose }),
      document.body
    );

  const ResultModal = useMemo(() => {
    return isVisible ? Modal : null;
  }, [isVisible]);

  const ShowModal = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  return {
    Modal: ResultModal,
    showModal: () => ShowModal(),
  };
};

export default useModal;

