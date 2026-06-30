import React from 'react';
import { LoginForm } from '../../features/auth/components/login-form';

export const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-ds-container">
      <LoginForm />
    </div>
  );
};
