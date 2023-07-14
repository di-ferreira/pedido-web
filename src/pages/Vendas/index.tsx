import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iColumnType, iOption } from '../../@types/Table';
import { Loading } from '../../components/Loading';
import Table from '../../components/Table';
import useVenda from '../../hooks/useVenda';
import { Container } from './styles';

interface iSearchPV {
  filterBy: string;
  value: string;
  actives: boolean;
}

export const Vendas: React.FC = () => {
  const { GetVenda, GetVendas } = useVenda();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'Venda' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [VendaList, setVendaList] = useState<iMovimento[]>([]);

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
  const [SearchVenda, setSearchVenda] = useState<iSearchPV>({
    filterBy: OptionsSelect[0].value,
    value: '',
    actives: false,
  } as iSearchPV);

  useEffect(() => {
    ListVenda();
  }, []);

  const ListVenda = async (filter?: iFilter<iMovimento>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetVendas(filter);
      setVendaList(Data.value);

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

  const ChangeRowsPerPage = (value: iOption) => {
    setRegistersPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    ListVenda({
      top: Number(value.value),
      skip: RegistersPerPage * CurrentPage - RegistersPerPage,
      orderBy: 'DATA',
      // filter: MountQueryFilter(SearchVenda),
    });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    ListVenda({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'DATA',
      // filter: MountQueryFilter(SearchVenda),
    });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    ListVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DATA',
      //   filter: MountQueryFilter(SearchVenda),
    });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    ListVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DATA',
      //   filter: MountQueryFilter(SearchVenda),
    });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    ListVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DATA',
      //   filter: MountQueryFilter(SearchVenda),
    });
  };

  return (
    <Container>
      {IsLoading && <Loading />}
      {VendaList && !IsLoading && (
        <Table
          messageNoData={ErrorMessage}
          columns={headers}
          data={VendaList}
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
      {VendaList.length === 0 && !IsLoading && ErrorMessage === '' && (
        <p>Não há registros</p>
      )}
    </Container>
  );
};

