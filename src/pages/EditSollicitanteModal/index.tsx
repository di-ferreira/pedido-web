import React from 'react';

import {
  Container,
  FormEditCliente,
  FormEditClienteInputContainer,
  FormEditClienteRow,
  FormEditClienteSwitchContainer,
} from './styles';
import { InputCustom } from '../../components/InputCustom';
import useModal from '../../hooks/useModal';

export const EditSollicitanteModal: React.FC = () => {
  const { Modal, showModal } = useModal();
  return (
    <>
      <Modal Title={'Cliente - ' + solicitante.NOME}>
        <FormEditCliente>
          <FormEditClienteRow>
            <FormEditClienteInputContainer>
              <InputCustom
                label='ID'
                onChange={() => {}}
                name='id'
                value={solicitante.ID}
              />
            </FormEditClienteInputContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='NOME'
                onChange={() => {}}
                name='nome'
                value={solicitante.NOME}
              />
            </FormEditClienteInputContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='E-MAIL'
                onChange={() => {}}
                name='email'
                value={solicitante.EMAIL}
              />
            </FormEditClienteInputContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='TELEFONES'
                onChange={() => {}}
                name='telefone'
                value={solicitante.TELEFONES}
              />
            </FormEditClienteInputContainer>
          </FormEditClienteRow>
          <FormEditClienteRow>
            <FormEditClienteInputContainer>
              <InputCustom
                label='EMPRESA'
                onChange={() => {}}
                name='empresa'
                value={solicitante.EMPRESA.NOME}
              />
            </FormEditClienteInputContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='CNPJ'
                onChange={() => {}}
                name='cnpj'
                value={solicitante.EMPRESA.CNPJ}
              />
            </FormEditClienteInputContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='RAZÃO SOCIAL'
                onChange={() => {}}
                name='razao'
                value={solicitante.EMPRESA.RAZAO_SOCIAL}
              />
            </FormEditClienteInputContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='TELEFONES EMPRESA'
                onChange={() => {}}
                name='telefone_empresa'
                value={solicitante.EMPRESA.TELEFONES}
              />
            </FormEditClienteInputContainer>
          </FormEditClienteRow>
          <FormEditClienteRow>
            <FormEditClienteSwitchContainer>
              <CustomSwitch
                label='BLOQUEADO'
                checked={checkedSwitchSolicitante}
                onClick={() => handdleCheckSolicitanteBloqueado()}
              />
            </FormEditClienteSwitchContainer>
            <FormEditClienteInputContainer>
              <InputCustom
                label='MOTIVO BLOQUEIO'
                onChange={() => {}}
                name='motivo_bloqueado'
                value={solicitante.EMPRESA.MOTIVO_BLOQUEADO}
              />
            </FormEditClienteInputContainer>
          </FormEditClienteRow>
        </FormEditCliente>
      </Modal>
    </>
  );
};

