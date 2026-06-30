import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { authService } from '../../services';

const changePasswordSchema = z.object({
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
  email: string;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ email }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(email, data.password);
      navigate('/login', { state: { message: 'Password berhasil diubah. Silakan login.' } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat mengubah password';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[420px] animate-fade-in">
      <header className="text-center mb-ds-xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-ds-xl bg-primary-container text-on-primary-container mb-ds-md shadow-md">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
        </div>
        <h1 className="text-headline-md text-on-surface tracking-tight font-bold">
          Change Password
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1 font-medium">
          Create a new password for <span className="text-primary font-bold">{email}</span>
        </p>
      </header>

      <div className="bg-surface-container-lowest rounded-ds-xl p-ds-lg shadow-level1 border border-outline-variant/30">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-ds-lg">
          {error && (
            <div className="rounded-ds-md bg-error/10 p-3 text-xs text-error font-bold">
              {error}
            </div>
          )}

          <Input
            label="New Password"
            type="password"
            icon="lock"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            icon="lock_reset"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" className="w-full font-bold" size="lg" isLoading={isLoading}>
            Update Password
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
  );
};
