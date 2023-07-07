import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iColumnType, iOption } from '../../@types/Table';
import { Loading } from '../../components/Loading';
import Table from '../../components/Table';
import usePreVenda from '../../hooks/usePreVenda';
import { Container } from './styles';

interface iSearchPV {
  filterBy: string;
  value: string;
  actives: boolean;
}

export const PreVendas: React.FC = () => {
  const { GetPreVendas } = usePreVenda();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'PreVenda' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [PreVendaList, setPreVendaList] = useState<iMovimento[]>([]);

  /* PAGINAÇÃO */
  const [RegistersPerPage, setRegistersPerPage] = useState<number>(15);

  const [CurrentPage, setCurrentPage] = useState<number>(1);

  const [TotalPages, setTotalPages] = useState<number>(1);

  const [TotalRegister, setTotalRegister] = useState<number>(1);

  const SkipPage = (
    NextPage: boolean = true,
    RegPerPage: number = RegistersPerPage
  ): number => {
    let CurPage = NextPage ? CurrentPage + 1 : CurrentPage - 1;
    const Skip = RegPerPage * CurPage - RegPerPage;
    return Skip;
  };

  /* STATUS LISTA OrcamentoS */

  const [ErrorMessage, setErrorMessage] = useState<string>('');

  const [IsLoading, setIsLoading] = useState<boolean>(false);

  /* OUTROS */
  const [SearchPreVenda, setSearchPreVenda] = useState<iSearchPV>({
    filterBy: OptionsSelect[0].value,
    value: '',
    actives: false,
  } as iSearchPV);

  useEffect(() => {
    ListPreVenda();
  }, []);

  const ListPreVenda = async (filter?: iFilter<iMovimento>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetPreVendas(filter);
      setPreVendaList(Data.value);

      setTotalPages(Math.ceil(Data.Qtd_Registros / RegistersPerPage));
      setTotalRegister(Data.Qtd_Registros);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
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

  const ChangeRowsPerPage = (value: iOption) => {
    setRegistersPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    ListPreVenda({
      top: Number(value.value),
      skip: RegistersPerPage * CurrentPage - RegistersPerPage,
      orderBy: 'DATA',
      // filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    ListPreVenda({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'DATA',
      // filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    ListPreVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DATA',
      //   filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    ListPreVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DATA',
      //   filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    ListPreVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DATA',
      //   filter: MountQueryFilter(SearchPreVenda),
    });
  };

  return (
    <Container>
      {IsLoading && <Loading />}
      {PreVendaList && !IsLoading && (
        <Table
          messageNoData={ErrorMessage}
          columns={headers}
          data={PreVendaList}
          pagination={{
            CurrentPage,
            TotalPages,
            onFirstPage: GoToFirstPage,
            onLastPage: GoToLastPage,
            onNextPage: GoToNextPage,
            onPrevPage: GoToPrevPage,
            RowsPerPage: RegistersPerPage,
            onChange: ChangeRowsPerPage,
          }}
        />
      )}
      {PreVendaList.length === 0 && !IsLoading && ErrorMessage === '' && (
        <p>Não há registros</p>
      )}
    </Container>
  );
};

