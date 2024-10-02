import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  checkHealthAPI,
  generateTokenAPI,
  refreshTokenAPI,
} from '@/app/middlewares/auth/authMiddleware';
// import { fetchStoreAndProducts } from '../stores/storeSlice';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
  token: {
    access: string | null;
    refresh: string | null;
    createdAt: number | null;
    updatedAt: number | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  access_token: null,
  refresh_token: null,
  error: null,
  token: {
    access: null,
    refresh: null,
    createdAt: null,
    updatedAt: null,
  },
};

export const authenticationRequest = createAsyncThunk<
  {
    username: string;
    access_token: string;
    refresh_token: string;
    accessTokenExpiresAt: number;
  },
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
    const accessTokenExpiresAt = Date.now() + 25 * 60 * 1000;
    return {
      username: credentials.username,
      access_token,
      refresh_token,
      accessTokenExpiresAt,
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const refreshToken = state.auth.token.refresh;
    if (refreshToken) {
      // Call the API to refresh the token
      const { newAccessToken, newRefreshToken } =
        await refreshTokenAPI(refreshToken);
      return { newAccessToken, newRefreshToken };
    }
    throw new Error('No refresh token available');
  },
);

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
      .addCase(authenticationRequest.fulfilled, (state, action) => {
        console.log({ state });
        state.isAuthenticated = true;
        state.user = action.payload.username;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token.access = action.payload.access_token;
        state.token.refresh = action.payload.refresh_token;
        state.token.createdAt = Math.floor(new Date().getTime() / 1000);
        state.token.updatedAt = Math.floor(new Date().getTime() / 1000);
        state.error = null;
      })
      .addCase(authenticationRequest.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error occurred';
        state.isAuthenticated = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token.access = action.payload.newAccessToken;
        state.token.refresh = action.payload.newRefreshToken;
        state.token.updatedAt = Math.floor(new Date().getTime() / 1000);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.token.access = null;
        state.token.refresh = null;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const tokenSelector = (state: RootState) => state.auth.token;

export default authSlice.reducer;
