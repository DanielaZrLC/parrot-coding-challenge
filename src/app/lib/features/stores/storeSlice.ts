import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  fetchItemsAPI,
  getStoreIdAPI,
  testTokenAPI,
} from '@/app/middlewares/fetch/authFlowMiddleware';

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

// Thunk to handle the post-login API calls
export const fetchStoreAndProducts = createAsyncThunk<
  { store: Store; products: Product[] },
  void,
  { state: RootState } // Access to the global state
>('store/fetchStoreAndProducts', async (_, { getState, rejectWithValue }) => {
  try {
    const accessToken = getState().auth.access_token; // Get token from auth state
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    // Step 1: Validate the token
    const validateTokenResponse = await testTokenAPI(accessToken);
    if (validateTokenResponse.data.status !== 'ok') {
      throw new Error('Token validation failed');
    }

    // Step 2: Fetch the user's store information
    const storeResponse = await getStoreIdAPI(accessToken);
    const storeData = storeResponse.data.result;
    const storeId = storeData.stores[0].uuid; // Assuming you need the first store's ID

    // Step 3: Fetch products for the store
    const productsResponse = await fetchItemsAPI(storeId, accessToken);
    const productsData = productsResponse.data.results;
    console.log(productsData, productsResponse, 'storeSlice');
    // Return both store and products
    return { store: storeData, products: productsData };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

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
