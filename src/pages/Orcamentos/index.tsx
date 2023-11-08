import React, { useCallback, useEffect, useState } from 'react';

import { faEdit, faFileLines } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iColumnType } from '../../@types/Table';
import { DataTable } from '../../components/DataTable';
import {
  GetListOrcamento,
  GetOrcamento,
} from '../../features/orcamento/Orcamento-Thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { ModalOrcamento } from '../Modals/Orcamento';
import { ModalPreVenda } from '../Modals/PreVenda';
import { Container } from './styles';

export const Orcamentos: React.FC = () => {
  const { ListOrcamento, isLoading, errorMessage } = useAppSelector(
    (state) => state.orcamento
  );
  const [OpenModalOrc, setOpenModalOrc] = useState<boolean>(false);
  const [NewPreVenda, setNewPreVenda] = useState<iOrcamento | null>(null);

  const dispatch = useAppDispatch();

  const handleListOrcamento = (filter?: iFilter<iOrcamento>) => {
    dispatch(GetListOrcamento(filter));
  };

  const onOpenModalPreVenda = async (value: iOrcamento) => {
    setNewPreVenda(value);
  };

  const onCloseModalPreVenda = async (value: iOrcamento) => {
    handleListOrcamento();
    setNewPreVenda(null);
  };

  const onOpenModalOrcamento = useCallback(
    (value: iOrcamento) => {
      dispatch(GetOrcamento(value.ORCAMENTO));
      setOpenModalOrc(true);
    },
    [setOpenModalOrc]
  );

  const onCloseModalOrcamento = useCallback(async (value: iOrcamento) => {
    handleListOrcamento();
    setOpenModalOrc(false);
  }, []);

  const headers: iColumnType<iOrcamento>[] = [
    {
      key: 'ORCAMENTO',
      title: 'ORCAMENTO',
      width: '10%',
    },
    {
      key: 'CLIENTE.NOME',
      title: 'NOME',
      width: '20rem',
    },
    {
      key: 'DATA',
      title: 'DATA',
      isHideMobile: true,
      width: '20rem',
      render: (_, item) => {
        return dayjs(item.DATA).format('DD/MM/YYYY');
      },
    },
    {
      key: 'VENDEDOR.NOME',
      title: 'VENDEDOR',
      isHideMobile: true,
      width: '20rem',
    },
    {
      key: 'TOTAL',
      title: 'TOTAL',
      width: '7rem',
      isHideMobile: true,
      render: (_, item) => {
        return item.TOTAL.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '5rem',
      action: [
        {
          onclick: (value: iOrcamento) => onOpenModalPreVenda(value),
          Icon: faFileLines,
          Rounded: true,
          Title: 'Nova Pré-Venda',
          Type: 'success',
        },
        {
          onclick: (value: iOrcamento) => onOpenModalOrcamento(value),
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
      ],
    },
  ];

  const onFetchPagination = (top: number, skip: number) => {
    handleListOrcamento({ top: top, skip: skip });
  };

  useEffect(() => {
    handleListOrcamento();
  }, []);

  return (
    <Container>
      {OpenModalOrc && <ModalOrcamento callback={onCloseModalOrcamento} />}
      {NewPreVenda && (
        <ModalPreVenda
          Orcamento={NewPreVenda}
          callback={onCloseModalPreVenda}
        />
      )}

      <DataTable
        IsLoading={isLoading}
        ErrorMessage={errorMessage}
        TableData={ListOrcamento.value}
        QuantityRegiters={ListOrcamento.Qtd_Registros}
        onFetchPagination={onFetchPagination}
        columns={headers}
      />
    </Container>
  );
};
