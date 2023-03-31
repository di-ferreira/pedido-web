import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalContainer,
  Backdrop,
  ModalHeader,
  ModalBody,
  CloseButton,
} from './styles';
import { iModal, iModalRender } from '../../@types';
import { Icon } from '../../components/Icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const RenderLayout: React.FC<iModalRender> = ({ Title, OnClose, children }) => {
  return (
    <Backdrop>
      <ModalContainer>
        <CloseButton onClick={() => OnClose()}>
          <Icon Icon={faTimes} />
        </CloseButton>
        <ModalHeader>{Title}</ModalHeader>
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

  return {
    Modal: isVisible ? Modal : null,
    showModal: () => setIsVisible(!isVisible),
  };
};

export default useModal;

