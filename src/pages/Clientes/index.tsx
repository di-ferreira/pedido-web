import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import {
  Container,
  ContainerInput,
  FilterContainer,
  SwitchContainer,
} from './styles';
import {
  faBan,
  faCheck,
  faEdit,
  faFileLines,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../components/Loading';
import { Icon } from '../../components/Icon';
import useSelect from '../../hooks/UseSelect';
import Button from '../../components/Button';
import { InputCustom } from '../../components/InputCustom';
import { CustomSwitch } from '../../components/CustomSwitch';
import useClientes from '../../hooks/useClientes';
import { ModalCliente } from '../Modals/Cliente';
import { MaskCnpjCpf } from '../../utils';
import { iCliente } from '../../@types/Cliente';
import { iFilterQuery, iFilter } from '../../@types/Filter';
import { iOption, iColumnType, iTablePagination } from '../../@types/Table';
import { iOrcamento, iOrcamentoInserir } from '../../@types/Orcamento';
import { ModalOrcamento } from '../Modals/Orcamento';
import { useLogin } from '../../hooks/useLogin';
import { iVendedor } from '../../@types/Vendedor';
import useOrcamento from '../../hooks/useOrcamento';
import { toast } from 'react-toastify';
import { useTheme } from '../../hooks/useTheme';

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
    actives: false,
  } as iSearchCliente);

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] =
    useState<boolean>(false);

  useEffect(() => {
    ListClientes({
      top: RegistersPerPage,
      orderBy: 'CLIENTE',
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

      if (filter.actives)
        listFilter = [
          ...listFilter,
          {
            key: 'BLOQUEADO',
            value: 'N',
            typeSearch: 'eq',
          },
        ];
    }
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
      // ItensOrcamento: [
      //   {
      //     ORCAMENTO: 0,
      //     QTD: 10,
      //     SUBTOTAL: 100.0,
      //     TOTAL: 1000.0,
      //     VALOR: 100.0,
      //     PRODUTO: {
      //       PRODUTO: '35259170',
      //       CODIGOBARRA: 'A7',
      //       LOCAL: null,
      //       NOME: 'MOTOR ARRANQUE RANGER 2,5/2,8 DIESEL',
      //       OUTROLADO: null,
      //       REFERENCIA2: '35259170',
      //       QTDATUAL: 0,
      //       QTDMINIMA: 0,
      //       CUSTO: 578,
      //       CUSTOMEDIO: 578,
      //       PRECO: 833.5,
      //       PRECOWEB: null,
      //       DT_COMPRA: '1900-01-01',
      //       DT_VENDA: '2010-09-01',
      //       COMISSAO: 0,
      //       UNIDADE_TRIB_CONVERSAO: null,
      //       TRIBUTO: 'FF',
      //       DESCONTO: 0,
      //       SERVICO: 'N',
      //       APLICACOES: 'MOTOR ARRANQUE RANGER 2,5/2,8 DIESEL',
      //       ATIVO: 'S',
      //       INSTRUCOES: null,
      //       MARGEM_SEGURANCA: 0,
      //       MARGEM_MAXIMA: null,
      //       QTD_VENDA: 1,
      //       CURVA: 'H',
      //       USAR_MARGEM_CURVA: 'N',
      //       MARGEM_CURVA: 0,
      //       CURVA_ESTOQUE: 'H',
      //       CURVA_FREQUENCIA: null,
      //       ETIQUETA: 'S',
      //       COMPRA: 'S',
      //       CST: '060',
      //       ICMS: 0,
      //       IPI: null,
      //       ST: null,
      //       QTD_MAXIMA: 0,
      //       QTD_SEGURANCA: 0,
      //       QTD_GARANTIA: 0,
      //       LOCAL2: null,
      //       LOCAL3: null,
      //       Atualizar: 'S',
      //       PESO: null,
      //       FAB_BRUTO: null,
      //       FAB_DESC: null,
      //       FAB_IPI: null,
      //       FAB_LIQUIDO1: null,
      //       FAB_ST: null,
      //       FAB_FRETE: null,
      //       FAB_LIQUIDO2: null,
      //       QTD_EMBALAGEM: null,
      //       DEPARTAMENTO: 0,
      //       DT_CURVA_EST: '2023-02-10',
      //       DT_CURVA_FAB: null,
      //       CURVA_ANTERIOR: null,
      //       USUARIO: 'PRECO',
      //       DATA_HORA: '2012-10-02T08:38:35.484',
      //       SIMP: null,
      //       CFOP_DE: '5.405',
      //       CFOP_FE: '6.404',
      //       MULTIPLO_COMPRA: 1,
      //       TRANCAR: 'S',
      //       WEB: 'N',
      //       CFOP_DEV_DE: '1.411',
      //       CFOP_DEV_FE: '2.411',
      //       COMISSAO_TELEMARKETING: null,
      //       VOLUME: 1,
      //       IMPORTADO: null,
      //       LARGURA: null,
      //       ALTURA: null,
      //       COMPRIMENTO: null,
      //       ID_MONTADORA: null,
      //       PAGINA_CATALOGO: null,
      //       ORDEM_CATALOGO: null,
      //       DT_CADASTRO: null,
      //       VENDA: 'S',
      //       OBS1: null,
      //       OBS2: null,
      //       FAB_BRUTO_OFERTA: null,
      //       FAB_DESC_OFERTA: null,
      //       FAB_IPI_OFERTA: null,
      //       FAB_LIQUIDO1_OFERTA: null,
      //       FAB_ST_OFERTA: null,
      //       FAB_FRETE_OFERTA: null,
      //       FAB_LIQUIDO2_OFERTA: null,
      //       VENDA_COM_OFERTA: 'N',
      //       MARGEM_OFERTA: null,
      //       PRECO_COM_OFERTA: null,
      //       FAB_OFERTA_VALIDADE: null,
      //       CNA: null,
      //       CODIGO_BARRA_CAIXA: null,
      //       QTD_CAIXA: null,
      //       QTD_MAX_ARMAZENAGEM: null,
      //       DATA_ATUALIZACAO: '2023-02-10',
      //       COMISSAO_HOME_OFFICE: null,
      //       COMISSAO_PROMOTOR: null,
      //       COMISSAO_ASSISTENTE: null,
      //       COMISSAO_MECANICO: null,
      //       IA: null,
      //       FCI: null,
      //       LINHA: null,
      //       NAO_DEVOLVER: null,
      //       STATUS: null,
      //       CTA_SPED_CONTRIB_E: null,
      //       CTA_SPED_CONTRIB_S: null,
      //       RESPONSABILIDADE_ICMS: null,
      //       RETENCAO_PIS_COFINS: null,
      //       NOVO_PRECO: null,
      //       NOVO_CUSTO: null,
      //       DATA_NOVO_PRECO: null,
      //       DATA_OFERTA_NOVO_PRECO: null,
      //       ID_NOVO_PRECO: null,
      //       UNIDADE: undefined,
      //       NCM: undefined,
      //       FABRICANTE: undefined,
      //       FORNECEDOR: undefined,
      //       GRUPO: undefined,
      //       ListaSimilares: [],
      //       iListaVendaCasada: [],
      //       iListaOfertaProduto: [],
      //       ListaChaves: [],
      //     },
      //   },
      // ],
    };

    await SaveOrcamento(NewOrcamento)
      .then((result) => {
        const { ORCAMENTO } = result.data;
        NewOrcamento = { ...NewOrcamento, ORCAMENTO };
        setOrcamento(NewOrcamento);
        console.log('new orcamento', NewOrcamento);
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
          <CustomSwitch
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

