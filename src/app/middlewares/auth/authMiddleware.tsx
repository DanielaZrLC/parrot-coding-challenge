/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { setAccessToken, setRefreshToken } from '../../utils/tokenUtils';
// import { getErrorMessage } from '../errorMessage';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Helper function to check API health
export const checkHealthAPI = async (): Promise<any> => {
  try {
    console.log('dsdsdds');
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
    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    return { access_token, refresh_token };
  } catch (error: unknown) {
    console.log(error);
    throw new Error('Failed to generate tokens');
  }
};

//         } catch (error: unknown) {
//           let errorMessage = 'Ocurrió un error, inténtalo más tarde';
//           if (axios.isAxiosError(error)) {
//             const axiosError = error as AxiosError;

//             if (axiosError.response) {
//               errorMessage = getErrorMessage(axiosError.response.status);
