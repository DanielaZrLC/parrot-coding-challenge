/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Sign In User
import axios, { AxiosError } from 'axios';
import { Middleware, Action } from '@reduxjs/toolkit';
import { loginSlice } from '../../lib/features/auth/authSlice';
import { setAccessToken, setRefreshToken } from '../../utils/tokenUtils';
import { getErrorMessage } from '../errorMessage';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authMiddleware: Middleware<{}, any, any> =
  (store) => (next) => async (action: unknown) => {
    if ((action as Action).type) {
      console.log((action as Action).type, 'Middleware action type');
      if ((action as Action).type === loginSlice.pending.type) {
        const { meta } = action as ReturnType<typeof loginSlice.pending>;
        const { username, password } = meta.arg;
        try {
          //Check API health
          const healthResponse = await axios.get(`${baseUrl}/api/health`);
          if (healthResponse.status !== 200)
            throw new Error('API health check failed');

          //Send credentials to generate tokens
          const tokenResponse = await axios.post(`${baseUrl}/api/auth/token`, {
            username,
            password,
          });
          const { access: access_token, refresh: refresh_token } =
            tokenResponse.data;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          // Dispatch the fulfilled action with tokens
          store.dispatch(
            loginSlice.fulfilled({ username }, meta.requestId, meta.arg),
          );
        } catch (error: unknown) {
          let errorMessage = 'Ocurrió un error, inténtalo más tarde';
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
              errorMessage = getErrorMessage(axiosError.response.status);
            }
          }
          // Dispatch rejected action with error message
          store.dispatch(
            loginSlice.rejected(
              new Error(errorMessage),
              meta.requestId,
              meta.arg,
            ),
          );
        }
      } else {
        return next(action);
      }
    } else {
      return next(action);
    }
  };
