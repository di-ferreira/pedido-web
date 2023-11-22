/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iCliente } from '../../@types/Cliente';
import { iDataResultTable } from '../../@types/Table';
import { GetCliente } from './Cliente.thunk';

interface iClienteState {
  Current: iCliente;
  ListCliente: iDataResultTable<iCliente>;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: iClienteState = {
  Current: {
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
    OFICINA: '',
    Telefones: [],
    FollowUpList: [],
    AgendamentosList: [],
    PendenciasList: [],
    REGIAO: {
      ID: 0,
      DESCRICAO: '',
      CARENCIA: 0,
      COMISSAO: 0,
      Locais_List: [],
    },
  },
  ListCliente: {
    Qtd_Registros: 0,
    value: [],
  },
  isLoading: false,
  errorMessage: '',
};

export const clienteSlice = createSlice({
  name: 'Cliente',
  initialState,
  reducers: {
    SetCurrentCliente: (state, action: PayloadAction<iCliente>) => {
      state.Current = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetCliente.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        GetCliente.fulfilled,
        (state, action: PayloadAction<iDataResultTable<iCliente> | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            state.ListCliente = action.payload;
          }
          state.errorMessage = '';
        },
      )
      .addCase(GetCliente.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { SetCurrentCliente } = clienteSlice.actions;

export const clienteReducer = clienteSlice.reducer;
