import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { AuthSplitLayout } from '../../features/auth/components/auth-split-layout';
import { ChangePasswordForm } from '../../features/auth/components/change-password-form';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <AuthSplitLayout
      headline="Create a new secure password."
      description="Choose a strong password to keep your account safe and get back to your tasks quickly."
    >
      <ChangePasswordForm email={email} />
    </AuthSplitLayout>
  );
};
