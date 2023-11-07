import { configureStore } from '@reduxjs/toolkit';
import { orcamentoReducer } from './features/orcamento/orcamento-slice';

export const store = configureStore({
  reducer: {
    orcamento: orcamentoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
