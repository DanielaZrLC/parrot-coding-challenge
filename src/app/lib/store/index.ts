import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storeReducer from '../features/stores/storeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      stores: storeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
