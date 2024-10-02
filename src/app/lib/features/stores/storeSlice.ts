import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  fetchItemsAPI,
  getStoreIdAPI,
  testTokenAPI,
  updateItemsAPI,
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
  stores: Store | null;
  products: Product[];
  error: string | null;
  hola: string;
}

const initialState: StoreState = {
  hola: '',
  stores: null,
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
    const accessToken = getState().auth.token.access;
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
    const storeId = storeData.stores[0].uuid;

    // Step 3: Fetch products for the store
    const productsResponse = await fetchItemsAPI(storeId, accessToken);
    const productsData = productsResponse.data.results;

    // Return both store and products
    return { store: storeData, products: productsData };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Add the new thunk in your storesSlice
export const updateProductAvailability = createAsyncThunk<
  Product,
  { productId: string; availability: string },
  { state: RootState }
>(
  'store/updateProductAvailability',
  async ({ productId, availability }, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.token.access;
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      const response = await updateItemsAPI(
        productId,
        availability,
        accessToken,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    fetchStoreSuccess: (state, action: PayloadAction<Store>) => {
      state.stores = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreAndProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchStoreAndProducts.fulfilled, (state, action) => {
        const { store, products } = action.payload;
        state.stores = store;
        state.products = products;
        state.error = null;
      })
      .addCase(updateProductAvailability.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.uuid === updatedProduct.uuid,
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(fetchStoreAndProducts.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { fetchStoreSuccess, fetchProductsSuccess, fetchFailure } =
  storesSlice.actions;

export const selectStore = (state: RootState) => state.stores.stores;
export const selectProducts = (state: RootState) => state.stores.products;

export default storesSlice.reducer;
