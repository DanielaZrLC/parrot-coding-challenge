import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storeReducer from '../features/stores/storeSlice';
// import { authMiddleware } from '../../middlewares/auth/authMiddleware';
import { authFlowMiddleware } from '@/app/middlewares/fetch/authFlowMiddleware';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      store: storeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authFlowMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
