import { create } from 'zustand';
import { iDataResult } from '../../@types';
import { iFilter } from '../../@types/Filter';
import {
  iItemInserir,
  iItemRemove,
  iOrcamento,
  iOrcamentoInserir,
} from '../../@types/Orcamento';
import { iDataResultTable } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services/index';
import { VENDEDOR_STORE } from '../../utils/Constants';

interface iResultOrcamento {
  data: iOrcamento;
}

interface iUseOrcamento {
  CurrentOrcamento: iOrcamento;
  ListOrcamentos: iOrcamento[];
  SetOrcamento: (IdOrcamento: number) => Promise<void>;
  ResetOrcamento: () => void;
  NewOrcamento: (orcamento: iOrcamento) => void;
  NewItemOrcamento: (item: iItemInserir) => Promise<void>;
  DeleteItemOrcamento: (item: iItemInserir) => void;
  UpdateItemOrcamento: (item: iItemInserir) => void;

  SaveOrcamento: (orcamento: iOrcamento) => Promise<iDataResult<iOrcamento>>;
  AddItemOrcamento: (item: iItemInserir) => Promise<iDataResult<iOrcamento>>;
  RemoveItemOrcamento: (item: iItemRemove) => Promise<iDataResult<iOrcamento>>;
  GetOrcamento: (IdOrcamento: number) => Promise<iResultOrcamento>;
  GetOrcamentos: (
    filter?: iFilter<iOrcamento>
  ) => Promise<iDataResultTable<iOrcamento>>;
}

const ROUTE_GET_ALL_ORCAMENTO = '/Orcamento';
const ROUTE_SAVE_ORCAMENTO = '/ServiceVendas/NovoOrcamento';
const ROUTE_REMOVE_ITEM_ORCAMENTO = '/ServiceVendas/ExcluirItemOrcamento';
const ROUTE_SAVE_ITEM_ORCAMENTO = '/ServiceVendas/NovoItemOrcamento';

const ResetOrcamento = (): iOrcamento => {
  return {
    ORCAMENTO: 0,
    TOTAL: 0,
    VENDEDOR: {
      VENDEDOR: 0,
      NOME: '',
      ENDERECO: '',
      BAIRRO: '',
      CIDADE: '',
      UF: '',
      CEP: '',
      TELEFONE: '',
      SENHA: '',
      ATUALIZAR: '',
      COMISSAO: 0,
      CTPS: '',
      FUNCAO: '',
      ADMISSAO: '',
      DEMISSAO: '',
      SALARIO: 0,
      VALE_TRANSPORTE: 0,
      NASCIMENTO: '',
      CPF: '',
      IDENTIDADE: '',
      ESTADO_CIVIL: '',
      PIS: '',
      NACIONALIDADE: '',
      NATURALIDADE: '',
      CONJUGE: '',
      EMAIL: '',
      CELULAR: '',
      ATIVO: '',
      VENDA: '',
      TIPO_VENDEDOR: '',
      CARTAO_NUMERO: '',
      CARTAO_MATRICULA: '',
      META_MARKUP: 0,
      META_INDEXADOR: 0,
      SETOR: '',
      TABELAS_PERMITIDAS: '',
    },
    CLIENTE: {
      CLIENTE: 0,
      NOME: '',
      ENDERECO: '',
      BAIRRO: '',
      CIDADE: '',
      UF: '',
      CEP: '',
      CIC: '',
      DT_CADASTRO: '',
      DT_NASCIMENTO: '',
      DT_ULT_COMPRA: '',
      INSC_IDENT: '',
      TELEFONE: '',
      FAX: '',
      EMAIL: '',
      BLOQUEADO: '',
      MOTIVO: '',
      P1_DE: 0,
      P1_ATE: 0,
      P1_VENCIMENTO: 0,
      P2_DE: 0,
      P2_ATE: 0,
      P2_VENCIMENTO: 0,
      USARLIMITE: '',
      LIMITE: 0,
      DESCONTO: '',
      OBS: '',
      VALOR_DESCONTO: 0,
      ECF: '',
      BOLETO: '',
      CARTEIRA: '',
      ROTA: 0,
      TAXA_ENTREGA: 0,
      CLASSIFICACAO: 0,
      FRETE_POR_CONTA: '',
      FRETE_TIPO: '',
      ACRESCIMO_NOTA: 0,
      VENDEDOR: 0,
      OS: '',
      TIPO_FAT: '',
      MESSAGEM_FINANCEIRO: '',
      ENDERECO_NUM: '',
      ENDERECO_CPL: '',
      ENDERECO_COD_MUN: 0,
      ENDERECO_COD_UF: 0,
      Tabela: '',
      ATUALIZAR: '',
      CONDICAO_PAGAMENTO: '',
      APELIDO: '',
      EMAIL_FINANCEIRO: '',
      DESCONTO_AVISTA: 0,
      TRANSPORTADORA: 0,
      ID_CONDICAO: 0,
      FROTA: '',
      IDENTIDADE: '',
      MENSAGEM_FINANCEIRO: '',
      GRUPO: 0,
      END_ENTREGA: '',
      INSCRICAO_M: '',
      LIMITE_CHEQUE: 0,
      META: 0,
      SOMENTE_NFE: '',
      VENDEDOR_INTERNO: 0,
      DATA_ATUALIZACAO: '',
      GEO_LAT: '',
      GEO_LNG: '',
      DDA: '',
      V100: '',
      TIPO_CLIENTE: '',
      AtualizarRegiao: '',
      SENHA: '',
      EMAIL_VENDA_DIRETA: '',
      SENHA_VENDA_DIRETA: '',
      PERC_VENDA_DIRETA: 0,
      ConsumidorFinal: '',
      DESCONTO_BOLETO: '',
      REGIAO: {
        ID: 0,
        DESCRICAO: '',
        CARENCIA: 0,
        COMISSAO: 0,
        Locais_List: [],
      },
      OFICINA: '',
      Telefones: [],
      FollowUpList: [],
      AgendamentosList: [],
      PendenciasList: [],
    },
    ItensOrcamento: [],
  };
};

