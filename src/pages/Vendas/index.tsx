/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';

import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iColumnType } from '../../@types/Table';
import { DataTable } from '../../components/DataTable';
import { GetVendas } from '../../features/venda/venda.thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { Container } from './styles';

export const Vendas: React.FC = () => {
  const dispatch = useAppDispatch();
  const vendaStore = useAppSelector((state) => state.venda);

  const handleVendaList = useCallback((filter?: iFilter<iMovimento>) => {
    dispatch(GetVendas(filter));
  }, []);

  const onFetchPagination = (top: number, skip: number) => {
    handleVendaList({ top, skip });
  };

  const headers: iColumnType<iMovimento>[] = [
    {
      key: 'MOVIMENTO',
      title: 'VENDA',
      width: '5rem',
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
      render: (_, item) => {
        return item.TOTAL.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  useEffect(() => {
    handleVendaList();
  }, [handleVendaList]);

  return (
    <Container>
      <DataTable
        columns={headers}
        TableData={vendaStore.List.value}
        QuantityRegiters={vendaStore.List.Qtd_Registros}
        ErrorMessage={vendaStore.errorMessage}
        IsLoading={vendaStore.isLoading}
        onFetchPagination={onFetchPagination}
      />
    </Container>
  );
};
