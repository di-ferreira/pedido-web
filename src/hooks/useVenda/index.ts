import { create } from 'zustand';
import { iDataResult, iSelectSQL } from '../../@types';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services/index';
import { VENDEDOR_STORE } from '../../utils/Constants';

interface iDataOrcamento {
  Qtd_Registros: number;
  value: iMovimento[];
}

interface iResultPreVenda {
  data: {
    value: iMovimento[];
  };
}

type iResultSQL = iDataResult<any[]>;

interface iUsePreVenda {
  GetVenda: (IdVenda: number) => Promise<iResultPreVenda>;
  GetVendas: (filter?: iFilter<iMovimento>) => Promise<iDataOrcamento>;
}

const ROUTE_GET_ALL_PRE_VENDA = '/Movimento';
const ROUTE_SELECT_SQL = 'ServiceSistema/SelectSQL';

const CreateFilter = (filter: iFilter<iMovimento>): string => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  let ResultFilter: string = `$filter=TIPOMOV eq 'PRE-VENDA'and CANCELADO eq 'N' and VENDEDOR eq ${VendedorLocal.VENDEDOR}`;

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

  let ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`;

  return ResultRoute;
};

const GetVendas = async (
  filter?: iFilter<iMovimento>
): Promise<iDataOrcamento> => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  const FILTER = filter
    ? CreateFilter(filter)
    : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR} and TIPOMOV eq 'VENDA' and CANCELADO eq 'N'&$top=15&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`;

  const response = await api.get(`${ROUTE_GET_ALL_PRE_VENDA}${FILTER}`);

  let result: iDataOrcamento = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };

  return result;
};

const GetVenda = (IdPV: number): Promise<iResultPreVenda> => {
  return api.get(
    `${ROUTE_GET_ALL_PRE_VENDA}?$filter=MOVIMENTO eq ${IdPV} and TIPOMOV eq 'VENDA'and CANCELADO eq 'N'&$top=15&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`
  );
};

const GetDataSelecSQL = async (sql: iSelectSQL): Promise<iResultSQL> => {
  return api.post(`${ROUTE_SELECT_SQL}`, sql);
};

const useVenda = create<iUsePreVenda>((set) => ({
  GetVenda: (IdPreVenda: number) => GetVenda(IdPreVenda),
  GetVendas: (filter) => GetVendas(filter),
}));

export default useVenda;
