import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { iModal, iModalRender } from '../../@types/Modal';
import { Icon } from '../../components/Icon';
import {
  Backdrop,
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalHeader,
} from './styles';

const RenderLayout: React.FC<iModalRender> = ({
  Title,
  OnClose,
  OnCloseButtonClick,
  children,
  height,
  width,
}) => {
  const BtnClose = () => {
    OnClose();
    OnCloseButtonClick && OnCloseButtonClick();
  };

  const OnEscKeyClose = (fn: () => void) => {
    const handleEscKey = useCallback(
      (e: { key: string }) => {
        if (e.key === 'Escape') {
          fn();
        }
      },
      [fn]
    );

    useEffect(() => {
      document.addEventListener('keydown', handleEscKey, false);
      return () => document.removeEventListener('keydown', handleEscKey, false);
    }, [handleEscKey]);
  };

  OnEscKeyClose(OnClose);

  return (
    <Backdrop>
      <ModalContainer width={width} height={height}>
        <CloseButton onClick={BtnClose}>
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
  const Modal: React.FC<iModal> = ({
    Title,
    children,
    OnCloseButtonClick,
    height,
    width,
  }) =>
    ReactDOM.createPortal(
      RenderLayout({
        Title,
        children,
        OnClose,
        OnCloseButtonClick,
        height,
        width,
      }),
      document.body
    );

  const ResultModal = useMemo(() => {
    return isVisible ? Modal : null;
  }, [isVisible]);

  const ShowModal = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  return {
    Modal: ResultModal,
    showModal: () => ShowModal(),
    OnCloseModal: OnClose,
  };
};

export default useModal;

