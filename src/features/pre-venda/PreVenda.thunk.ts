/* eslint-disable quotes */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { iApiResult } from '../../@types';
import { iFilter } from '../../@types/Filter';
import {
    iCondicaoPgto,
    iFormaPgto,
    iMovimento,
    iPreVenda,
    iTransportadora,
} from '../../@types/PreVenda';
import { iDataResultTable } from '../../@types/Table';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services';
import { VENDEDOR_STORE } from '../../utils/Constants';

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
const SQL_FORMA_PGTO = "SELECT C.CARTAO FROM CAR C WHERE C.CAIXA='S' order by 1";
const SQL_TRANSPORTADORA = 'SELECT F.FORNECEDOR, F.NOME, F.CIDADE FROM FNC F ORDER BY F.NOME';
// const SQL_TRANSPORTADORA =
//     "SELECT F.FORNECEDOR, F.NOME, F.CIDADE FROM FNC F WHERE F.tipo_fnc='02' ORDER BY F.NOME";

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

export const GetPreVenda = createAsyncThunk('PreVenda/Show', async (IdPV: number, thunkAPI) => {
    try {
        const res = await api.get<iMovimento>(
            `${ROUTE_GET_ALL_PRE_VENDA}?$filter=MOVIMENTO eq ${IdPV} and TIPOMOV eq 'PRE-VENDA' and CANCELADO eq 'N'&$top=15&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`,
        );

        return res.data;
    } catch (error: unknown) {
        if (typeof error === 'string') return thunkAPI.rejectWithValue(`error: ${error}`);
        if (error instanceof Error) return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
});

export const GetPreVendas = createAsyncThunk(
    'PreVenda/List',
    async (filter: iFilter<iMovimento> | undefined, thunkAPI) => {
        try {
            const VendedorLocal: iVendedor = JSON.parse(
                String(localStorage.getItem(VENDEDOR_STORE)),
            );

            const FILTER = filter
                ? CreateFilter(filter)
                : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR} and TIPOMOV eq 'PRE-VENDA' and CANCELADO eq 'N'&$top=15&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List,Itens_List/PRODUTO`;

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

export const GetFormasPGTO = createAsyncThunk('PreVenda/GetFormasPGTO', async (_, thunkAPI) => {
    try {
        const res = await api.post<iApiResult<iFormaPgto[]>>(ROUTE_SELECT_SQL, {
            pSQL: SQL_FORMA_PGTO,
            pPar: [],
        });

        const { Data, StatusCode, StatusMessage } = res.data;

        if (StatusCode !== 200) {
            return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
        }

        return Data;
    } catch (error: unknown) {
        if (typeof error === 'string') return thunkAPI.rejectWithValue(`error: ${error}`);
        if (error instanceof Error) return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
});

export const GetCondicaoPGTO = createAsyncThunk(
    'PreVenda/GetCondicaoPGTO',
    async (valor: number, thunkAPI) => {
        try {
            const res = await api.post<iApiResult<iCondicaoPgto[]>>(ROUTE_SELECT_SQL, {
                pSQL: SQL_CONDICAO_PGTO,
                pPar: [{ ParamName: 'VALOR', ParamType: 'ftInteger', ParamValues: [valor] }],
            });

            const { Data, StatusCode, StatusMessage } = res.data;

            if (StatusCode !== 200) {
                return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
            }

            return Data;
        } catch (error: unknown) {
            if (typeof error === 'string') return thunkAPI.rejectWithValue(`error: ${error}`);
            if (error instanceof Error) return thunkAPI.rejectWithValue(`error: ${error.message}`);
        }
    },
);

export const GetTransport = createAsyncThunk('PreVenda/GetTransport', async (_, thunkAPI) => {
    try {
        const res = await api.post<iApiResult<iTransportadora[]>>(ROUTE_SELECT_SQL, {
            pSQL: SQL_TRANSPORTADORA,
            pPar: [],
        });

        const { Data, StatusCode, StatusMessage } = res.data;

        if (StatusCode !== 200) {
            return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
        }

        return Data;
    } catch (error: unknown) {
        if (typeof error === 'string') return thunkAPI.rejectWithValue(`error: ${error}`);
        if (error instanceof Error) return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
});

export const SavePreVenda = createAsyncThunk(
    'PreVenda/Save',
    async (PreVenda: iPreVenda, thunkAPI) => {
        try {
            const res: iApiResult<iMovimento> = (
                await api.post<iApiResult<iMovimento>>(ROUTE_SAVE_PRE_VENDA, PreVenda)
            ).data;

            const { Data, StatusCode, StatusMessage } = res;

            if (StatusCode !== 200) {
                return thunkAPI.rejectWithValue(`error: ${StatusMessage}`);
            }
            return Data;
        } catch (error: unknown) {
            if (typeof error === 'string') return thunkAPI.rejectWithValue(`error: ${error}`);
            if (error instanceof Error) return thunkAPI.rejectWithValue(`error: ${error.message}`);
        }
    },
);
