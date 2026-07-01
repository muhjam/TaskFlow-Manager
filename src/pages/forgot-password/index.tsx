import React from 'react';
import { AuthSplitLayout } from '../../features/auth/components/auth-split-layout';
import { ForgotPasswordForm } from '../../features/auth/components/forgot-password-form';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthSplitLayout
      headline="We'll help you get back in."
      description="Reset your password in a few simple steps and return to managing your tasks without missing a beat."
    >
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
};
