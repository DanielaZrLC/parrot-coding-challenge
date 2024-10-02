import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  checkHealthAPI,
  generateTokenAPI,
  refreshTokenAPI,
} from '@/app/middlewares/auth/authMiddleware';
import { setAccessToken, setRefreshToken } from '@/app/utils/tokenUtils';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
  refreshing: boolean;
  refreshCount: number;
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
  error: null,
  refreshing: false,
  refreshCount: 0,
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
    return {
      username: credentials.username,
      access_token,
      refresh_token,
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const refreshToken = state.auth.token.refresh;
    const refreshCount = state.auth.refreshCount;

    // Check if the refresh count has reached the limit
    if (refreshCount >= 2) {
      return rejectWithValue('Maximum refresh attempts exceeded');
    }

    if (refreshToken) {
      try {
        const { newAccessToken, newRefreshToken } =
          await refreshTokenAPI(refreshToken);
        return { newAccessToken, newRefreshToken };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return rejectWithValue('Token refresh failed');
      }
    }

    return rejectWithValue('No refresh token available');
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
      state.token.access = null;
      state.token.refresh = null;
      state.token.createdAt = null;
      state.token.updatedAt = null;
      state.error = null;
      state.refreshing = false;
      state.refreshCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticationRequest.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.username;
        state.token.access = action.payload.access_token;
        state.token.refresh = action.payload.refresh_token;
        state.token.createdAt = Math.floor(new Date().getTime() / 1000);
        state.token.updatedAt = Math.floor(new Date().getTime() / 1000);
        setAccessToken(action.payload.access_token);
        setRefreshToken(action.payload.refresh_token);
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
        setAccessToken(action.payload.newAccessToken);
        setRefreshToken(action.payload.newRefreshToken);
        state.refreshing = false;
        state.refreshCount += 1;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.token.access = null;
        state.token.refresh = null;
        state.refreshing = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.refreshing = true;
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
