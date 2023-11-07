import { createAsyncThunk } from '@reduxjs/toolkit';
import { iFilter } from '../../@types/Filter';
import { iOrcamento } from '../../@types/Orcamento';
import { iDataResultTable } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services';
import { VENDEDOR_STORE } from '../../utils/Constants';
const ROUTE_GET_ALL_ORCAMENTO = '/Orcamento';
// const ROUTE_SAVE_ORCAMENTO = '/ServiceVendas/NovoOrcamento';
// const ROUTE_REMOVE_ITEM_ORCAMENTO = '/ServiceVendas/ExcluirItemOrcamento';
// const ROUTE_SAVE_ITEM_ORCAMENTO = '/ServiceVendas/NovoItemOrcamento';

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

export const GetOrcamento = createAsyncThunk(
  'Orcamento/Show',
  async (idOrcamento: number, thunkAPI) => {
    try {
      const res = await api.get<iOrcamento>(
        `${ROUTE_GET_ALL_ORCAMENTO}(${idOrcamento})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

export const GetListOrcamento = createAsyncThunk(
  'Orcamento/List',
  async (filter: iFilter<iOrcamento> | undefined, thunkApi) => {
    try {
      let VendedorLocal: iVendedor = JSON.parse(
        String(localStorage.getItem(VENDEDOR_STORE))
      );
      const FILTER = filter
        ? CreateFilter(filter)
        : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}&$top=15&$inlinecount=allpages&$orderby=ORCAMENTO desc&$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`;

      const res = await api.get(`${ROUTE_GET_ALL_ORCAMENTO}${FILTER}`);

      let result: iDataResultTable<iOrcamento> = {
        Qtd_Registros: res.data['@xdata.count'],
        value: res.data.value,
      };
      console.log('Thunk Orcamento', result);

      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(`error: ${error.message}`);
    }
  }
);
