import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession } from '../../../types';
import { STORAGE_KEYS } from '../../../utils/storage';

interface AuthState extends AuthSession {
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (session) => set(session),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: STORAGE_KEYS.AUTH_SESSION,
    }
  )
);
