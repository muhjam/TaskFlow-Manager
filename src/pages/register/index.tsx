import React from 'react';
import { AuthSplitLayout } from '../../features/auth/components/auth-split-layout';
import { RegisterForm } from '../../features/auth/components/register-form';

export const RegisterPage: React.FC = () => {
  return (
    <AuthSplitLayout
      headline="Start your productivity journey."
      description="Create your account and manage tasks effortlessly with a clean, modern workspace built for focus."
    >
      <RegisterForm />
    </AuthSplitLayout>
  );
};
