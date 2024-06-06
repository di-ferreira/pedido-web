/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    iCondicaoPgto,
    iFormaPgto,
    iItemPreVenda,
    iMovimento,
    iPreVenda,
    iTransportadora,
} from '../../@types/PreVenda';
import { iDataResultTable } from '../../@types/Table';
import {
    GetCondicaoPGTO,
    GetFormasPGTO,
    GetPreVenda,
    GetPreVendas,
    GetTransport,
    SavePreVenda,
} from './PreVenda.thunk';

interface iPreVendaState {
    CurrentPV: iPreVenda;
    ListPreVendas: iDataResultTable<iMovimento>;
    FormaPgto: iFormaPgto[];
    CondicaoPgto: iCondicaoPgto[];
    Transportadora: iTransportadora[];
    isLoading: boolean;
    errorMessage: string;
}

const initialState: iPreVendaState = {
    CurrentPV: {
        DataPedido: '',
        CodigoCliente: 0,
        CodigoVendedor1: 0,
        SubTotal: 0,
        Total: 0,
        ObsPedido1: '',
        ObsNotaFiscal: '',
        CodigoCondicaoPagamento: 0,
        ModeloNota: '',
        NumeroOrdemCompraCliente: '',
        Entrega: '',
        Itens: [],
    },
    ListPreVendas: {
        Qtd_Registros: 0,
        value: [],
    },
    CondicaoPgto: [],
    FormaPgto: [],
    Transportadora: [],
    isLoading: false,
    errorMessage: '',
};

