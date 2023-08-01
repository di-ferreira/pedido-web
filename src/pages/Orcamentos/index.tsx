import React, { useCallback, useEffect, useState } from 'react';

import { faEdit, faFileLines } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { iFilter } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iColumnType, iOption } from '../../@types/Table';
import { Loading } from '../../components/Loading';
import Table from '../../components/Table';
import useSelect from '../../hooks/UseSelect';
import useOrcamento from '../../hooks/useOrcamento';
import { ModalOrcamento } from '../Modals/Orcamento';
import { ModalPreVenda } from '../Modals/PreVenda';
import { Container } from './styles';

export const Orcamentos: React.FC = () => {
  const { GetOrcamentos, GetOrcamento } = useOrcamento();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'Orcamento' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [OrcamentoList, setOrcamentoList] = useState<iOrcamento[]>([]);
  const [Orcamento, setOrcamento] = useState<iOrcamento | null>(null);
  const [NewPreVenda, setNewPreVenda] = useState<iOrcamento | null>(null);

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
  // const [SearchOrcamento, setSearchOrcamento] = useState<iSearchOrcamento>({
  //   filterBy: OptionsSelect[0].value,
  //   value: '',
  //   actives: false,
  // } as iSearchOrcamento);

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] =
    useState<boolean>(false);

  useEffect(() => {
    ListOrcamentos();
  }, []);

  const onOpenModalPreVenda = async (value: iOrcamento) => {
    setNewPreVenda(value);
  };

  const onCloseModalPreVenda = async (value: iOrcamento) => {
    const newOrcamentoList: iOrcamento[] = OrcamentoList.filter(
      (orc) => value.ORCAMENTO !== orc.ORCAMENTO
    );
    setOrcamentoList(newOrcamentoList);
    setNewPreVenda(null);
  };

  const ListOrcamentos = async (filter?: iFilter<iOrcamento>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetOrcamentos(filter);
      setOrcamentoList(Data.value);

      setTotalPages(Math.ceil(Data.Qtd_Registros / RegistersPerPage));
      setTotalRegister(Data.Qtd_Registros);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenModalOrcamento = useCallback(
    async (value: iOrcamento) => {
      const orc: iOrcamento = (await GetOrcamento(value.ORCAMENTO)).data;
      setOrcamento(orc);
    },
    [setOrcamento]
  );

  const onCloseModalOrcamento = async (value: iOrcamento) => {
    const newListOrcamento: iOrcamento[] = OrcamentoList.map(
      (orc: iOrcamento) => {
        if (orc.ORCAMENTO === value.ORCAMENTO) {
          orc = value;
          return orc;
        } else return orc;
      }
    );
    setOrcamentoList(newListOrcamento);
    setOrcamento(null);
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

  //  const MountQueryFilter = (
  //    filter: iSearchCliente
  //  ): iFilterQuery<iCliente>[] => {
  //    let listFilter: iFilterQuery<iCliente>[] = [];

  //    if (filter.value !== '') {
  //      if (filter.filterBy === 'CLIENTE' || filter.filterBy === 'CIC')
  //        listFilter = [
  //          {
  //            key: SearchCliente.filterBy as keyof iCliente,
  //            value: SearchCliente.value,
  //            typeSearch: 'eq',
  //          },
  //        ];
  //      else
  //        listFilter = [
  //          {
  //            key: SearchCliente.filterBy as keyof iCliente,
  //            value: SearchCliente.value,
  //          },
  //        ];

  //      if (filter.actives)
  //        listFilter = [
  //          ...listFilter,
  //          {
  //            key: 'BLOQUEADO',
  //            value: 'N',
  //            typeSearch: 'eq',
  //          },
  //        ];
  //    }
  //    return listFilter;
  //  };

  const ChangeRowsPerPage = (value: iOption) => {
    setRegistersPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    // ListClientes({
    //   top: Number(value.value),
    //   skip: RegistersPerPage * CurrentPage - RegistersPerPage,
    //   orderBy: 'CLIENTE',
    //   filter: MountQueryFilter(SearchCliente),
    // });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    // ListClientes({
    //   top: RegistersPerPage,
    //   skip: 0,
    //   orderBy: 'CLIENTE',
    //   filter: MountQueryFilter(SearchCliente),
    // });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    // ListClientes({
    //   top: RegistersPerPage,
    //   skip: SkipPage(),
    //   orderBy: 'CLIENTE',
    //   filter: MountQueryFilter(SearchCliente),
    // });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    // ListClientes({
    //   top: RegistersPerPage,
    //   skip: SkipPage(false),
    //   orderBy: 'CLIENTE',
    //   filter: MountQueryFilter(SearchCliente),
    // });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    // ListClientes({
    //   top: RegistersPerPage,
    //   skip: TotalRegister - RegistersPerPage,
    //   orderBy: 'CLIENTE',
    //   filter: MountQueryFilter(SearchCliente),
    // });
  };

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
      {IsLoading && <Loading />}
      {OrcamentoList && !IsLoading && (
        <Table
          messageNoData={ErrorMessage}
          columns={headers}
          data={OrcamentoList}
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
      {OrcamentoList.length === 0 && !IsLoading && ErrorMessage === '' && (
        <p>Não há registros</p>
      )}
    </Container>
  );
};

