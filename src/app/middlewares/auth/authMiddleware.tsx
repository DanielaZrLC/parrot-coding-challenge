/* eslint-disable @typescript-eslint/no-explicit-any */
//Sign In User
import axios from 'axios';
import { setAccessToken, setRefreshToken } from '../../utils/tokenUtils';
// import { getErrorMessage } from '../errorMessage';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Helper function to check API health
export const checkHealthAPI = async (): Promise<any> => {
  try {
    const response = await axios.get(`${baseUrl}/api/health`);
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw new Error('API health check failed');
  }
};

// Helper function to generate tokens
export const generateTokenAPI = async (credentials: {
  username: string;
  password: string;
}): Promise<{ access_token: string; refresh_token: string }> => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/token`, {
      username: credentials.username,
      password: credentials.password,
    });

    const { access: access_token, refresh: refresh_token } = response.data;

    // Optionally, store tokens in localStorage or cookies
    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    return { access_token, refresh_token };
  } catch (error: unknown) {
    console.log(error);
    throw new Error('Failed to generate tokens');
  }
};

// export const authMiddleware: Middleware<{}, any, any> =
//   (store) => (next) => async (action: unknown) => {
//     if ((action as Action).type) {
//       console.log((action as Action).type, 'Middleware action type');
//       if ((action as Action).type === loginSlice.pending.type) {
//         const { meta } = action as ReturnType<typeof loginSlice.pending>;
//         const { username, password } = meta.arg;
//         try {
//           //Check API health
//           const healthResponse = await axios.get(`${baseUrl}/api/health`);
//           if (healthResponse.status !== 200)
//             throw new Error('API health check failed');

//           //Send credentials to generate tokens
//           const tokenResponse = await axios.post(`${baseUrl}/api/auth/token`, {
//             username,
//             password,
//           });
//           const { access: access_token, refresh: refresh_token } =
//             tokenResponse.data;
//           setAccessToken(access_token);
//           setRefreshToken(refresh_token);
//           // Dispatch the fulfilled action with tokens
//           store.dispatch(
//             loginSlice.fulfilled(
//               { username, access_token, refresh_token },
//               meta.requestId,
//               meta.arg
//             )
//           );
//         } catch (error: unknown) {
//           let errorMessage = 'Ocurrió un error, inténtalo más tarde';
//           if (axios.isAxiosError(error)) {
//             const axiosError = error as AxiosError;

//             if (axiosError.response) {
//               errorMessage = getErrorMessage(axiosError.response.status);
//             }
//           }
//           // Dispatch rejected action with error message
//           store.dispatch(
//             loginSlice.rejected(
//               new Error(errorMessage),
//               meta.requestId,
//               meta.arg,
//             ),
//           );
//         }
//       } else {
//         return next(action);
//       }
//     } else {
//       return next(action);
//     }
//   };
