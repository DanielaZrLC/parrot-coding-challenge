export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

interface Token {
  access: string | null;
  refresh: string | null;
  createdAt: number | null;
  updatedAt: number | null;
}

export const checkTokenStatus = (token: Token) => {
  const now = Math.floor(new Date().getTime() / 1000);
  // Calculate time passed since last token update
  const timePassed = now - (token.updatedAt ?? 0);
  // Ensure the token has an `updatedAt` time, otherwise return 'logout'
  if (!token.updatedAt) {
    return 'logout';
  }

  if (timePassed > 3300) {
    return 'logout';
  } else if (timePassed > 1500) {
    return 'refresh';
  } else {
    return 'valid';
  }
};
