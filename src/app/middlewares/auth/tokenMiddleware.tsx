/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { logout, refreshToken } from "@/app/lib/features/auth/authSlice";
// import { checkTokenStatus } from "@/app/utils/tokenUtils";

// export const apiMiddleware = (store) => (next) => async (action) => {
//     const state = store.getState();
//     const token = state.auth.token;

//     const status = checkTokenStatus(token);
//     if (status === 'logout') {
//       // Dispatch logout if the token has expired
//       store.dispatch(logout());
//       return;
//     } else if (status === 'refresh') {
//       // Dispatch refresh token action if the token needs to be refreshed
//       await store.dispatch(refreshToken());
//     }

//     return next(action);
//   }

import { Middleware } from 'redux';
import { checkTokenStatus } from '@/app/utils/tokenUtils';
import { logout, refreshToken } from '@/app/lib/features/auth/authSlice';
import { RootState } from '@/app/lib/store';

export const apiMiddleware: Middleware<{}, RootState> =
  (store) => (next) => async (action) => {
    const state = store.getState();
    const token = state.auth.token;

    const status = checkTokenStatus(token);

    if (status === 'logout') {
      store.dispatch(logout());
      return next(action); // Always call next for synchronous actions
    } else if (status === 'refresh') {
      await store.dispatch(refreshToken() as any); // Dispatch async thunk
      return next(action); // Ensure the action continues after refresh
    }

    return next(action); // Always ensure next is called for all actions
  };
