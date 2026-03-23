import { fileApi } from '@/features/fileApi';
import { configureStore } from '@reduxjs/toolkit';

/*
************* REDUX TOOLKIT - STORE SETUP *************
*/
export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
  },
  middleware: (gDM) => gDM().concat(fileApi.middleware),
});