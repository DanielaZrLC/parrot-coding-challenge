import {createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null
}

const url = process.env.REACT_APP_API_URL

//Thunk for authentication login
export const login = createAsyncThunk(
    'auth/login',
    async(credentials:{username: string, password: string}, {rejectWithValue}) => {
       try{
        const response = await fetch(`${url}/`,{
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return { user: data.user, token: data.token };
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

//Auth slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
	},extraReducers: (builder) => {
			builder
				.addCase(login.fulfilled, (state, action: PayloadAction<{ user: string; token: string }>) => {
					state.isAuthenticated = true;
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.error = null;
				})
				.addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
					state.error = action.payload as string;
					state.isAuthenticated = false;
				});
		},
});


export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;