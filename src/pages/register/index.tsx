import React from 'react';
import { RegisterForm } from '../../features/auth/components/register-form';

export const RegisterPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-ds-container">
      <RegisterForm />
    </div>
  );
};
