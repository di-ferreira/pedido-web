import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iOrcamento } from '../../@types/Orcamento';
import { iDataResultTable } from '../../@types/Table';
import { GetListOrcamento, GetOrcamento } from './Orcamento-Thunk';

interface iOrcamentoState {
  Current: iOrcamento;
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetOrcamento.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        GetOrcamento.fulfilled,
        (state, action: PayloadAction<iOrcamento>) => {
          state.isLoading = false;
          state.Current = action.payload;
          state.errorMessage = '';
        }
      )
      .addCase(GetOrcamento.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(GetListOrcamento.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        GetListOrcamento.fulfilled,
        (state, action: PayloadAction<iDataResultTable<iOrcamento>>) => {
          state.isLoading = false;
          state.ListOrcamento = action.payload;
          state.errorMessage = '';
        }
      )
      .addCase(
        GetListOrcamento.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      );
  },
});

export const {} = orcamentoSlice.actions;

export const orcamentoReducer = orcamentoSlice.reducer;

