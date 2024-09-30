import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

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
  { username: string },
  { username: string; password: string }
>('auth/login', async (credentials) => {
  return { username: credentials.username };
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
        state.isAuthenticated = true;
        state.user = action.payload.username;
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

export default authSlice.reducer;
