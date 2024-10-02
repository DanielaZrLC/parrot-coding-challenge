import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  checkHealthAPI,
  generateTokenAPI,
} from '@/app/middlewares/auth/authMiddleware';
// import { fetchStoreAndProducts } from '../stores/storeSlice';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  access_token: null,
  refresh_token: null,
  error: null,
};

export const loginSlice = createAsyncThunk<
  { username: string; access_token: string; refresh_token: string },
  { username: string; password: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    // Step 1: Check API health
    const healthResponse = await checkHealthAPI();
    if (healthResponse.status !== 200) {
      throw new Error('API health check failed');
    }

    // Step 2: Send credentials to generate tokens
    const { access_token, refresh_token } = await generateTokenAPI(credentials);
    return { username: credentials.username, access_token, refresh_token };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

//Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSlice.fulfilled, (state, action) => {
        console.log('Action Payload:', action.payload);
        state.isAuthenticated = true;
        state.user = action.payload.username;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        console.log('Access Token:', action.payload.access_token);
        console.log('Refresh Token:', action.payload.refresh_token);
        state.error = null;
      })
      .addCase(loginSlice.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error occurred';
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
