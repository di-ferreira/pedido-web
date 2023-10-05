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

const useOrcamento = create<iUseOrcamento>((set) => ({
  CurrentOrcamento: {} as iOrcamento,
  SaveOrcamento: (orcamento: iOrcamento) => SaveOrcamento(orcamento),
  GetOrcamento: (IdOrcamento: number) => GetOrcamento(IdOrcamento),
  GetOrcamentos: (filter) => GetOrcamentos(filter),
  AddItemOrcamento: (item: iItemInserir) => SaveItemOrcamento(item),
  RemoveItemOrcamento: (item: iItemRemove) => RemoveItemOrcamento(item),
}));

export default useOrcamento;
