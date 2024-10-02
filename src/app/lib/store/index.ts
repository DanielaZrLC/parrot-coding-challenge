import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storeReducer from '../features/stores/storeSlice';
import { combineReducers } from '@reduxjs/toolkit';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  stores: storeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'stores'], // Only persist auth and stores slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer, // Pass the persistedReducer
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable for redux-persist compatibility
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export const store = makeStore().store;
export const persistor = makeStore().persistor;

// Types as explained above
export type AppStore = ReturnType<typeof makeStore>['store'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
// import storeReducer from '../features/stores/storeSlice';

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       auth: authReducer,
//       stores: storeReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//     devTools: process.env.NODE_ENV !== 'production',
//   });
// };

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
