import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { ChangePasswordForm } from '../../features/auth/components/change-password-form';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-ds-container">
      <ChangePasswordForm email={email} />
    </div>
  );
};
