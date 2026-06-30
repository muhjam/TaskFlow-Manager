import { mockApi } from '../../../api/mock';
import type { User, AuthSession } from '../../../types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthSession> => {
    await mockApi.delay();
    const users = mockApi.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Email atau password salah');
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      token: `mock-token-${user.id}`,
      user: userWithoutPassword,
    };
  },

  register: async (name: string, email: string, password: string): Promise<AuthSession> => {
    await mockApi.delay();
    const users = mockApi.getUsers();
    
    if (users.some((u) => u.email === email)) {
      throw new Error('Email sudah terdaftar');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    mockApi.saveUsers([...users, newUser]);

    const { password: _, ...userWithoutPassword } = newUser;
    return {
      token: `mock-token-${newUser.id}`,
      user: userWithoutPassword,
    };
  },

  resetPassword: async (email: string, newPassword: string): Promise<void> => {
    await mockApi.delay();
    const users = mockApi.getUsers();
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      throw new Error('Email tidak ditemukan');
    }

    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword,
    };

    mockApi.saveUsers(updatedUsers);
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    await mockApi.delay();
    const users = mockApi.getUsers();
    const userExists = users.some((u) => u.email === email);

    if (!userExists) {
      throw new Error('Email tidak ditemukan');
    }
  },
};
