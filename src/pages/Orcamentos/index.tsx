import React, { useEffect, useState } from 'react';

import {
  Container,
  ContainerInput,
  FilterContainer,
  SwitchContainer,
} from './styles';
import useOrcamento from '../../hooks/useOrcamento';
import { iOrcamento } from '../../@types/Orcamento';
import { iFilter } from '../../@types/Filter';
import { iColumnType, iOption } from '../../@types/Table';
import useSelect from '../../hooks/UseSelect';
import { InputCustom } from '../../components/InputCustom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CustomSwitch } from '../../components/CustomSwitch';
import { Loading } from '../../components/Loading';
import Table from '../../components/Table';
import Button from '../../components/Button';
import dayjs from 'dayjs';

export const Orcamentos: React.FC = () => {
  const { GetOrcamentos } = useOrcamento();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'Orcamento' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [OrcamentoList, setOrcamentoList] = useState<iOrcamento[]>([]);
  const [Orcamento, setOrcamento] = useState<iOrcamento | null>(null);

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

  const headers: iColumnType<iOrcamento>[] = [
    {
      key: 'ORCAMENTO',
      title: 'ORCAMENTO',
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
    // {
    //   key: 'acoes',
    //   title: 'AÇÕES',
    //   width: '20rem',
    //   action: [
    //     {
    //       onclick: () => {},
    //       Icon: faFileLines,
    //       Rounded: true,
    //       Title: 'Novo Orçamento',
    //       Type: 'success',
    //     },
    //     {
    //       onclick: onOpenModalOrcamento,
    //       Icon: faEdit,
    //       Rounded: true,
    //       Title: 'Editar',
    //       Type: 'warn',
    //     },
    //   ],
    // },
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
      {/* <FilterContainer>
         <Select
          options={OptionsSelect}
          onChange={(SingleValue) => {
            SingleValue &&
            setSearchOrcamento({
              ...SearchOrcamento,
              filterBy: String(SingleValue.value),
            })
          }}
        /> 
        <ContainerInput>
          <InputCustom
            height='4rem'
            widht='31rem'
            onChange={(e) => {
              // setSearchOrcamento({
              //   ...SearchOrcamento,
              //   value: e.target.value,
              // })
            }}
            placeholder='Digite sua busca'
          />
        </ContainerInput>

        <Button
          Icon={faSearch}
          // onclick={() => SearchForFilter()}
          Text='Buscar'
          Type='secondary'
          Title='Buscar'
          Height={'40px'}
        />
        <SwitchContainer>
          <CustomSwitch
            label='Ativos'
            checked={checkedSwitchFilter}
            style='secondary'
            onClick={() => {
              // setCheckedSwitchFilter(!checkedSwitchFilter);
              // setSearchOrcamento({
              //   ...SearchOrcamento,
              //   actives: !checkedSwitchFilter,
              // });
            }}
          />
        </SwitchContainer>
      </FilterContainer>
       {Orcamento && <ModalOrcamento Orcamento={Orcamento} />} */}

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

