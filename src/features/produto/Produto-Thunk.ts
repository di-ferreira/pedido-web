import { createAsyncThunk } from '@reduxjs/toolkit';
import { iApiResult } from '../../@types';
import { iFilter } from '../../@types/Filter';
import { iProduto, iProdutoWithTables, iTabelaVenda } from '../../@types/Produto';
import { iDataResultTable } from '../../@types/Table';
import api from '../../services';

interface iReqSuperBusca {
  Palavras: string;
  PularRegistros?: number;
  QuantidadeRegistros?: number;
}

const SQL_MWM =
  "select TRIM(T.TABELA) AS TABELA, CAST((E.fab_bruto - ((E.fab_bruto*T.PERCENTUAL)/100)) AS NUMERIC(10,2)) AS NOVO_PRECO, T.bloqueada AS BLOQUEADO from tabela_mwm T, EST E WHERE E.PRODUTO=:PRODUTO AND TRIM(T.TABELA) <> '%%'";
const SQL_NORMAL =
  'select T.TABELA, CAST((E.PRECO + ((E.PRECO*T.PERCENTUAL)/100)) AS NUMERIC(10,2)) AS PRECO, T.BLOQUEADO from TAB T, EST E ' +
  'WHERE E.PRODUTO=:PRODUTO AND (((SELECT COUNT(*) FROM fab_tab F WHERE F.fabricante=E.fabricante)=0) OR ( T.TABELA IN (SELECT' +
  ' F.TABELA FROM FAB_TAB F WHERE E.fabricante=F.fabricante AND F.tabela=T.tabela)))';
const SQL_2D =
  "SELECT 'TAB01' AS TABELA, fab_liquido1 AS NOVO_PRECO  FROM EST E  WHERE E.PRODUTO=:PRODUTO AND E.fab_liquido1>0 UNION  SELECT 'TAB02' AS TABELA, fab_liquido2 AS NOVO_PRECO FROM EST E  WHERE E.PRODUTO=:PRODUTO AND E.fab_st>0";
const ROUTE_SUPER_BUSCA = 'ServiceProdutos/SuperBusca';
const ROUTE_SELECT_SQL = 'ServiceSistema/SelectSQL';

const ROUTE_GET_ALL_PRODUTO = '/Produto';

const CreateFilter = (filter: iFilter<iProduto>): string => {
  let ResultFilter: string = '';

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = '$filter=';
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
    });
    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

  const ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  const ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  const ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages`;

  return ResultRoute;
};

export const SuperFindProducts = createAsyncThunk(
  'Produto/SuperFindProducts',
  async (filter: iFilter<iProduto> | undefined, thunkApi) => {
    try {
      const bodyReq: iReqSuperBusca = {
        Palavras: filter?.filter ? String(filter.filter[0].value) : '',
        PularRegistros: filter?.skip ? filter.skip : 0,
        QuantidadeRegistros: filter?.top ? filter.top : 15,
      };

      const response = await api.post(
        `${ROUTE_SUPER_BUSCA}?$expand=FABRICANTE,FORNECEDOR,GRUPO,ListaChaves`,
        bodyReq,
      );

      const result: iDataResultTable<iProduto> = {
        Qtd_Registros: response.data.RecordCount,
        value: response.data.Data,
      };

      if (result.Qtd_Registros < 1)
        return thunkApi.rejectWithValue('error: Não encontrou nenhum PRODUTO');
      else return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const TableFromProduct = createAsyncThunk(
  'Produto/TableFromProduct',
  async (product: iProduto, thunkApi) => {
    try {
      let tabelas: iTabelaVenda[] = [];

      let sql: string = SQL_NORMAL;

      if (product.FAB_BRUTO > 0 && product.FABRICANTE?.NOME === 'MWM') sql = SQL_MWM;
      if (product.FAB_BRUTO > 0 && product.FABRICANTE?.NOME !== 'MWM') sql = SQL_2D;

      const res: iApiResult<any[]> = (
        await api.post<iApiResult<any[]>>(`${ROUTE_SELECT_SQL}`, {
          pSQL: sql,
          pPar: [
            {
              ParamName: 'PRODUTO',
              ParamType: 'ftString',
              ParamValues: [product.PRODUTO],
            },
          ],
        })
      ).data;

      const { Data, StatusCode, StatusMessage } = res;

      if (StatusCode !== 200) {
        return thunkApi.rejectWithValue(`error: ${StatusMessage}`);
      } else {
        const newTables: iTabelaVenda[] = [];

        Data.map((tb) => {
          if ('NOVO_PRECO' in tb) {
            newTables.push({
              BLOQUEADO: tb.BLOQUEADO,
              PRECO: tb.NOVO_PRECO,
              TABELA: tb.TABELA,
            });
          } else {
            newTables.push(tb);
          }
        });
        tabelas = [...tabelas, ...newTables];
      }

      return tabelas;
    } catch (error: any) {
      return thunkApi.rejectWithValue(`error: ${error.message}`);
    }
  },
);

export const SetProduct = createAsyncThunk(
  'Produto/SetProduct',
  async (CodeProduct: string, thunkApi) => {
    try {
      const product: iProduto = (
        await api.get<iProduto>(
          `${ROUTE_GET_ALL_PRODUTO}(${CodeProduct})?$expand=FABRICANTE,FORNECEDOR,GRUPO,ListaChaves,ListaOfertaProduto,ListaSimilares,ListaVendaCasada,NCM,TIPO_ITEM,UNIDADE`,
        )
      ).data;

      let tabelas: iTabelaVenda[] = [];

      let sql: string = SQL_NORMAL;

      if (product.FAB_BRUTO > 0 && product.FABRICANTE?.NOME === 'MWM') sql = SQL_MWM;
      if (product.FAB_BRUTO > 0 && product.FABRICANTE?.NOME !== 'MWM') sql = SQL_2D;

      const tablesResult: iApiResult<any[]> = (
        await api.post<iApiResult<any[]>>(`${ROUTE_SELECT_SQL}`, {
          pSQL: sql,
          pPar: [
            {
              ParamName: 'PRODUTO',
              ParamType: 'ftString',
              ParamValues: [product.PRODUTO],
            },
          ],
        })
      ).data;

      const { Data, StatusCode, StatusMessage } = tablesResult;

      if (StatusCode !== 200) {
        return thunkApi.rejectWithValue(`error: ${StatusMessage}`);
      } else {
        const newTables: iTabelaVenda[] = [];

        Data.map((tb) => {
          if ('NOVO_PRECO' in tb) {
            newTables.push({
              BLOQUEADO: tb.BLOQUEADO,
              PRECO: tb.NOVO_PRECO,
              TABELA: tb.TABELA,
            });
          } else {
            newTables.push(tb);
          }
        });
        tabelas = [...tabelas, ...newTables];
      }

      const result: iProdutoWithTables = {
        produto: product,
        tables: tabelas,
      };

      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(`error: ${error.message}`);
    }
  },
);