let CurOrc: iOrcamento = ResetOrcamento();

const CreateFilter = (filter: iFilter<iOrcamento>): string => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  let ResultFilter: string = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;
    let andStr = ' AND ';
    filter.filter.map((itemFilter) => {
      if (itemFilter.typeSearch)
        itemFilter.typeSearch === 'like'
          ? (ResultFilter = `${ResultFilter}${andStr} contains(${
              itemFilter.key
            }, '${String(itemFilter.value).toUpperCase()}')${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      else
        ResultFilter = `${ResultFilter}${andStr} contains(${
          itemFilter.key
        }, '${String(itemFilter.value).toUpperCase()}')${andStr}`;
    });
    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

  let ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  let ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  let ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages&$orderby=ORCAMENTO desc&$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`;
  return ResultRoute;
};

const GetOrcamentos = async (
  filter?: iFilter<iOrcamento>
): Promise<iDataResultTable<iOrcamento>> => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  const FILTER = filter
    ? CreateFilter(filter)
    : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}&$top=15&$inlinecount=allpages&$orderby=ORCAMENTO desc&$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`;

  const response = await api.get(`${ROUTE_GET_ALL_ORCAMENTO}${FILTER}`);

  let result: iDataResultTable<iOrcamento> = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };

  return result;
};

const GetOrcamento = (IdOrcamento: number): Promise<iResultOrcamento> => {
  return api.get(
    `${ROUTE_GET_ALL_ORCAMENTO}(${IdOrcamento})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`
  );
};

const SaveOrcamento = (
  orcamento: iOrcamento
): Promise<iDataResult<iOrcamento>> => {
  let ItensOrcamento: iItemInserir[] = [];

  orcamento.ItensOrcamento?.map((item) => {
    let ItemInsert: iItemInserir = {
      pIdOrcamento: 0,
      pItemOrcamento: {
        CodigoProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
        Qtd: item.QTD,
        SubTotal: item.SUBTOTAL,
        Tabela: item.TABELA ? item.TABELA : 'SISTEMA',
        Total: item.TOTAL,
        Valor: item.VALOR,
        Frete: 0,
        Desconto: 0,
      },
    };
    ItensOrcamento.push(ItemInsert);
  });

  const OrcamentoInsert: iOrcamentoInserir = {
    CodigoCliente: orcamento.CLIENTE.CLIENTE,
    CodigoVendedor1: orcamento.VENDEDOR.VENDEDOR,
    Total: orcamento.TOTAL,
    SubTotal: orcamento.TOTAL,
    Itens: ItensOrcamento,
  };

  return api.post(ROUTE_SAVE_ORCAMENTO, OrcamentoInsert);
};

const SaveItemOrcamento = (
  item: iItemInserir
): Promise<iDataResult<iOrcamento>> => {
  const result: Promise<iDataResult<iOrcamento>> = api.post(
    ROUTE_SAVE_ITEM_ORCAMENTO,
    item
  );

  return result;
};

const RemoveItemOrcamento = (
  item: iItemRemove
): Promise<iDataResult<iOrcamento>> => {
  const result: Promise<iDataResult<iOrcamento>> = api.post(
    ROUTE_REMOVE_ITEM_ORCAMENTO,
    item
  );

  return result;
};

const SetOrcamento = async (IdOrcamento: number): Promise<void> => {
  const { data } = await GetOrcamento(IdOrcamento);
  CurOrc = data;
  console.log('SetOrcamento', CurOrc);
};

const NewOrcamento = (orcamento: iOrcamento): iOrcamento => {
  let newOrcamento: iOrcamento = {} as iOrcamento;
  SaveOrcamento(orcamento)
    .then((result) => {
      newOrcamento = result.data.Data;
      return newOrcamento;
    })
    .catch((err) => {
      console.log('Error useOrcamento', err);
    });
  return newOrcamento;
};

const NewItemOrcamento = async (itemOrcamento: iItemInserir): Promise<void> => {
  const { data } = await SaveItemOrcamento(itemOrcamento);
  CurOrc = data.Data;
};

const DeleteItemOrcamento = (itemOrcamento: iItemInserir): iOrcamento => {
  SaveItemOrcamento;
  let ResultOrcamento: iOrcamento = {} as iOrcamento;
  RemoveItemOrcamento({
    pIdOrcamento: itemOrcamento.pIdOrcamento,
    pProduto: itemOrcamento.pItemOrcamento.CodigoProduto,
  })
    .then((result) => {
      ResultOrcamento = result.data.Data;
      return ResultOrcamento;
    })
    .catch((err) => {
      console.log('Error useOrcamento', err);
    });
  return ResultOrcamento;
};

const GetCurrentOrcamento = (): iOrcamento => {
  console.log(CurOrc);

  return CurOrc;
};

const useOrcamento = create<iUseOrcamento>((set) => ({
  CurrentOrcamento: GetCurrentOrcamento(),
  ListOrcamentos: [],
  ResetOrcamento: () =>
    set((state) => ({ CurrentOrcamento: ResetOrcamento() })),
  SetOrcamento: (IdOrcamento: number) => {
    return SetOrcamento(IdOrcamento).then(() => {
      set((state) => ({ CurrentOrcamento: CurOrc }));
    });
  },
  NewOrcamento: (orcamento: iOrcamento) =>
    set((state) => ({ CurrentOrcamento: NewOrcamento(orcamento) })),
  NewItemOrcamento: (itemOrcamento: iItemInserir) => {
    return NewItemOrcamento(itemOrcamento).then(() => {
      set((state) => ({ CurrentOrcamento: CurOrc }));
    });
  },
  DeleteItemOrcamento: (item: iItemInserir) =>
    set((state) => ({ CurrentOrcamento: DeleteItemOrcamento(item) })),
  UpdateItemOrcamento: (item: iItemInserir) => {},

  SaveOrcamento: (orcamento: iOrcamento) => SaveOrcamento(orcamento),
  GetOrcamento: (IdOrcamento: number) => GetOrcamento(IdOrcamento),
  GetOrcamentos: (filter) => GetOrcamentos(filter),
  AddItemOrcamento: (item: iItemInserir) => SaveItemOrcamento(item),
  RemoveItemOrcamento: (item: iItemRemove) => RemoveItemOrcamento(item),
}));

export default useOrcamento;
