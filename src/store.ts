import { configureStore } from '@reduxjs/toolkit';
import { orcamentoReducer } from './features/orcamento/Orcamento.slice';
import { preVendaReducer } from './features/pre-venda/PreVenda.slice';
import { produtoReducer } from './features/produto/Produto.slice';

export const store = configureStore({
  reducer: {
    orcamento: orcamentoReducer,
    produto: produtoReducer,
    preVenda: preVendaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
