import { logout, refreshToken } from '@/app/lib/features/auth/authSlice';
import { checkTokenStatus } from '@/app/utils/tokenUtils';
import { Modal } from 'antd';

let logoutModalShown = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshPromise: Promise<any> | null = null;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const apiMiddleware = (store) => (next) => async (action) => {
  // Skip middleware if the action is the refreshToken action to avoid loops
  if (
    action.type === 'auth/refreshToken/pending' ||
    action.type === 'auth/refreshToken/fulfilled' ||
    action.type === 'auth/refreshToken/rejected' ||
    action.type === 'auth/logout'
  ) {
    return next(action); // Pass the action along without further checks
  }

  const state = store.getState();
  const token = state.auth.token;
  const refreshCount = state.auth.refreshCount;

  if (!token || !token.access) {
    return next(action);
  }

  const status = checkTokenStatus(token);
  if (status === 'logout') {
    if (!logoutModalShown) {
      logoutModalShown = true;
      showLogoutModal(async () => {
        store.dispatch(logout());
        window.location.href = '/login';
      });
    }
    return;
  }

  if (status === 'refresh' && refreshCount < 2) {
    if (!refreshPromise) {
      console.log('Starting token refresh process...');
      refreshPromise = store
        .dispatch(refreshToken())
        .then(() => {
          console.log('Token refreshed successfully.');
        })
        .catch((error: unknown) => {
          console.error('Error during token refresh:', error);
          store.dispatch(logout());
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;
  }

  if (refreshCount >= 2) {
    store.dispatch(logout());
    window.location.href = '/login';
  }

  return next(action);
};

export const showLogoutModal = (callback: () => void) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    Modal.warning({
      title: 'Tu sesión expiró',
      content: 'Tu sesión ha expirado, serás redirigido al inicio de sesión.',
      onOk: callback,
      okText: 'OK',
      centered: true,
    });
  }
};
