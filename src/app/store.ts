import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import sortSlice from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    sort: sortSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch