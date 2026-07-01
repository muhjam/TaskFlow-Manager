import React from 'react';
import { AuthSplitLayout } from '../../features/auth/components/auth-split-layout';
import { LoginForm } from '../../features/auth/components/login-form';

export const LoginPage: React.FC = () => {
  return (
    <AuthSplitLayout
      headline="Focus on what matters today."
      description="Organize your tasks, track progress, and stay productive with List and Kanban views — all in one place."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
};
