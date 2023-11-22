import { configureStore } from '@reduxjs/toolkit';
import { clienteReducer } from './features/cliente/Cliente.slice';
import { orcamentoReducer } from './features/orcamento/Orcamento.slice';
import { preVendaReducer } from './features/pre-venda/PreVenda.slice';
import { produtoReducer } from './features/produto/Produto.slice';
import { vendaReducer } from './features/venda/venda.slice';

export const store = configureStore({
  reducer: {
    orcamento: orcamentoReducer,
    produto: produtoReducer,
    preVenda: preVendaReducer,
    venda: vendaReducer,
    cliente: clienteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
