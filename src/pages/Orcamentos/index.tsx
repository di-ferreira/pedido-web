import React, { useCallback, useRef, useState } from 'react';

import { faEdit, faFileLines } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iColumnType, iTableRef } from '../../@types/Table';
import Table from '../../components/Table';
import useOrcamento from '../../hooks/useOrcamento';
import { ModalOrcamento } from '../Modals/Orcamento';
import { ModalPreVenda } from '../Modals/PreVenda';
import { Container } from './styles';

export const Orcamentos: React.FC = () => {
  const { GetOrcamentos, GetOrcamento } = useOrcamento();

  const [Orcamento, setOrcamento] = useState<iOrcamento | null>(null);
  const [NewPreVenda, setNewPreVenda] = useState<iOrcamento | null>(null);
  const TableRef = useRef<iTableRef<iOrcamento>>(null!);

  const onOpenModalPreVenda = async (value: iOrcamento) => {
    setNewPreVenda(value);
  };

  const onCloseModalPreVenda = async (value: iOrcamento) => {
    ListOrcamentos();
    TableRef.current.onRefresh();
    setNewPreVenda(null);
  };

  const ListOrcamentos = async (filter?: iFilter<iOrcamento>) => {
    return await GetOrcamentos(filter);
  };

  const onOpenModalOrcamento = useCallback(
    async (value: iOrcamento) => {
      const orc: iOrcamento = (await GetOrcamento(value.ORCAMENTO)).data;
      setOrcamento(orc);
    },
    [setOrcamento]
  );

  const onCloseModalOrcamento = useCallback(
    async (value: iOrcamento) => {
      ListOrcamentos();
      TableRef.current.onRefresh();
      setOrcamento(null);
    },
    [setOrcamento]
  );

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

  return (
    <Container>
      {Orcamento && (
        <ModalOrcamento
          Orcamento={Orcamento}
          callback={onCloseModalOrcamento}
        />
      )}{' '}
      {NewPreVenda && (
        <ModalPreVenda
          Orcamento={NewPreVenda}
          callback={onCloseModalPreVenda}
        />
      )}
      <Table
        onDataFetch={ListOrcamentos}
        columns={headers}
        ref={TableRef}
        pagination
      />
    </Container>
  );
};
