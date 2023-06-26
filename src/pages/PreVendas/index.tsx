import React, { useEffect, useState } from 'react';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { iFilter, iFilterQuery } from '../../@types/Filter';
import { iMovimento, iPreVenda } from '../../@types/PreVenda';
import { iColumnType, iOption } from '../../@types/Table';
import { Loading } from '../../components/Loading';
import Table from '../../components/Table';
import useSelect from '../../hooks/UseSelect';
import usePreVenda from '../../hooks/usePreVenda';
import { ModalPreVenda } from '../Modals/PreVenda';
import { Container } from './styles';

interface iSearchPV {
  filterBy: string;
  value: string;
  actives: boolean;
}

export const PreVendas: React.FC = () => {
  const { GetPreVenda, GetPreVendas } = usePreVenda();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'PreVenda' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [PreVendaList, setPreVendaList] = useState<iMovimento[]>([]);
  const [PreVenda, setPreVenda] = useState<iMovimento | null>(null);

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

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] =
    useState<boolean>(false);

  useEffect(() => {
    ListPreVenda();
  }, []);

  const ListPreVenda = async (filter?: iFilter<iPreVenda>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetPreVendas(filter);
      console.log('🚀 ~ file: index.tsx:75 ~ ListPreVenda ~ Data:', Data);
      setPreVendaList(Data.value);

      setTotalPages(Math.ceil(Data.Qtd_Registros / RegistersPerPage));
      setTotalRegister(Data.Qtd_Registros);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenModalPreVenda = async (value: iMovimento) => {
    const pv: iMovimento = (await GetPreVenda(value.MOVIMENTO)).data.value[0];
    setPreVenda(pv);
  };

  const onCloseModalPreVenda = async (value: iMovimento) => {
    const newListPreVenda: iMovimento[] = PreVendaList.map((pv: iMovimento) => {
      if (pv.MOVIMENTO === value.MOVIMENTO) {
        pv = value;
        return pv;
      } else return pv;
    });
    setPreVendaList(newListPreVenda);
    setPreVenda(null);
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
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '5rem',
      action: [
        {
          onclick: (value: iMovimento) => {
            onOpenModalPreVenda(value);
          },
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
      ],
    },
  ];

  const MountQueryFilter = (filter: iSearchPV): iFilterQuery<iMovimento>[] => {
    let listFilter: iFilterQuery<iMovimento>[] = [];

    if (filter.value !== '') {
      if (filter.filterBy === 'CLIENTE' || filter.filterBy === 'CIC')
        listFilter = [
          {
            key: SearchPreVenda.filterBy as keyof iMovimento,
            value: SearchPreVenda.value,
            typeSearch: 'eq',
          },
        ];
      else
        listFilter = [
          {
            key: SearchPreVenda.filterBy as keyof iMovimento,
            value: SearchPreVenda.value,
          },
        ];
    }
    return listFilter;
  };

  const ChangeRowsPerPage = (value: iOption) => {
    setRegistersPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    ListPreVenda({
      top: Number(value.value),
      skip: RegistersPerPage * CurrentPage - RegistersPerPage,
      orderBy: 'DataPedido',
      // filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    ListPreVenda({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'DataPedido',
      // filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    ListPreVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DataPedido',
      //   filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    ListPreVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DataPedido',
      //   filter: MountQueryFilter(SearchPreVenda),
    });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    ListPreVenda({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'DataPedido',
      //   filter: MountQueryFilter(SearchPreVenda),
    });
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
      </FilterContainer>*/}
      {PreVenda && (
        <ModalPreVenda PreVenda={PreVenda} callback={onCloseModalPreVenda} />
      )}

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

