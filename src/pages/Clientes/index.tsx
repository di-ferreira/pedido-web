import {
  faBan,
  faCheck,
  faEdit,
  faFileLines,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { iCliente } from '../../@types/Cliente';
import { iFilter, iFilterQuery } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iColumnType, iOption, iTablePagination } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import { Icon } from '../../components/Icon';
import { InputCustom } from '../../components/InputCustom';
import { Loading } from '../../components/Loading';
import Table from '../../components/Table';
import useSelect from '../../hooks/UseSelect';
import useClientes from '../../hooks/useClientes';
import { useLogin } from '../../hooks/useLogin';
import useOrcamento from '../../hooks/useOrcamento';
import { useTheme } from '../../hooks/useTheme';
import { MaskCnpjCpf } from '../../utils';
import { ModalCliente } from '../Modals/Cliente';
import { ModalOrcamento } from '../Modals/Orcamento';
import {
  Container,
  ContainerInput,
  FilterContainer,
  SwitchContainer,
} from './styles';

interface iSearchCliente {
  filterBy: string;
  value: string;
  actives: boolean;
}

export const Clientes: React.FC = () => {
  const { GetClientes } = useClientes();
  const { currentUser } = useLogin();
  const { SaveOrcamento } = useOrcamento();
  const { ThemeName } = useTheme();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'CLIENTE' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [ClienteList, setClienteList] = useState<iCliente[]>([]);
  const [Cliente, setCliente] = useState<iCliente | null>(null);

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

  /* STATUS LISTA CLIENTES */

  const [ErrorMessage, setErrorMessage] = useState<string>('');

  const [IsLoading, setIsLoading] = useState<boolean>(false);

  /* OUTROS */
  const [SearchCliente, setSearchCliente] = useState<iSearchCliente>({
    filterBy: OptionsSelect[0].value,
    value: '',
    actives: true,
  } as iSearchCliente);

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] = useState<boolean>(true);

  useEffect(() => {
    ListClientes({
      top: RegistersPerPage,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  }, []);

  const RenderIconBloqueado = (value: string): JSX.Element => {
    if (value === 'S') return <Icon Icon={faBan} Type='danger' key={value} />;
    return <Icon Icon={faCheck} Type='success' key={value} />;
  };

  const MountQueryFilter = (
    filter: iSearchCliente
  ): iFilterQuery<iCliente>[] => {
    let listFilter: iFilterQuery<iCliente>[] = [];

    if (filter.value !== '') {
      if (filter.filterBy === 'CLIENTE' || filter.filterBy === 'CIC')
        listFilter = [
          {
            key: SearchCliente.filterBy as keyof iCliente,
            value: SearchCliente.value,
            typeSearch: 'eq',
          },
        ];
      else
        listFilter = [
          {
            key: SearchCliente.filterBy as keyof iCliente,
            value: SearchCliente.value,
          },
        ];
    }
    if (filter.actives)
      listFilter = [
        ...listFilter,
        {
          key: 'BLOQUEADO',
          value: 'N',
          typeSearch: 'eq',
        },
      ];
    return listFilter;
  };

  const SearchForFilter = () => {
    ListClientes({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const ListClientes = async (filter?: iFilter<iCliente>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetClientes(filter);
      setClienteList(Data.value);
      setTotalPages(Math.ceil(Data.Qtd_Registros / RegistersPerPage));
      setTotalRegister(Data.Qtd_Registros);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const ChangeRowsPerPage = (value: iOption) => {
    setRegistersPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    ListClientes({
      top: Number(value.value),
      skip: RegistersPerPage * CurrentPage - RegistersPerPage,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    ListClientes({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    ListClientes({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    ListClientes({
      top: RegistersPerPage,
      skip: SkipPage(false),
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    ListClientes({
      top: RegistersPerPage,
      skip: TotalRegister - RegistersPerPage,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const onOpenModalCliente = (value: iCliente) => {
    setCliente(value);
  };

  const onOpenModalOrcamento = async (value: iCliente) => {
    let NewOrcamento: iOrcamento = {
      ORCAMENTO: 0,
      TOTAL: 0.0,
      CLIENTE: value,
      VENDEDOR: currentUser.vendedor ? currentUser.vendedor : ({} as iVendedor),
      COM_FRETE: 'N',
      ItensOrcamento: [],
    };

    await SaveOrcamento(NewOrcamento)
      .then((result) => {
        const { Data } = result.data;
        NewOrcamento = { ...NewOrcamento, ...Data };
        setOrcamento(NewOrcamento);
      })
      .catch((error) => {
        toast.error(`Opps, ${error.message} 🤯`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: ThemeName,
        });
      });
  };

  const paginationOptions: iTablePagination = {
    CurrentPage,
    TotalPages,
    onFirstPage: GoToFirstPage,
    onLastPage: GoToLastPage,
    onNextPage: GoToNextPage,
    onPrevPage: GoToPrevPage,
    RowsPerPage: RegistersPerPage,
    onChange: ChangeRowsPerPage,
  };

  const headers: iColumnType<iCliente>[] = [
    {
      key: 'CLIENTE',
      title: 'ID',
      width: '10rem',
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: '20rem',
    },
    {
      key: 'BLOQUEADO',
      title: 'BLOQUEADO',
      width: '11rem',
      isHideMobile: true,
      render: (_, item) =>
        item.BLOQUEADO && <>{RenderIconBloqueado(String(item.BLOQUEADO))}</>,
    },
    {
      key: 'CIC',
      title: 'CPF/CNPJ',
      width: '20rem',
      isHideMobile: true,
      render: (_, item) => <>{MaskCnpjCpf(item.CIC)}</>,
    },
    {
      key: 'ENDERECO',
      title: 'ENDEREÇO',
      isHideMobile: true,
      width: '20rem',
    },
    {
      key: 'BAIRRO',
      title: 'BAIRRO',
      isHideMobile: true,
      width: '20rem',
    },
    {
      key: 'CIDADE',
      title: 'CIDADE',
      isHideMobile: true,
      width: '20rem',
    },
    {
      key: 'UF',
      title: 'UF',
      isHideMobile: true,
      width: '7rem',
    },
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '20rem',
      action: [
        {
          onclick: onOpenModalOrcamento,
          Icon: faFileLines,
          Rounded: true,
          Title: 'Novo Orçamento',
          Type: 'success',
        },
        {
          onclick: onOpenModalCliente,
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
      <FilterContainer>
        <Select
          options={OptionsSelect}
          onChange={(SingleValue) =>
            SingleValue &&
            setSearchCliente({
              ...SearchCliente,
              filterBy: String(SingleValue.value),
            })
          }
        />
        <ContainerInput>
          <InputCustom
            height='4rem'
            widht='31rem'
            onChange={(e) =>
              setSearchCliente({
                ...SearchCliente,
                value: e.target.value,
              })
            }
            placeholder='Digite sua busca'
          />
        </ContainerInput>

        <Button
          Icon={faSearch}
          onclick={() => SearchForFilter()}
          Text='Buscar'
          Type='secondary'
          Title='Buscar'
          Height={'40px'}
        />
        <SwitchContainer>
          <Checkbox
            type='checkbox'
            label='Ativos'
            checked={checkedSwitchFilter}
            style='secondary'
            onClick={() => {
              setCheckedSwitchFilter(!checkedSwitchFilter);
              setSearchCliente({
                ...SearchCliente,
                actives: !checkedSwitchFilter,
              });
            }}
          />
        </SwitchContainer>
      </FilterContainer>
      {Cliente && <ModalCliente Cliente={Cliente} />}

      {Orcamento && <ModalOrcamento Orcamento={Orcamento} />}

      {IsLoading && <Loading />}
      {ClienteList && !IsLoading && (
        <Table
          messageNoData={ErrorMessage}
          columns={headers}
          data={ClienteList}
          pagination={paginationOptions}
        />
      )}
      {ClienteList.length === 0 && !IsLoading && ErrorMessage === '' && (
        <p>Não há registros</p>
      )}
    </Container>
  );
};

