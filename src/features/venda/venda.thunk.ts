import { createAsyncThunk } from '@reduxjs/toolkit';
import { iFilter } from '../../@types/Filter';
import { iMovimento } from '../../@types/PreVenda';
import { iDataResultTable } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services';
import { VENDEDOR_STORE } from '../../utils/Constants';

const ROUTE_GET_ALL_PRE_VENDA = '/Movimento';

const CreateFilter = (filter: iFilter<iMovimento>): string => {
  const VendedorLocal: iVendedor = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));

  let ResultFilter: string = `$filter=TIPOMOV eq 'PRE-VENDA'and CANCELADO eq 'N' and VENDEDOR eq ${VendedorLocal.VENDEDOR}`;

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;
    const andStr = ' AND ';
    filter.filter.map((itemFilter) => {
      if (itemFilter.typeSearch)
        itemFilter.typeSearch === 'like'
          ? (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} like '% ${String(
              itemFilter.value,
            ).toUpperCase()} %'${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      else
        ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} like '% ${String(
          itemFilter.value,
        ).toUpperCase()} %'${andStr}`;

      return ResultFilter;
    });

    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

  const ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  const ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' && (ResultTop = `&${ResultTop}`);

  const ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`;

  return ResultRoute;
};

export const GetVendas = createAsyncThunk(
  'Venda/List',
  async (filter: iFilter<iMovimento> | undefined, thunkAPI) => {
    try {
      const VendedorLocal: iVendedor = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));

      const FILTER = filter
        ? CreateFilter(filter)
        : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR} and TIPOMOV eq 'VENDA' and CANCELADO eq 'N'&$top=15&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`;

      const response = await api.get(`${ROUTE_GET_ALL_PRE_VENDA}${FILTER}`);

      const result: iDataResultTable<iMovimento> = {
        Qtd_Registros: response.data['@xdata.count'],
        value: response.data.value,
      };

      return result;
    } catch (error: unknown) {
      if (typeof error === 'string') return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error) return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  },
);
