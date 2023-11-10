import { configureStore } from '@reduxjs/toolkit';
import { orcamentoReducer } from './features/orcamento/orcamento-slice';
import { produtoReducer } from './features/produto/produto-slice';

export const store = configureStore({
  reducer: {
    orcamento: orcamentoReducer,
    produto: produtoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

