import axios from 'axios';

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

// API call to update products based on the store ID
export const updateItemsAPI = (
  productId: string,
  availability: string,
  accessToken: string,
) => {
  return axios.put(
    `${baseUrl}/api/v1/products/${productId}/availability`,
    { availability },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
