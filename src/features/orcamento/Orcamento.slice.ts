/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iItensOrcamento, iOrcamento } from '../../@types/Orcamento';
import { iDataResultTable } from '../../@types/Table';
import {
  GetListOrcamento,
  GetOrcamento,
  NewItemOrcamento,
  NewOrcamento,
  RemoveItemOrcamento,
  UpdateItemOrcamento,
} from './Orcamento.thunk';

interface iOrcamentoState {
  Current: iOrcamento;
  CurrentItem: iItensOrcamento;
  ListOrcamento: iDataResultTable<iOrcamento>;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: iOrcamentoState = {
  Current: {
    ORCAMENTO: 0,
    TOTAL: 0,
    VENDEDOR: {
      VENDEDOR: 0,
      NOME: '',
      ENDERECO: '',
      BAIRRO: '',
      CIDADE: '',
      UF: '',
      CEP: '',
      TELEFONE: '',
      SENHA: '',
      ATUALIZAR: '',
      COMISSAO: 0,
      CTPS: '',
      FUNCAO: '',
      ADMISSAO: '',
      DEMISSAO: '',
      SALARIO: 0,
      VALE_TRANSPORTE: 0,
      NASCIMENTO: '',
      CPF: '',
      IDENTIDADE: '',
      ESTADO_CIVIL: '',
      PIS: '',
      NACIONALIDADE: '',
      NATURALIDADE: '',
      CONJUGE: '',
      EMAIL: '',
      CELULAR: '',
      ATIVO: '',
      VENDA: '',
      TIPO_VENDEDOR: '',
      CARTAO_NUMERO: '',
      CARTAO_MATRICULA: '',
      META_MARKUP: 0,
      META_INDEXADOR: 0,
      SETOR: '',
      TABELAS_PERMITIDAS: '',
    },
    CLIENTE: {
      CLIENTE: 0,
      NOME: '',
      ENDERECO: '',
      BAIRRO: '',
      CIDADE: '',
      UF: '',
      CEP: '',
      CIC: '',
      DT_CADASTRO: '',
      DT_NASCIMENTO: '',
      DT_ULT_COMPRA: '',
      INSC_IDENT: '',
      TELEFONE: '',
      FAX: '',
      EMAIL: '',
      BLOQUEADO: '',
      MOTIVO: '',
      P1_DE: 0,
      P1_ATE: 0,
      P1_VENCIMENTO: 0,
      P2_DE: 0,
      P2_ATE: 0,
      P2_VENCIMENTO: 0,
      USARLIMITE: '',
      LIMITE: 0,
      DESCONTO: '',
      OBS: '',
      VALOR_DESCONTO: 0,
      ECF: '',
      BOLETO: '',
      CARTEIRA: '',
      ROTA: 0,
      TAXA_ENTREGA: 0,
      CLASSIFICACAO: 0,
      FRETE_POR_CONTA: '',
      FRETE_TIPO: '',
      ACRESCIMO_NOTA: 0,
      VENDEDOR: 0,
      OS: '',
      TIPO_FAT: '',
      MESSAGEM_FINANCEIRO: '',
      ENDERECO_NUM: '',
      ENDERECO_CPL: '',
      ENDERECO_COD_MUN: 0,
      ENDERECO_COD_UF: 0,
      Tabela: '',
      ATUALIZAR: '',
      CONDICAO_PAGAMENTO: '',
      APELIDO: '',
      EMAIL_FINANCEIRO: '',
      DESCONTO_AVISTA: 0,
      TRANSPORTADORA: 0,
      ID_CONDICAO: 0,
      FROTA: '',
      IDENTIDADE: '',
      MENSAGEM_FINANCEIRO: '',
      GRUPO: 0,
      END_ENTREGA: '',
      INSCRICAO_M: '',
      LIMITE_CHEQUE: 0,
      META: 0,
      SOMENTE_NFE: '',
      VENDEDOR_INTERNO: 0,
      DATA_ATUALIZACAO: '',
      GEO_LAT: '',
      GEO_LNG: '',
      DDA: '',
      V100: '',
      TIPO_CLIENTE: '',
      AtualizarRegiao: '',
      SENHA: '',
      EMAIL_VENDA_DIRETA: '',
      SENHA_VENDA_DIRETA: '',
      PERC_VENDA_DIRETA: 0,
      ConsumidorFinal: '',
      DESCONTO_BOLETO: '',
      REGIAO: {
        ID: 0,
        DESCRICAO: '',
        CARENCIA: 0,
        COMISSAO: 0,
        Locais_List: [],
      },
      OFICINA: '',
      Telefones: [],
      FollowUpList: [],
      AgendamentosList: [],
      PendenciasList: [],
    },
    ItensOrcamento: [],
  },
  CurrentItem: {
    QTD: 0,
    VALOR: 0,
    TOTAL: 0,
    SUBTOTAL: 0,
    DESCONTO: 0,
    TABELA: '',
    ORCAMENTO: {
      ORCAMENTO: 0,
      TOTAL: 0,
      VENDEDOR: {
        VENDEDOR: 0,
        NOME: '',
        ENDERECO: '',
        BAIRRO: '',
        CIDADE: '',
        UF: '',
        CEP: '',
        TELEFONE: '',
        SENHA: '',
        ATUALIZAR: '',
        COMISSAO: 0,
        CTPS: '',
        FUNCAO: '',
        ADMISSAO: '',
        DEMISSAO: '',
        SALARIO: 0,
        VALE_TRANSPORTE: 0,
        NASCIMENTO: '',
        CPF: '',
        IDENTIDADE: '',
        ESTADO_CIVIL: '',
        PIS: '',
        NACIONALIDADE: '',
        NATURALIDADE: '',
        CONJUGE: '',
        EMAIL: '',
        CELULAR: '',
        ATIVO: '',
        VENDA: '',
        TIPO_VENDEDOR: '',
        CARTAO_NUMERO: '',
        CARTAO_MATRICULA: '',
        META_MARKUP: 0,
        META_INDEXADOR: 0,
        SETOR: '',
        TABELAS_PERMITIDAS: '',
      },
      CLIENTE: {
        CLIENTE: 0,
        NOME: '',
        ENDERECO: '',
        BAIRRO: '',
        CIDADE: '',
        UF: '',
        CEP: '',
        CIC: '',
        DT_CADASTRO: '',
        DT_NASCIMENTO: '',
        DT_ULT_COMPRA: '',
        INSC_IDENT: '',
        TELEFONE: '',
        FAX: '',
        EMAIL: '',
        BLOQUEADO: '',
        MOTIVO: '',
        P1_DE: 0,
        P1_ATE: 0,
        P1_VENCIMENTO: 0,
        P2_DE: 0,
        P2_ATE: 0,
        P2_VENCIMENTO: 0,
        USARLIMITE: '',
        LIMITE: 0,
        DESCONTO: '',
        OBS: '',
        VALOR_DESCONTO: 0,
        ECF: '',
        BOLETO: '',
        CARTEIRA: '',
        ROTA: 0,
        TAXA_ENTREGA: 0,
        CLASSIFICACAO: 0,
        FRETE_POR_CONTA: '',
        FRETE_TIPO: '',
        ACRESCIMO_NOTA: 0,
        VENDEDOR: 0,
        OS: '',
        TIPO_FAT: '',
        MESSAGEM_FINANCEIRO: '',
        ENDERECO_NUM: '',
        ENDERECO_CPL: '',
        ENDERECO_COD_MUN: 0,
        ENDERECO_COD_UF: 0,
        Tabela: '',
        ATUALIZAR: '',
        CONDICAO_PAGAMENTO: '',
        APELIDO: '',
        EMAIL_FINANCEIRO: '',
        DESCONTO_AVISTA: 0,
        TRANSPORTADORA: 0,
        ID_CONDICAO: 0,
        FROTA: '',
        IDENTIDADE: '',
        MENSAGEM_FINANCEIRO: '',
        GRUPO: 0,
        END_ENTREGA: '',
        INSCRICAO_M: '',
        LIMITE_CHEQUE: 0,
        META: 0,
        SOMENTE_NFE: '',
        VENDEDOR_INTERNO: 0,
        DATA_ATUALIZACAO: '',
        GEO_LAT: '',
        GEO_LNG: '',
        DDA: '',
        V100: '',
        TIPO_CLIENTE: '',
        AtualizarRegiao: '',
        SENHA: '',
        EMAIL_VENDA_DIRETA: '',
        SENHA_VENDA_DIRETA: '',
        PERC_VENDA_DIRETA: 0,
        ConsumidorFinal: '',
        DESCONTO_BOLETO: '',
        REGIAO: {
          ID: 0,
          DESCRICAO: '',
          CARENCIA: 0,
          COMISSAO: 0,
          Locais_List: [],
        },
        OFICINA: '',
        Telefones: [],
        FollowUpList: [],
        AgendamentosList: [],
        PendenciasList: [],
      },
      ItensOrcamento: [],
    },
    PRODUTO: {
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
  },
  ListOrcamento: {
    Qtd_Registros: 0,
    value: [],
  },
  isLoading: false,
  errorMessage: '',
};

export const orcamentoSlice = createSlice({
  name: 'Orcamento',
  initialState,
  reducers: {
    SetCurrentItem: (state, action: PayloadAction<iItensOrcamento>) => {
      state.CurrentItem = action.payload;
    },
    ResetCurrentItem: (state) => {
      state.CurrentItem = initialState.CurrentItem;
    },
    ResetCurrentOrcamento: (state) => {
      state.Current = initialState.Current;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(NewOrcamento.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(NewOrcamento.fulfilled, (state, action: PayloadAction<iOrcamento | undefined>) => {
        state.isLoading = false;
        if (action.payload) {
          state.Current = action.payload;
        }
        state.errorMessage = '';
      })
      .addCase(NewOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(GetOrcamento.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(GetOrcamento.fulfilled, (state, action: PayloadAction<iOrcamento | undefined>) => {
        state.isLoading = false;
        if (action.payload) {
          state.Current = action.payload;
        }
        state.errorMessage = '';
      })
      .addCase(GetOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(GetListOrcamento.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        GetListOrcamento.fulfilled,
        (state, action: PayloadAction<iDataResultTable<iOrcamento> | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            state.ListOrcamento = action.payload;
          }
          state.errorMessage = '';
        },
      )
      .addCase(GetListOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(NewItemOrcamento.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        NewItemOrcamento.fulfilled,
        (state, action: PayloadAction<iOrcamento | undefined>) => {
          state.errorMessage = '';
          state.isLoading = false;
          if (action.payload) {
            state.Current = action.payload;
          }
        },
      )
      .addCase(NewItemOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(RemoveItemOrcamento.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        RemoveItemOrcamento.fulfilled,
        (state, action: PayloadAction<iOrcamento | undefined>) => {
          state.errorMessage = '';
          state.isLoading = false;
          if (action.payload) {
            state.Current = action.payload;
          }
        },
      )
      .addCase(RemoveItemOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(UpdateItemOrcamento.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        UpdateItemOrcamento.fulfilled,
        (state, action: PayloadAction<iOrcamento | undefined>) => {
          state.errorMessage = '';
          state.isLoading = false;
          if (action.payload) {
            state.Current = action.payload;
          }
        },
      )
      .addCase(UpdateItemOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { ResetCurrentItem, SetCurrentItem, ResetCurrentOrcamento } = orcamentoSlice.actions;

export const orcamentoReducer = orcamentoSlice.reducer;
