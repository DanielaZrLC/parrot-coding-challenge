import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Store {
  uuid: string;
  name: string;
  availabilityState: string;
  config: { brandColor: string };
}

interface ProductCategory {
  uuid: string;
  name: string;
  sortPosition: number;
}

export interface Product {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  availability: string;
  category: ProductCategory;
}

interface StoreState {
  store: Store | null;
  products: Product[];
  error: string | null;
}

const initialState: StoreState = {
  store: null,
  products: [],
  error: null,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    fetchStoreSuccess: (state, action: PayloadAction<Store>) => {
      state.store = action.payload;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.error = null;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchStoreSuccess, fetchProductsSuccess, fetchFailure } =
  storeSlice.actions;

export const selectStore = (state: RootState) => state.store.store;
export const selectProducts = (state: RootState) => state.store.products;

export default storeSlice.reducer;