export const preVendaSlice = createSlice({
    name: 'PreVenda',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(GetPreVendas.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = '';
            })
            .addCase(
                GetPreVendas.fulfilled,
                (state, action: PayloadAction<iDataResultTable<iMovimento> | undefined>) => {
                    state.isLoading = false;
                    state.errorMessage = '';
                    if (action.payload) {
                        state.ListPreVendas = action.payload;
                    }
                },
            )
            .addCase(GetPreVendas.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });

        builder
            .addCase(GetPreVenda.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = '';
            })
            .addCase(
                GetPreVenda.fulfilled,
                (state, action: PayloadAction<iMovimento | undefined>) => {
                    state.isLoading = false;
                    state.errorMessage = '';
                    if (action.payload) {
                        const ItensPV: iItemPreVenda[] = [];

                        for (const item in action.payload.Itens_List) {
                            ItensPV.push({
                                CodigoProduto: action.payload.Itens_List[item].PRODUTO.PRODUTO,
                                Qtd: action.payload.Itens_List[item].QTD,
                                Desconto: action.payload.Itens_List[item].DESCONTO
                                    ? action.payload.Itens_List[item].DESCONTO
                                    : 0,
                                SubTotal: action.payload.Itens_List[item].SUBTOTAL,
                                Tabela: action.payload.Itens_List[item].TABELA,
                                Valor: action.payload.Itens_List[item].VALOR,
                                Total: action.payload.Itens_List[item].TOTAL,
                                Frete: 0,
                            });
                        }

                        const PV: iPreVenda = {
                            CodigoCliente: action.payload.CLIENTE.CLIENTE,
                            CodigoCondicaoPagamento: action.payload.ID_CONDICAO_PGTO,
                            CodigoVendedor1: action.payload.VENDEDOR.VENDEDOR,
                            DataPedido: action.payload.DATA,
                            ModeloNota: action.payload.MODELO_NOTA,
                            Itens: ItensPV,
                            SubTotal: action.payload.SUBTOTAL,
                            Total: action.payload.TOTAL,
                            ObsPedido1: action.payload.OBS1,
                            ObsPedido2: action.payload.OBS2,
                            ObsNotaFiscal: action.payload.OBS_NF,
                            Entrega: action.payload.FRETE,
                            NumeroOrdemCompraCliente: '',
                            CodigoVendedor2: 0,
                            Desconto: 0,
                            Origem: '',
                            PedidoEcommerce: '',
                            TipoEntrega: action.payload.TIPO_CARREGA,
                            ValorFrete: action.payload.FRETE,
                        };
                        state.CurrentPV = PV;
                    }
                },
            )
            .addCase(GetPreVenda.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });

        builder
            .addCase(GetFormasPGTO.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = '';
            })
            .addCase(
                GetFormasPGTO.fulfilled,
                (state, action: PayloadAction<iFormaPgto[] | undefined>) => {
                    state.isLoading = false;
                    state.errorMessage = '';
                    if (action.payload) {
                        state.FormaPgto = action.payload;
                    }
                },
            )
            .addCase(GetFormasPGTO.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });

        builder
            .addCase(GetCondicaoPGTO.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = '';
            })
            .addCase(
                GetCondicaoPGTO.fulfilled,
                (state, action: PayloadAction<iCondicaoPgto[] | undefined>) => {
                    state.isLoading = false;
                    state.errorMessage = '';
                    if (action.payload) {
                        state.CondicaoPgto = action.payload;
                    }
                },
            )
            .addCase(GetCondicaoPGTO.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });

        builder
            .addCase(GetTransport.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = '';
            })
            .addCase(
                GetTransport.fulfilled,
                (state, action: PayloadAction<iTransportadora[] | undefined>) => {
                    state.isLoading = false;
                    state.errorMessage = '';
                    if (action.payload) {
                        state.Transportadora = action.payload;
                    }
                },
            )
            .addCase(GetTransport.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });

        builder
            .addCase(SavePreVenda.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = '';
            })
            .addCase(
                SavePreVenda.fulfilled,
                (state, action: PayloadAction<iMovimento | undefined>) => {
                    state.isLoading = false;
                    state.errorMessage = '';

                    if (action.payload) {
                        const ItensPV: iItemPreVenda[] = [];

                        for (const item in action.payload.Itens_List) {
                            ItensPV.push({
                                CodigoProduto: action.payload.Itens_List[item].PRODUTO.PRODUTO,
                                Qtd: action.payload.Itens_List[item].QTD,
                                Desconto: action.payload.Itens_List[item].DESCONTO
                                    ? action.payload.Itens_List[item].DESCONTO
                                    : 0,
                                SubTotal: action.payload.Itens_List[item].SUBTOTAL,
                                Tabela: action.payload.Itens_List[item].TABELA,
                                Valor: action.payload.Itens_List[item].VALOR,
                                Total: action.payload.Itens_List[item].TOTAL,
                                Frete: 0,
                            });
                        }

                        const PV: iPreVenda = {
                            CodigoCliente: action.payload.CLIENTE.CLIENTE,
                            CodigoCondicaoPagamento: action.payload.ID_CONDICAO_PGTO,
                            CodigoVendedor1: action.payload.VENDEDOR.VENDEDOR,
                            DataPedido: action.payload.DATA,
                            ModeloNota: action.payload.MODELO_NOTA,
                            Itens: ItensPV,
                            SubTotal: action.payload.SUBTOTAL,
                            Total: action.payload.TOTAL,
                            ObsPedido1: action.payload.OBS1,
                            ObsPedido2: action.payload.OBS2,
                            ObsNotaFiscal: action.payload.OBS_NF,
                            Entrega: action.payload.FRETE,
                            NumeroOrdemCompraCliente: '',
                            CodigoVendedor2: 0,
                            Desconto: 0,
                            Origem: '',
                            PedidoEcommerce: '',
                            TipoEntrega: action.payload.TIPO_CARREGA,
                            ValorFrete: action.payload.FRETE,
                        };
                        state.CurrentPV = PV;
                    }
                },
            )
            .addCase(SavePreVenda.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });
    },
});

// export const {} = preVendaSlice.actions;

export const preVendaReducer = preVendaSlice.reducer;
