import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Action, configureStore, Store, ThunkAction } from '@reduxjs/toolkit';
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
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = (): {
  store: Store<RootState>;
  persistor: Persistor;
} => {
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

export const store = makeStore().store;
export const persistor = makeStore().persistor;

export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
// export type RootState = ReturnType<typeof store.getState>;
