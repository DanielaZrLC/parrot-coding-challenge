import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { refreshTokenAPI } from '@/app/middlewares/auth/authMiddleware';

const mock = new MockAdapter(axios);

describe('refreshTokenAPI', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should return a new access token when the refresh token is valid', async () => {
    const refreshToken = 'valid-refresh-token';
    const accessToken = 'new-access-token';

    mock
      .onPost('https://api-staging.parrot.rest/api/auth/token/refresh')
      .reply(200, {
        access_token: accessToken,
      });

    const result = await refreshTokenAPI(refreshToken);

    expect(result.newAccessToken).toEqual(accessToken);
  });

  it('should throw an error when the refresh token is invalid', async () => {
    const refreshToken = 'invalid-refresh-token';

    mock
      .onPost('https://api-staging.parrot.rest/api/auth/token/refresh')
      .reply(401, {
        detail: 'Invalid token',
      });

    await expect(refreshTokenAPI(refreshToken)).rejects.toThrow(
      'Request failed with status code 401',
    );
  });
});
