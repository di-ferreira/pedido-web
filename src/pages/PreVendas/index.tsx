import React, { useCallback, useEffect } from 'react';

import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iColumnType } from '../../@types/Table';
import { DataTable } from '../../components/DataTable';
import { GetPreVendas } from '../../features/pre-venda/PreVenda.thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { Container } from './styles';

export const PreVendas: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ListPreVendas, errorMessage, isLoading } = useAppSelector((state) => state.preVenda);

  const handleListPV = useCallback(
    (filter?: iFilter<iMovimento>) => {
      dispatch(GetPreVendas(filter));
    },
    [dispatch],
  );

  const onFetchPreVendas = (top: number, skip: number) => {
    handleListPV({ top, skip });
  };
  useEffect(() => {
    handleListPV();
  }, [handleListPV]);

  const headers: iColumnType<iMovimento>[] = [
    {
      key: 'MOVIMENTO',
      title: 'PRÉ-VENDA',
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

  return (
    <Container>
      <DataTable
        columns={headers}
        TableData={ListPreVendas.value}
        ErrorMessage={errorMessage}
        QuantityRegiters={ListPreVendas.Qtd_Registros}
        IsLoading={isLoading}
        onFetchPagination={onFetchPreVendas}
      />
    </Container>
  );
};
