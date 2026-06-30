import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { authService } from '../../features/auth/services';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.requestPasswordReset(data.email);
      navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-ds-container">
      <main className="w-full max-w-[420px] animate-fade-in">
        <header className="text-center mb-ds-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-ds-xl bg-primary-container text-on-primary-container mb-ds-md shadow-md">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lock_reset
            </span>
          </div>
          <h1 className="text-headline-md text-on-surface tracking-tight font-bold">
            Reset Password
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1 font-medium">
            We'll help you get back into your account.
          </p>
        </header>

        <div className="bg-surface-container-lowest rounded-ds-xl p-ds-lg shadow-level1 border border-outline-variant/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-ds-lg">
            {error && (
              <div className="rounded-ds-md bg-error/10 p-3 text-xs text-error font-bold">
                {error}
              </div>
            )}

            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <Input
              label="Email Address"
              type="email"
              icon="mail"
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Button type="submit" className="w-full font-bold" size="lg" isLoading={isLoading}>
              Send Instructions
            </Button>
          </form>
        </div>

        <footer className="mt-ds-xl text-center">
          <p className="text-body-md text-on-surface-variant font-medium">
            Remember your password?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline ml-1">
              Back to Login
            </Link>
          </p>
        </footer>

        <div className="fixed top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[80px] -z-10"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary-container/10 rounded-full blur-[80px] -z-10"></div>
      </main>
    </div>
  );
};
