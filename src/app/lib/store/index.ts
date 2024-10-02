import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storeReducer from '../features/stores/storeSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { apiMiddleware } from '@/app/middlewares/auth/tokenMiddleware';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  stores: storeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'stores'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export const { store, persistor } = makeStore();

// Types as explained above
export type AppStore = ReturnType<typeof makeStore>['store'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
