import { faBan, faCheck, faEdit, faFileLines, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { JSX, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iCliente } from '../../@types/Cliente';
import { iFilter, iFilterQuery } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iColumnType, iOption } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import { DataTable } from '../../components/DataTable';
import { FlexComponent } from '../../components/FlexComponent';
import { Icon } from '../../components/Icon';
import { InputCustom } from '../../components/InputCustom';
import { SetCurrentCliente } from '../../features/cliente/Cliente.slice';
import { GetCliente } from '../../features/cliente/Cliente.thunk';
import { NewOrcamento } from '../../features/orcamento/Orcamento.thunk';
import useSelect from '../../hooks/UseSelect';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { useLogin } from '../../hooks/useLogin';
import useTabListStore from '../../hooks/useTabList/index';
import { useTheme } from '../../hooks/useTheme';
import { MaskCnpjCpf } from '../../utils';
import { Container, ContainerInput, FilterContainer, SwitchContainer } from './styles';

interface iSearchCliente {
  filterBy: string;
  value: string;
  actives: boolean;
}

export const Clientes: React.FC = () => {
  const { currentUser } = useLogin();
  const { ThemeName } = useTheme();
  const { openTab } = useTabListStore((state) => state);
  const navigate = useNavigate();

  const { errorMessage, isLoading, Current } = useAppSelector((state) => state.orcamento);
  const ClienteStore = useAppSelector((state) => state.cliente);
  const dispatch = useAppDispatch();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'CLIENTE' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  /* OUTROS */
  const [SearchCliente, setSearchCliente] = useState<iSearchCliente>({
    filterBy: OptionsSelect[0].value,
    value: '',
    actives: true,
  } as iSearchCliente);

  const { Select } = useSelect();

  const RenderIconBloqueado = (value: string): JSX.Element => {
    if (value === 'S') return <Icon Icon={faBan} Type='danger' key={value} />;
    return <Icon Icon={faCheck} Type='success' key={value} />;
  };

  const MountQueryFilter = useCallback(
    (filter: iSearchCliente): iFilterQuery<iCliente>[] => {
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
      console.log('filter', listFilter);

      return listFilter;
    },
    [SearchCliente.filterBy, SearchCliente.value],
  );

  const SearchForFilter = () => {
    handleListCliente({
      top: 15,
      skip: 0,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const handleListCliente = (
    filter: iFilter<iCliente> = {
      top: 15,
      skip: 0,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    },
  ) => {
    console.log('handleListCliente', filter);

    dispatch(GetCliente(filter));
  };

  const handleCliente = (value: iCliente) => {
    dispatch(SetCurrentCliente(value));
    openTab({
      Icon: faFileLines,
      Link: `clientes/cliente/${value.CLIENTE}`,
      Closable: true,
      TitleTab: `Cliente ${value.NOME}`,
      isActive: true,
    });
    navigate(`cliente/${value.CLIENTE}`);
  };

  const handleOrcamento = (value: iCliente) => {
    const NewAddOrcamento: iOrcamento = {
      ORCAMENTO: 0,
      TOTAL: 0.0,
      CLIENTE: value,
      VENDEDOR: currentUser.vendedor ? currentUser.vendedor : ({} as iVendedor),
      COM_FRETE: 'N',
      ItensOrcamento: [],
    };

    dispatch(NewOrcamento(NewAddOrcamento));

    if (errorMessage !== '' && !isLoading) {
      toast.error(`Opps, ${errorMessage} 🤯`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: ThemeName,
      });
    }
    openTab({
      Icon: faFileLines,
      Link: `clientes/orcamento/${Current.ORCAMENTO}`,
      Closable: true,
      TitleTab: `Orcamento ${Current.ORCAMENTO}`,
      isActive: true,
    });
    navigate(`orcamento/${Current.ORCAMENTO}`);
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
      render: (_, item) => item.BLOQUEADO && <>{RenderIconBloqueado(String(item.BLOQUEADO))}</>,
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
          onclick: handleOrcamento,
          Icon: faFileLines,
          Rounded: true,
          Title: 'Novo Orçamento',
          Type: 'success',
        },
        {
          onclick: handleCliente,
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
      ],
    },
  ];

  const onFetchPagination = (top: number, skip: number) => {
    console.log('fetch');

    handleListCliente({ top, skip, orderBy: 'CLIENTE', filter: MountQueryFilter(SearchCliente) });
  };

  useEffect(() => {
    handleListCliente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onChange={(e) => {
              setSearchCliente(
                (oldSearch) => (oldSearch = { ...oldSearch, value: e.target.value }),
              );
            }}
            value={SearchCliente.value.toUpperCase()}
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
            checked={SearchCliente.actives}
            style='secondary'
            onClick={() => {
              setSearchCliente({
                ...SearchCliente,
                actives: !SearchCliente.actives,
              });
            }}
          />
        </SwitchContainer>
      </FilterContainer>

      <FlexComponent height='100%'>
        <DataTable
          columns={headers}
          TableData={ClienteStore.ListCliente.value}
          IsLoading={ClienteStore.isLoading}
          ErrorMessage={ClienteStore.errorMessage}
          QuantityRegiters={ClienteStore.ListCliente.Qtd_Registros}
          onFetchPagination={onFetchPagination}
        />
      </FlexComponent>
    </Container>
  );
};
