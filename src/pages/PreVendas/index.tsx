import React from 'react';

import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iColumnType } from '../../@types/Table';
import Table from '../../components/Table';
import usePreVenda from '../../hooks/usePreVenda';
import { Container } from './styles';

export const PreVendas: React.FC = () => {
  const { GetPreVendas } = usePreVenda();

  const ListPreVenda = async (filter?: iFilter<iMovimento>) => {
    return await GetPreVendas(filter);
  };

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
      <Table onDataFetch={ListPreVenda} columns={headers} pagination />
    </Container>
  );
};
