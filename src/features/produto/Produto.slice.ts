/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iProduto, iProdutoWithTables, iTabelaVenda } from '../../@types/Produto';
import { iDataResultTable } from '../../@types/Table';
import { SetProduct, SuperFindProducts, TableFromProduct } from './Produto.thunk';

interface iProdutoState {
  Current: iProdutoWithTables;
  ListProduto: iDataResultTable<iProduto>;
  TableList: iTabelaVenda[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: iProdutoState = {
  Current: {
    produto: {
      PRODUTO: '',
      REFERENCIA: '',
      LOCAL: null,
      NOME: '',
      OUTROLADO: null,
      REFERENCIA2: '',
      QTDATUAL: 0,
      QTDMINIMA: 0,
      CUSTO: 0,
      CUSTOMEDIO: 0,
      PRECO: 0,
      PRECOWEB: null,
      DT_COMPRA: '',
      DT_VENDA: '',
      COMISSAO: 0,
      UNIDADE_TRIB_CONVERSAO: null,
      TRIBUTO: '',
      DESCONTO: 0,
      SERVICO: '',
      APLICACOES: '',
      ATIVO: '',
      INSTRUCOES: null,
      MARGEM_SEGURANCA: 0,
      MARGEM_MAXIMA: null,
      QTD_VENDA: 0,
      CURVA: '',
      USAR_MARGEM_CURVA: '',
      MARGEM_CURVA: 0,
      CURVA_ESTOQUE: '',
      CURVA_FREQUENCIA: null,
      ETIQUETA: '',
      COMPRA: '',
      CST: '',
      ICMS: 0,
      IPI: null,
      ST: null,
      QTD_MAXIMA: 0,
      QTD_SEGURANCA: 0,
      QTD_GARANTIA: 0,
      LOCAL2: null,
      LOCAL3: null,
      Atualizar: '',
      PESO: null,
      FAB_BRUTO: 0,
      FAB_DESC: null,
      FAB_IPI: null,
      FAB_LIQUIDO1: null,
      FAB_ST: null,
      FAB_FRETE: null,
      FAB_LIQUIDO2: null,
      QTD_EMBALAGEM: null,
      DEPARTAMENTO: 0,
      DT_CURVA_EST: null,
      DT_CURVA_FAB: null,
      CURVA_ANTERIOR: null,
      USUARIO: '',
      DATA_HORA: '',
      SIMP: null,
      CFOP_DE: '',
      CFOP_FE: '',
      MULTIPLO_COMPRA: 0,
      TRANCAR: '',
      WEB: '',
      CFOP_DEV_DE: '',
      CFOP_DEV_FE: '',
      COMISSAO_TELEMARKETING: null,
      VOLUME: 0,
      IMPORTADO: null,
      LARGURA: null,
      ALTURA: null,
      COMPRIMENTO: null,
      ID_MONTADORA: null,
      PAGINA_CATALOGO: null,
      ORDEM_CATALOGO: null,
      DT_CADASTRO: null,
      VENDA: '',
      OBS1: null,
      OBS2: null,
      FAB_BRUTO_OFERTA: null,
      FAB_DESC_OFERTA: null,
      FAB_IPI_OFERTA: null,
      FAB_LIQUIDO1_OFERTA: null,
      FAB_ST_OFERTA: null,
      FAB_FRETE_OFERTA: null,
      FAB_LIQUIDO2_OFERTA: null,
      VENDA_COM_OFERTA: null,
      MARGEM_OFERTA: null,
      PRECO_COM_OFERTA: null,
      FAB_OFERTA_VALIDADE: null,
      CNA: null,
      CODIGO_BARRA_CAIXA: null,
      QTD_CAIXA: null,
      QTD_MAX_ARMAZENAGEM: null,
      DATA_ATUALIZACAO: null,
      COMISSAO_HOME_OFFICE: null,
      COMISSAO_PROMOTOR: null,
      COMISSAO_ASSISTENTE: null,
      COMISSAO_MECANICO: null,
      IA: null,
      FCI: null,
      LINHA: null,
      NAO_DEVOLVER: null,
      STATUS: null,
      CTA_SPED_CONTRIB_E: null,
      CTA_SPED_CONTRIB_S: null,
      RESPONSABILIDADE_ICMS: null,
      RETENCAO_PIS_COFINS: null,
      NOVO_PRECO: null,
      NOVO_CUSTO: null,
      DATA_NOVO_PRECO: null,
      DATA_OFERTA_NOVO_PRECO: null,
      ID_NOVO_PRECO: null,
      FABRICANTE: {
        FABRICANTE: 0,
        NOME: '',
        CONTATO: '',
        ENDERECO: '',
        BAIRRO: '',
        CIDADE: '',
        UF: '',
        CEP: '',
        CGC: '',
        INSCRICAO: '',
        TELEFONE: '',
        OBS: '',
        MARGEM_CURVA_A: 0,
        MARGEM_CURVA_B: 0,
        MARGEM_CURVA_C: 0,
        PERC_CURVA_A: 0,
        PERC_CURVA_B: 0,
        PERC_CURVA_C: 0,
        MARGEM_CURVA_D: 0,
        MARGEM_CURVA_E: 0,
        MARGEM_CURVA_F: 0,
        MARGEM_CURVA_G: 0,
        PERC_CURVA_D: 0,
        PERC_CURVA_E: 0,
        PERC_CURVA_F: 0,
        PERC_CURVA_G: 0,
        ATUALIZAR: '',
        LER_CODIGO_BARRAS: '',
        MARGEM: 0,
        IA: 0,
        LINHA: '',
        COTACAO: '',
        FORNECEDOR: 0,
        ENDERECO_NUM: '',
        ENDERECO_CPL: '',
        ENDERECO_COD_MUN: 0,
        ENDERECO_COD_UF: 0,
        EMAIL: '',
        PREFERENCIAL: '',
        LUCRO_REAL: '',
        AJUSTA_CUSTO: '',
        MVA: 0,
        ID_CONTA: 0,
        ID_SUBCONTA: 0,
        APELIDO: '',
        MOVTO_GARANTIA: '',
        EMAIL_PEDIDO: '',
        ID_CONDICAO_PAGAMENTO: 0,
        ID_TRANSPORTADORA: 0,
        DIAS_ENTREGA: 0,
        FORMA_COMPRA: '',
        PERC_CCN: 0,
        PERC_CSN: 0,
        PERC_DESC_CCN: 0,
        PERC_DESC_CSN: 0,
        PERC_FRETE: 0,
        PERC_MARKUP: 0,
        FRETE_LIMITE: 0,
        FRETE_VALOR: 0,
        FRETE_PERC: 0,
        IPI_SN: '',
        GRUPO: 0,
        TIPO_FNC: '',
        DATA_ATUALIZACAO: '',
        NIVEL_ACESSO: 0,
        SISPAG: '',
        VALOR_MIN_COMPRA: 0,
        PENDENCIA: '',
      },
      FORNECEDOR: {
        FABRICANTE: 0,
        NOME: '',
        CONTATO: '',
        ENDERECO: '',
        BAIRRO: '',
        CIDADE: '',
        UF: '',
        CEP: '',
        CGC: '',
        INSCRICAO: '',
        TELEFONE: '',
        OBS: '',
        MARGEM_CURVA_A: 0,
        MARGEM_CURVA_B: 0,
        MARGEM_CURVA_C: 0,
        PERC_CURVA_A: 0,
        PERC_CURVA_B: 0,
        PERC_CURVA_C: 0,
        MARGEM_CURVA_D: 0,
        MARGEM_CURVA_E: 0,
        MARGEM_CURVA_F: 0,
        MARGEM_CURVA_G: 0,
        PERC_CURVA_D: 0,
        PERC_CURVA_E: 0,
        PERC_CURVA_F: 0,
        PERC_CURVA_G: 0,
        ATUALIZAR: '',
        LER_CODIGO_BARRAS: '',
        MARGEM: 0,
        IA: 0,
        LINHA: '',
        COTACAO: '',
        FORNECEDOR: 0,
        ENDERECO_NUM: '',
        ENDERECO_CPL: '',
        ENDERECO_COD_MUN: 0,
        ENDERECO_COD_UF: 0,
        EMAIL: '',
        PREFERENCIAL: '',
        LUCRO_REAL: '',
        AJUSTA_CUSTO: '',
        MVA: 0,
        ID_CONTA: 0,
        ID_SUBCONTA: 0,
        APELIDO: '',
        MOVTO_GARANTIA: '',
        EMAIL_PEDIDO: '',
        ID_CONDICAO_PAGAMENTO: 0,
        ID_TRANSPORTADORA: 0,
        DIAS_ENTREGA: 0,
        FORMA_COMPRA: '',
        PERC_CCN: 0,
        PERC_CSN: 0,
        PERC_DESC_CCN: 0,
        PERC_DESC_CSN: 0,
        PERC_FRETE: 0,
        PERC_MARKUP: 0,
        FRETE_LIMITE: 0,
        FRETE_VALOR: 0,
        FRETE_PERC: 0,
        IPI_SN: '',
        GRUPO: 0,
        TIPO_FNC: '',
        DATA_ATUALIZACAO: '',
        NIVEL_ACESSO: 0,
        SISPAG: '',
        VALOR_MIN_COMPRA: 0,
        PENDENCIA: '',
      },
      ListaSimilares: [],
      iListaVendaCasada: [],
      iListaOfertaProduto: [],
      ListaChaves: [],
    },
    tables: [],
    estoque_lojas: [],
  },
  ListProduto: {
    Qtd_Registros: 0,
    value: [],
  },
  TableList: [],
  isLoading: false,
  errorMessage: '',
};

export const produtoSlice = createSlice({
  name: 'Produto',
  initialState,
  reducers: {
    ResetProduct: (state) => {
      state.Current = initialState.Current;
      state.ListProduto = initialState.ListProduto;
      state.TableList = initialState.TableList;
      state.isLoading = initialState.isLoading;
      state.errorMessage = initialState.errorMessage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(SuperFindProducts.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        SuperFindProducts.fulfilled,
        (state, action: PayloadAction<iDataResultTable<iProduto> | undefined>) => {
          if (action.payload) {
            state.ListProduto = action.payload;
          }
          state.errorMessage = '';
          state.isLoading = false;
        },
      )
      .addCase(SuperFindProducts.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });

    builder
      .addCase(TableFromProduct.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        TableFromProduct.fulfilled,
        (state, action: PayloadAction<iTabelaVenda[] | undefined>) => {
          state.errorMessage = '';
          state.isLoading = false;
          if (action.payload) {
            state.TableList = action.payload;
          }
        },
      )
      .addCase(TableFromProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(SetProduct.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        SetProduct.fulfilled,
        (state, action: PayloadAction<iProdutoWithTables | undefined>) => {
          state.errorMessage = '';
          state.isLoading = false;
          if (action.payload) {
            state.Current = action.payload;
            state.TableList = action.payload.tables;
          }
        },
      )
      .addCase(SetProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { ResetProduct } = produtoSlice.actions;

export const produtoReducer = produtoSlice.reducer;
