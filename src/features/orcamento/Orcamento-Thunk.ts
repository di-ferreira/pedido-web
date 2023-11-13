import { createAsyncThunk } from '@reduxjs/toolkit';
import { iApiResult } from '../../@types';
import { iFilter } from '../../@types/Filter';
import { iItemInserir, iItemRemove, iOrcamento, iOrcamentoInserir } from '../../@types/Orcamento';
import { iDataResultTable } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services';
import { VENDEDOR_STORE } from '../../utils/Constants';
const ROUTE_GET_ALL_ORCAMENTO = '/Orcamento';
const ROUTE_SAVE_ORCAMENTO = '/ServiceVendas/NovoOrcamento';
const ROUTE_REMOVE_ITEM_ORCAMENTO = '/ServiceVendas/ExcluirItemOrcamento';
const ROUTE_SAVE_ITEM_ORCAMENTO = '/ServiceVendas/NovoItemOrcamento';

const CreateFilter = (filter: iFilter<iOrcamento>): string => {
  const VendedorLocal: iVendedor = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));

  let ResultFilter: string = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;
    const andStr = ' AND ';
    filter.filter.map((itemFilter) => {
      if (itemFilter.typeSearch)
        itemFilter.typeSearch === 'like'
          ? (ResultFilter = `${ResultFilter}${andStr} contains(${itemFilter.key}, '${String(
              itemFilter.value,
            ).toUpperCase()}')${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      else
        ResultFilter = `${ResultFilter}${andStr} contains(${itemFilter.key}, '${String(
          itemFilter.value,
        ).toUpperCase()}')${andStr}`;
    });
    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

  const ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  const ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  const ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages&$orderby=ORCAMENTO desc&$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`;
  return ResultRoute;
};

export const NewOrcamento = createAsyncThunk(
  'Orcamento/New',
  async (orcamento: iOrcamento, thunkAPI) => {
    try {
      const ItensOrcamento: iItemInserir[] = [];

      orcamento.ItensOrcamento?.map((item) => {
        const ItemInsert: iItemInserir = {
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
      const res: iApiResult<iOrcamento> = (
        await api.post<iApiResult<iOrcamento>>(ROUTE_SAVE_ORCAMENTO, OrcamentoInsert)
      ).data;

      const { Data, StatusCode, StatusMessage } = res;

      if (StatusCode !== 200) {
        return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
      } else {
        const result = (
          await api.get<iOrcamento>(
            `${ROUTE_GET_ALL_ORCAMENTO}(${Data.ORCAMENTO})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`,
          )
        ).data;
        return result;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const GetOrcamento = createAsyncThunk(
  'Orcamento/Show',
  async (idOrcamento: number, thunkAPI) => {
    try {
      const res = await api.get<iOrcamento>(
        `${ROUTE_GET_ALL_ORCAMENTO}(${idOrcamento})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`,
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const GetListOrcamento = createAsyncThunk(
  'Orcamento/List',
  async (filter: iFilter<iOrcamento> | undefined, thunkApi) => {
    try {
      const VendedorLocal: iVendedor = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));
      const FILTER = filter
        ? CreateFilter(filter)
        : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}&$top=15&$inlinecount=allpages&$orderby=ORCAMENTO desc&$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`;

      const res = await api.get(`${ROUTE_GET_ALL_ORCAMENTO}${FILTER}`);

      const result: iDataResultTable<iOrcamento> = {
        Qtd_Registros: res.data['@xdata.count'],
        value: res.data.value,
      };

      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const NewItemOrcamento = createAsyncThunk(
  'Orcamento/NewItem',
  async (itemOrcamento: iItemInserir, thunkAPI) => {
    try {
      const res: iApiResult<iOrcamento> = (
        await api.post<iApiResult<iOrcamento>>(ROUTE_SAVE_ITEM_ORCAMENTO, itemOrcamento)
      ).data;

      const { Data, StatusCode, StatusMessage } = res;

      if (StatusCode !== 200) {
        return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
      } else {
        const result = (
          await api.get<iOrcamento>(
            `${ROUTE_GET_ALL_ORCAMENTO}(${Data.ORCAMENTO})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`,
          )
        ).data;
        return result;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const RemoveItemOrcamento = createAsyncThunk(
  'Orcamento/RemoveItem',
  async (itemOrcamento: iItemRemove, thunkAPI) => {
    try {
      const res: iApiResult<iOrcamento> = (
        await api.post<iApiResult<iOrcamento>>(ROUTE_REMOVE_ITEM_ORCAMENTO, itemOrcamento)
      ).data;

      const { Data, StatusCode, StatusMessage } = res;

      if (StatusCode !== 200) {
        return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
      } else {
        const result = (
          await api.get<iOrcamento>(
            `${ROUTE_GET_ALL_ORCAMENTO}(${Data.ORCAMENTO})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`,
          )
        ).data;
        return result;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const UpdateItemOrcamento = createAsyncThunk(
  'Orcamento/UpdateItem',
  async (itemOrcamento: iItemInserir, thunkAPI) => {
    try {
      // inicia remoção do item
      const removeRestult: iApiResult<iOrcamento> = (
        await api.post<iApiResult<iOrcamento>>(ROUTE_REMOVE_ITEM_ORCAMENTO, {
          pIdOrcamento: itemOrcamento.pIdOrcamento,
          pProduto: itemOrcamento.pItemOrcamento.CodigoProduto,
        })
      ).data;

      if (removeRestult.StatusCode !== 200) {
        return thunkAPI.rejectWithValue(`error: ${removeRestult.StatusMessage}`);
      } else {
        // inicia inserção do item
        const res: iApiResult<iOrcamento> = (
          await api.post<iApiResult<iOrcamento>>(ROUTE_SAVE_ITEM_ORCAMENTO, itemOrcamento)
        ).data;

        const { Data, StatusCode, StatusMessage } = res;

        if (StatusCode !== 200) {
          return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
        } else {
          const result = (
            await api.get<iOrcamento>(
              `${ROUTE_GET_ALL_ORCAMENTO}(${Data.ORCAMENTO})?$expand=VENDEDOR,CLIENTE,ItensOrcamento/PRODUTO/FORNECEDOR,ItensOrcamento/PRODUTO/FABRICANTE,ItensOrcamento,ItensOrcamento/PRODUTO`,
            )
          ).data;
          return result;
        }
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  },
);
