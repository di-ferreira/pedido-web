import { create } from 'zustand';
import { iDataResult, iSelectSQL, iUniqueResult } from '../../@types';
import { iFilter } from '../../@types/Filter';
import { iProduto, iTabelaVenda } from '../../@types/Produto';
import { iDataResultTable } from '../../@types/Table';
import api from '../../services/index';

interface iDataProduto {
  Qtd_Registros: number;
  value: iProduto[];
}

type iProdutoResult = iUniqueResult<iProduto>;

type iResultSQL = iDataResult<any[]>;

interface iReqSuperBusca {
  Palavras: string;
  PularRegistros?: number;
  QuantidadeRegistros?: number;
}

interface iUseProduto {
  GetProduto: (produto: string) => Promise<iProdutoResult>;
  GetProdutosSuperBusca: (
    filter?: iFilter<iProduto>
  ) => Promise<iDataResultTable<iProduto>>;
  GetProdutos: (
    filter?: iFilter<iProduto>
  ) => Promise<iDataResultTable<iProduto>>;
  GetTabelasFromProduto: (produto: iProduto) => Promise<iTabelaVenda[]>;
}

const SQL_MWM = `select TRIM(T.TABELA) AS TABELA, CAST((E.fab_bruto - ((E.fab_bruto*T.PERCENTUAL)/100)) AS NUMERIC(10,2)) AS NOVO_PRECO, T.bloqueada AS BLOQUEADO from tabela_mwm T, EST E WHERE E.PRODUTO=:PRODUTO AND TRIM(T.TABELA) <> '%%'`;
const SQL_NORMAL =
  'select T.TABELA, CAST((E.PRECO + ((E.PRECO*T.PERCENTUAL)/100)) AS NUMERIC(10,2)) AS PRECO, T.BLOQUEADO from TAB T, EST E ' +
  'WHERE E.PRODUTO=:PRODUTO AND (((SELECT COUNT(*) FROM fab_tab F WHERE F.fabricante=E.fabricante)=0) OR ( T.TABELA IN (SELECT' +
  ' F.TABELA FROM FAB_TAB F WHERE E.fabricante=F.fabricante AND F.tabela=T.tabela)))';
const SQL_2D = `SELECT 'TAB01' AS TABELA, fab_liquido1 AS NOVO_PRECO  FROM EST E  WHERE E.PRODUTO=:PRODUTO AND E.fab_liquido1>0 UNION  SELECT 'TAB02' AS TABELA, fab_liquido2 AS NOVO_PRECO FROM EST E  WHERE E.PRODUTO=:PRODUTO AND E.fab_st>0`;
const ROUTE_SUPER_BUSCA = 'ServiceProdutos/SuperBusca';
const ROUTE_SELECT_SQL = 'ServiceSistema/SelectSQL';
const ROUTE_GET_ALL_PRODUTO = '/Produto';

const CreateFilter = (filter: iFilter<iProduto>): string => {
  let ResultFilter: string = '';

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = `$filter=`;
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

const GetProdutosSuperBusca = async (
  filter?: iFilter<iProduto>
): Promise<iDataResultTable<iProduto>> => {
  let bodyReq: iReqSuperBusca = {
    Palavras: filter?.filter ? String(filter.filter[0].value) : '',
    PularRegistros: filter?.skip ? filter.skip : 0,
    QuantidadeRegistros: filter?.top ? filter.top : 15,
  };

  const response = await api.post(
    `${ROUTE_SUPER_BUSCA}?$expand=FABRICANTE,FORNECEDOR,GRUPO,ListaChaves`,
    bodyReq
  );

  let result: iDataResultTable<iProduto> = {
    Qtd_Registros: response.data.RecordCount,
    value: response.data.Data,
  };

  return result;
};

const GetProduto = (produto: string): Promise<iProdutoResult> => {
  return api.get(
    `${ROUTE_GET_ALL_PRODUTO}(${produto})?$expand=FABRICANTE,FORNECEDOR,GRUPO,ListaChaves,ListaOfertaProduto,ListaSimilares,ListaVendaCasada,NCM,TIPO_ITEM,UNIDADE`
  );
};

const GetProdutos = async (
  filter?: iFilter<iProduto>
): Promise<iDataProduto> => {
  const FILTER = filter
    ? CreateFilter(filter)
    : `?$top=15&$inlinecount=allpages`;

  const response = await api.get(`${ROUTE_GET_ALL_PRODUTO}${FILTER}`);

  let result: iDataProduto = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };

  return result;
};

const GetDataSelecSQL = async (sql: iSelectSQL): Promise<iResultSQL> => {
  return api.post(`${ROUTE_SELECT_SQL}`, sql);
};

const GetTabelasFromProduto = async (
  produto: iProduto
): Promise<iTabelaVenda[]> => {
  let tabelas: iTabelaVenda[] = [];

  let sql: string = SQL_NORMAL;

  if (produto.FAB_BRUTO > 0 && produto.FABRICANTE?.NOME === 'MWM')
    sql = SQL_MWM;
  if (produto.FAB_BRUTO > 0 && produto.FABRICANTE?.NOME !== 'MWM') sql = SQL_2D;

  await GetDataSelecSQL({
    pSQL: sql,
    pPar: [
      {
        ParamName: 'PRODUTO',
        ParamType: 'ftString',
        ParamValues: [produto.PRODUTO],
      },
    ],
  }).then((res) => {
    const { Data, StatusCode, StatusMessage } = res.data;
    if (StatusCode !== 200) {
      console.log(
        '🚀 ~ useProduto:153 ~ GetTabelasFromProduto ~ StatusMessage:',
        StatusMessage
      );
    } else {
      let newTables: iTabelaVenda[] = [];
      if (Data !== null)
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
  });

  return tabelas;
};

const useProduto = create<iUseProduto>((set) => ({
  GetProduto: (produto: string) => GetProduto(produto),
  GetProdutosSuperBusca: (filter?: iFilter<iProduto>) =>
    GetProdutosSuperBusca(filter),
  GetProdutos: (filter?: iFilter<iProduto>) => GetProdutos(filter),
  GetTabelasFromProduto: (produto: iProduto) => GetTabelasFromProduto(produto),
}));

export default useProduto;
