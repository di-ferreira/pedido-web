import React, { useCallback, useEffect } from 'react';

import { faEdit, faFileInvoiceDollar, faFileLines } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { iFilter } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iColumnType } from '../../@types/Table';
import { DataTable } from '../../components/DataTable';
import { GetListOrcamento, GetOrcamento } from '../../features/orcamento/Orcamento.thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import useTabListStore from '../../hooks/useTabList/index';
import { Container } from './styles';

export const Orcamentos: React.FC = () => {
  const navigate = useNavigate();
  const { openTab } = useTabListStore((state) => state);
  const { ListOrcamento, isLoading, errorMessage } = useAppSelector((state) => state.orcamento);

  const dispatch = useAppDispatch();

  const handleListOrcamento = useCallback(
    (filter?: iFilter<iOrcamento>) => {
      dispatch(GetListOrcamento(filter));
    },
    [dispatch],
  );

  const handlePreVenda = (value: iOrcamento) => {
    dispatch(GetOrcamento(value.ORCAMENTO));
    openTab({
      Icon: faFileInvoiceDollar,
      Link: `orcamentos/pre-venda/${value.ORCAMENTO}`,
      Closable: true,
      TitleTab: `Pré-Venda ${value.ORCAMENTO}`,
      isActive: true,
    });
    navigate(`pre-venda/${value.ORCAMENTO}`);
  };

  const handleOrcamento = (value: iOrcamento) => {
    dispatch(GetOrcamento(value.ORCAMENTO));
    openTab({
      Icon: faFileLines,
      Link: `orcamentos/orcamento/${value.ORCAMENTO}`,
      Closable: true,
      TitleTab: `Orcamento ${value.ORCAMENTO}`,
      isActive: true,
    });
    navigate(`orcamento/${value.ORCAMENTO}`);
  };

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
      width: '20rem',
      render: (_, item) => {
        return dayjs(item.DATA).format('DD/MM/YYYY');
      },
    },
    {
      key: 'VENDEDOR.NOME',
      title: 'VENDEDOR',
      width: '20rem',
      isHideMobile: true,
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
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '5rem',
      action: [
        {
          onclick: (value: iOrcamento) => handlePreVenda(value),
          Icon: faFileLines,
          Rounded: true,
          Title: 'Nova Pré-Venda',
          Type: 'success',
        },
        {
          onclick: (value: iOrcamento) => handleOrcamento(value),
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
      ],
    },
  ];

  const onFetchPagination = (top: number, skip: number) => {
    handleListOrcamento({ top, skip });
  };

  useEffect(() => {
    handleListOrcamento();
  }, [handleListOrcamento]);

  return (
    <Container>
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
