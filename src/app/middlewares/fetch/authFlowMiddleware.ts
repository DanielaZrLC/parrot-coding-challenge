/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios from 'axios';
// import { Action, Middleware } from '@reduxjs/toolkit';
// import { loginSlice } from '../../lib/features/auth/authSlice';
// import { getAccessToken } from '../../utils/tokenUtils';
// import {
//   fetchStoreSuccess,
//   fetchProductsSuccess,
// } from '../../lib/features/stores/storeSlice';
// import Router from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// API call to validate the token
export const testTokenAPI = (accessToken: string) => {
  return axios.get(`${baseUrl}/api/auth/token/test`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// API call to get the store information
export const getStoreIdAPI = (accessToken: string) => {
  return axios.get(`${baseUrl}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// API call to fetch products based on the store ID
export const fetchItemsAPI = (storeId: string, accessToken: string) => {
  return axios.get(`${baseUrl}/api/v1/products/?store=${storeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// export const authFlowMiddleware: Middleware<{}, any, any> =
//   (store) => (next) => async (action: unknown) => {
//     if ((action as Action).type === loginSlice.fulfilled.type) {
//       try {
//         // Step 1: Validate the token
//         const accessToken = getAccessToken();
//         console.log('Access token:', accessToken);

//         const validateTokenResponse = await axios.get(
//           `${baseUrl}/api/auth/token/test`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//         );

//         if (validateTokenResponse.data.status !== 'ok') {
//           throw new Error('Token validation failed');
//         }

//         // Step 2: Fetch the user's store information
//         const storeResponse = await axios.get(`${baseUrl}/api/v1/users/me`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         const storeData = storeResponse.data.result;
//         const storeId = storeData.stores[0].uuid; // Assuming we need the first store's ID

//         // Dispatch action to store the store information in Redux
//         store.dispatch(fetchStoreSuccess(storeData));
//         console.log('Store data dispatched to Redux:', storeData);

//         // Step 3: Fetch products for the store using the store ID
//         const productsResponse = await axios.get(
//           `${baseUrl}/api/v1/products/?store=${storeId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//         );

//         const productsData = productsResponse.data.results;

//         // Dispatch action to store the products information in Redux
//         store.dispatch(fetchProductsSuccess(productsData));
//         console.log('Products data dispatched to Redux:', productsData);

//       } catch (error: unknown) {
//         console.error('Error during post-login flow:', error);
//         const errorMessage =
//           error instanceof AxiosError
//             ? error.message
//             : 'Ocurrió un error, inténtalo más tarde';
//         console.error('Error during post-login flow:', errorMessage);
//       }
//     } else {
//       return next(action);
//     }
//   };
