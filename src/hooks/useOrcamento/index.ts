import { create } from 'zustand';
import api from '../../services/index';
import { iFilter } from '../../@types/Filter';
import {
  iItemInserir,
  iItensOrcamento,
  iOrcamento,
  iOrcamentoInserir,
} from '../../@types/Orcamento';
import { iVendedor } from '../../@types/Vendedor';
import { VENDEDOR_STORE } from '../../Constants';

interface iDataOrcamento {
  Qtd_Registros: number;
  value: iOrcamento[];
}

interface iUseOrcamento {
  CurrentOrcamento: iOrcamento;
  SaveOrcamento: (orcamento: iOrcamento) => boolean;
  // AddItemOrcamento: (item: iItensOrcamento) => void;
  // EditItemOrcamento: (item: iItensOrcamento) => void;
  // RemoveItemOrcamento: (item: iItensOrcamento) => void;
  GetOrcamento: (IdOrcamento: number) => iOrcamento;
  GetOrcamentos: (filter?: iFilter<iOrcamento>) => Promise<iDataOrcamento>;
}

const ROUTE_GET_ALL_ORCAMENTO = '/Orcamento';

const ROUTE_SAVE_ORCAMENTO = '/ServiceVendas/NovoOrcamento';

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
          ? (ResultFilter = `${ResultFilter}${andStr}${
              itemFilter.key
            } like '% ${String(itemFilter.value).toUpperCase()} %'${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      else
        ResultFilter = `${ResultFilter}${andStr}${
          itemFilter.key
        } like '% ${String(itemFilter.value).toUpperCase()} %'${andStr}`;
    });
    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

  let ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  let ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  let ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages`;
  return ResultRoute;
};

const GetOrcamentos = async (
  filter?: iFilter<iOrcamento>
): Promise<iDataOrcamento> => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  const FILTER = filter
    ? CreateFilter(filter)
    : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}&$top=15&$inlinecount=allpages&$orderby=DATA desc&$expand=VENDEDOR,CLIENTE,ItensOrcamento`;

  const response = await api.get(`${ROUTE_GET_ALL_ORCAMENTO}${FILTER}`);

  let result: iDataOrcamento = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };

  return result;
};

const GetOrcamento = (IdOrcamento: number): iOrcamento => {
  let Result: iOrcamento = {} as iOrcamento;
  api
    .get(
      `${ROUTE_GET_ALL_ORCAMENTO}(${IdOrcamento})?$expand=VENDEDOR,CLIENTE,ItensOrcamento`
    )
    .then((response) => {
      Result = response.data;
    });

  return Result;
};

const SaveOrcamento = (orcamento: iOrcamento): boolean => {
  let ItensOrcamento: iItemInserir[] = [];

  orcamento.ItensOrcamento?.map((item) => {
    let ItemInsert: iItemInserir = {
      CodigoProduto: item.PRODUTO.PRODUTO,
      Qtd: item.QTD,
      SubTotal: item.SUBTOTAL,
      Tabela: item.TABELA ? item.TABELA : 'SISTEMA',
      Total: item.TOTAL,
      Valor: item.VALOR,
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

  let Result: boolean = false;
  console.log(OrcamentoInsert);

  api
    .post(ROUTE_SAVE_ORCAMENTO, OrcamentoInsert)
    .then((response) => {
      console.log(response);
      Result = true;
    })
    .catch((error) => {
      console.error(error);
    });
  return Result;
};

const useOrcamento = create<iUseOrcamento>((set) => ({
  CurrentOrcamento: {} as iOrcamento,
  SaveOrcamento: (orcamento: iOrcamento) => {
    return SaveOrcamento(orcamento);
  },
  // AddItemOrcamento: (item: iItensOrcamento) => void,
  // EditItemOrcamento: (item: iItensOrcamento) => void,
  // RemoveItemOrcamento: (item: iItensOrcamento) => void,
  GetOrcamento: (IdOrcamento: number) => {
    let result: iOrcamento = GetOrcamento(IdOrcamento);
    set((state) => ({
      CurrentOrcamento: result,
    }));
    return result;
  },
  GetOrcamentos: (filter) => GetOrcamentos(filter),
}));

export default useOrcamento;
