import React, { useEffect, useState } from 'react';
import {
  FormEditCliente,
  FormEditClienteColumn,
  FormEditClienteInputContainer,
  FormEditClienteRow,
  FormEditClienteSwitchContainer,
  FormFooter,
} from './styles';
import useModal from '../../../hooks/useModal';
import { InputCustom } from '../../../components/InputCustom';
import { CustomSwitch } from '../../../components/CustomSwitch';
import Button from '../../../components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MaskCnpjCpf } from '../../../utils';
import { iCliente } from '../../../@types/Cliente';

interface iModalCliente {
  Cliente: iCliente;
}
export const ModalCliente: React.FC<iModalCliente> = ({ Cliente }) => {
  const [cliente, setCliente] = useState<iCliente>(Cliente);

  const { Modal, showModal } = useModal();

  useEffect(() => {
    showModal();
    setCliente(Cliente);
  }, [Cliente]);

  const ClearFields = () => {
    setCliente({} as iCliente);
  };

  return (
    <>
      {Modal && (
        <Modal Title={cliente.NOME}>
          <FormEditCliente>
            <FormEditClienteColumn>
              <FormEditClienteRow>
                <FormEditClienteInputContainer width='10%'>
                  <InputCustom
                    onChange={() => {}}
                    label='ID'
                    name='CLIENTE'
                    value={Cliente.CLIENTE}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer width='60%'>
                  <InputCustom
                    label='NOME'
                    onChange={() => {}}
                    name='NOME'
                    value={Cliente.NOME}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer width='45%'>
                  <InputCustom
                    label='E-MAIL'
                    onChange={() => {}}
                    name='EMAIL'
                    value={Cliente.EMAIL}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer width='45%'>
                  <InputCustom
                    label='TELEFONE'
                    onChange={() => {}}
                    name='TELEFONE'
                    value={Cliente.TELEFONE}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteInputContainer width='45%'>
                  <InputCustom
                    label='CNPJ'
                    onChange={() => {}}
                    name='Cliente.CIC'
                    value={MaskCnpjCpf(Cliente.CIC)}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteSwitchContainer width='20%'>
                  <CustomSwitch
                    label='BLOQUEADO'
                    checked={Cliente.BLOQUEADO === 'S' ? true : false}
                    onClick={() => {}}
                  />
                </FormEditClienteSwitchContainer>
                <FormEditClienteInputContainer width='75%'>
                  <InputCustom
                    label='MOTIVO BLOQUEIO'
                    onChange={() => {}}
                    name='Cliente.MOTIVO'
                    value={Cliente.MOTIVO}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
            </FormEditClienteColumn>
            <FormFooter>
              <Button
                Text='ATUALIZAR'
                Type='success'
                Icon={faSave}
                Height='3.5rem'
              />
            </FormFooter>
          </FormEditCliente>
        </Modal>
      )}
    </>
  );
};

