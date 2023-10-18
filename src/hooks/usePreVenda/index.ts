import { create } from 'zustand';
import { iDataResult, iSelectSQL } from '../../@types';
import { iFilter } from '../../@types/Filter';
import {
  iCondicaoPgto,
  iFormaPgto,
  iMovimento,
  iPreVenda,
  iTransportadora,
} from '../../@types/PreVenda';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services/index';
import { VENDEDOR_STORE } from '../../utils/Constants';

interface iDataOrcamento {
  Qtd_Registros: number;
  value: iMovimento[];
}

interface iDataCreateOrcamento {
  data: iDataResult<iMovimento>;
}

interface iResultPreVenda {
  data: {
    value: iMovimento[];
  };
}

type iResultSQL = iDataResult<any[]>;

type iResultFormaPgto = iDataResult<iFormaPgto[]>;

type iResultCondicaoPgto = iDataResult<iCondicaoPgto[]>;

type iResultTransportadora = iDataResult<iTransportadora[]>;

interface iUsePreVenda {
  SavePreVenda: (PreVenda: iPreVenda) => Promise<iDataResult<iMovimento>>;
  GetPreVenda: (IdPV: number) => Promise<iResultPreVenda>;
  GetPreVendas: (filter?: iFilter<iMovimento>) => Promise<iDataOrcamento>;
  GetFormaPgto: () => Promise<iResultFormaPgto>;
  GetCondicaoPgto: (valor: number) => Promise<iResultCondicaoPgto>;
  GetTransportadora: () => Promise<iResultTransportadora>;
}

const ROUTE_GET_ALL_PRE_VENDA = '/Movimento';
const ROUTE_SAVE_PRE_VENDA = '/ServiceVendas/NovaPreVenda';
const ROUTE_SELECT_SQL = 'ServiceSistema/SelectSQL';
const SQL_CONDICAO_PGTO = `SELECT O.id, O.nome, O.parcelas, O.valor_parcela, O.valor_parcela*O.PARCELAS AS VALOR_MINIMO, 
         CASE O.parcelas 
         WHEN 1  THEN O.pz01 
         WHEN 2  THEN CAST((O.pz01+o.pz02)/2 AS INTEGER) 
         WHEN 3  THEN CAST((O.pz01+o.pz02+O.pz03)/3 AS INTEGER) 
         WHEN 4  THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04)/4 AS INTEGER) 
         WHEN 5  THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04+O.pz05)/5 AS INTEGER) 
         WHEN 6  THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04+O.pz05+O.pz06)/6 AS INTEGER) 
         WHEN 7  THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04+O.pz05+O.pz06+O.pz07)/7 AS INTEGER) 
         WHEN 8  THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04+O.pz05+O.pz06+O.pz07+O.pz08)/8 AS INTEGER) 
         WHEN 9  THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04+O.pz05+O.pz06+O.pz07+O.pz08+O.pz09)/9 AS INTEGER) 
         WHEN 10 THEN CAST((O.pz01+o.pz02+O.pz03+O.pz04+O.pz05+O.pz06+O.pz07+O.pz08+O.pz09+O.pz10)/10 AS INTEGER) 
         END AS PM, 
         PZ01,PZ02,PZ03,PZ04,PZ05,PZ06,PZ07,PZ08,PZ09,PZ10, TIPO, DESTACAR_DESCONTO, FORMA 
   FROM OPP O 
   WHERE (O.valor_parcela*O.PARCELAS)<=:VALOR AND O.TIPO='V' 
   ORDER BY 6`;
const SQL_FORMA_PGTO = `SELECT C.CARTAO FROM CAR C WHERE C.CAIXA='S' order by 1`;
const SQL_TRANSPORTADORA = `SELECT F.FORNECEDOR, F.NOME, F.CIDADE FROM FNC F WHERE F.tipo_fnc='02' ORDER BY F.NOME`;

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

const GetPreVendas = async (
  filter?: iFilter<iMovimento>
): Promise<iDataOrcamento> => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  const FILTER = filter
    ? CreateFilter(filter)
    : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR} and TIPOMOV eq 'PRE-VENDA' and CANCELADO eq 'N'&$top=15&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`;

  const response = await api.get(`${ROUTE_GET_ALL_PRE_VENDA}${FILTER}`);

  let result: iDataOrcamento = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };

  return result;
};

const GetPreVenda = (IdPV: number): Promise<iResultPreVenda> => {
  return api.get(
    `${ROUTE_GET_ALL_PRE_VENDA}?$filter=MOVIMENTO eq ${IdPV} and TIPOMOV eq 'PRE-VENDA'and CANCELADO eq 'N'&$top=15&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`
  );
};

const SavePreVenda = (
  PreVenda: iPreVenda
): Promise<iDataResult<iMovimento>> => {
  return api.post(ROUTE_SAVE_PRE_VENDA, PreVenda);
};

const GetFormaPgto = async (): Promise<iResultFormaPgto> => {
  const FormasPgto: iResultFormaPgto = await GetDataSelecSQL({
    pSQL: SQL_FORMA_PGTO,
    pPar: [],
  });
  return FormasPgto;
};

const GetCondicaoPgto = async (valor: number): Promise<iResultCondicaoPgto> => {
  const CondicoesPgto: iResultCondicaoPgto = await GetDataSelecSQL({
    pSQL: SQL_CONDICAO_PGTO,
    pPar: [
      { ParamName: 'VALOR', ParamType: 'ftInteger', ParamValues: [valor] },
    ],
  });
  return CondicoesPgto;
};

const GetTransportadora = async (): Promise<iResultTransportadora> => {
  const Transportadoras: iResultTransportadora = await GetDataSelecSQL({
    pSQL: SQL_TRANSPORTADORA,
    pPar: [],
  });
  return Transportadoras;
};

const GetDataSelecSQL = async (sql: iSelectSQL): Promise<iResultSQL> => {
  return api.post(`${ROUTE_SELECT_SQL}`, sql);
};

const usePreVenda = create<iUsePreVenda>((set) => ({
  SavePreVenda: (PreVenda: iPreVenda) => SavePreVenda(PreVenda),
  GetPreVenda: (IdPreVenda: number) => GetPreVenda(IdPreVenda),
  GetPreVendas: (filter) => GetPreVendas(filter),
  GetCondicaoPgto: (valor) => GetCondicaoPgto(valor),
  GetFormaPgto: () => GetFormaPgto(),
  GetTransportadora: () => GetTransportadora(),
}));

export default usePreVenda;
