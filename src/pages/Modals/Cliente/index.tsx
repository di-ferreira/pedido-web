import { faSave } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { iCliente } from '../../../@types/Cliente';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import { FlexComponent } from '../../../components/FlexComponent/index';
import { InputCustom } from '../../../components/InputCustom';
import useModal from '../../../hooks/useModal';
import { MaskCnpjCpf } from '../../../utils';
import { FormEditCliente, FormFooter } from './styles';

interface iModalCliente {
  Cliente: iCliente;
}
export const ModalCliente: React.FC<iModalCliente> = ({ Cliente }) => {
  const [cliente, setCliente] = useState<iCliente>(Cliente);

  const { Modal, showModal, OnCloseModal } = useModal();

  useEffect(() => {
    showModal();
    setCliente(Cliente);
  }, [Cliente]);

  const ClearFields = () => {
    OnCloseModal();
    setCliente({} as iCliente);
  };

  return (
    <>
      {Modal && (
        <Modal
          Title={cliente.NOME}
          OnCloseButtonClick={ClearFields}
          width='70%'
          height='40vh'
          bodyHeight='100%'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
        >
          <FormEditCliente>
            <FlexComponent
              direction='column'
              overflow='hidden auto'
              gapRow='1rem'
            >
              <FlexComponent
                alignItems='flex-end'
                gapColumn='1rem'
                sm={{ direction: 'column', gapRow: '1rem' }}
              >
                <FlexComponent width='10%' sm={{ width: '100%' }}>
                  <InputCustom
                    onChange={() => {}}
                    label='ID'
                    name='CLIENTE'
                    value={Cliente.CLIENTE}
                  />
                </FlexComponent>
                <FlexComponent width='60%' sm={{ width: '100%' }}>
                  <InputCustom
                    label='NOME'
                    onChange={() => {}}
                    name='NOME'
                    value={Cliente.NOME}
                  />
                </FlexComponent>
                <FlexComponent width='45%' sm={{ width: '100%' }}>
                  <InputCustom
                    label='E-MAIL'
                    onChange={() => {}}
                    name='EMAIL'
                    value={Cliente.EMAIL}
                  />
                </FlexComponent>
                <FlexComponent width='45%' sm={{ width: '100%' }}>
                  <InputCustom
                    label='TELEFONE'
                    onChange={() => {}}
                    name='TELEFONE'
                    value={Cliente.TELEFONE}
                  />
                </FlexComponent>
              </FlexComponent>
              <FlexComponent width='45%' sm={{ width: '100%' }}>
                <InputCustom
                  label='CNPJ'
                  onChange={() => {}}
                  name='Cliente.CIC'
                  value={MaskCnpjCpf(Cliente.CIC)}
                />
              </FlexComponent>
              <FlexComponent sm={{ direction: 'column', gapRow: '1rem' }}>
                <FlexComponent width='20%' sm={{ width: '100%' }}>
                  <Checkbox
                    type='checkbox'
                    label='BLOQUEADO'
                    checked={Cliente.BLOQUEADO === 'S' ? true : false}
                  />
                </FlexComponent>
                <FlexComponent width='75%' sm={{ width: '100%' }}>
                  <InputCustom
                    label='MOTIVO BLOQUEIO'
                    onChange={() => {}}
                    name='Cliente.MOTIVO'
                    value={Cliente.MOTIVO}
                  />
                </FlexComponent>
              </FlexComponent>
            </FlexComponent>
            <FormFooter>
              <Button
                Text='FECHAR'
                Type='danger'
                Icon={faSave}
                Height='3.5rem'
                onclick={() => ClearFields()}
              />
            </FormFooter>
          </FormEditCliente>
        </Modal>
      )}
    </>
  );
};
