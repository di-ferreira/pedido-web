/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import { iEstoqueLoja } from '../../../@types/Produto';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { FlexComponent } from '../../../components/FlexComponent';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useModal from '../../../hooks/useModal';

interface iModalEstoqueLoja {
  estoque?: iEstoqueLoja[];
  callback: () => void;
}

const ModalEstoqueLojas: React.FC<iModalEstoqueLoja> = ({ callback }) => {
  const { Modal, showModal, OnCloseModal } = useModal();
  const { Current, isLoading, errorMessage } = useAppSelector((state) => state.produto);

  const tableEstoqueHeaders: iColumnType<iEstoqueLoja>[] = [
    {
      key: 'PRODUTO',
      title: 'PRODUTO',
      width: '30%',
    },
    {
      key: 'LOJA',
      title: 'LOJA',
      width: '30%',
    },
    {
      key: 'ATUALIZACAO',
      title: 'ATUALIZAÇÃO',
      width: '30%',
      render: (_, item) => {
        return dayjs(item.ATUALIZACAO).format('DD/MM/YYYY HH:mm:ss');
      },
    },
    {
      key: 'CURVA_EST',
      title: 'CURVA ESTOQUE',
      width: '25%',
    },
    {
      key: 'CURVA_FAB',
      title: 'CURVA FABRICANTE',
      width: '25%',
    },
    {
      key: 'ESTOQUE',
      title: 'ESTOQUE',
      width: '25%',
    },
    {
      key: 'LOCAL1',
      title: 'LOCAL',
      width: '25%',
    },
    {
      key: 'LOCAL2',
      title: 'LOCAL 2',
      width: '25%',
    },
    {
      key: 'LOCAL3',
      title: 'LOCAL 3',
      width: '25%',
    },
  ];

  useEffect(() => {
    showModal();
  }, []);

  const OnOKClick = () => {
    OnCloseModal();
    callback();
  };

  return (
    <>
      {Modal && (
        <Modal
          Title={'ESTOQUE OFFLINE DAS LOJAS'}
          width='75vw'
          height='55vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
          OnCloseButtonClick={callback}
        >
          <FlexComponent
            direction='column'
            overflow='hidden auto'
            height='47vh'
            justifyContent='space-between'
          >
            <FlexComponent
              minHeight='5rem'
              maxHeight='35rem'
              height='100%'
              sm={{ width: '100%', height: '20vh', margin: '1rem 0' }}
            >
              <DataTable
                columns={tableEstoqueHeaders}
                IsLoading={isLoading}
                ErrorMessage={errorMessage}
                TableData={Current.estoque_lojas}
              />
            </FlexComponent>
            <FlexComponent>
              <Button Text='OK' Type='primary' Height='3.5rem' Width='10rem' onclick={OnOKClick} />
            </FlexComponent>
          </FlexComponent>
        </Modal>
      )}
    </>
  );
};

export default ModalEstoqueLojas;
