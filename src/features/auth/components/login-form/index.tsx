import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { authService } from '../../services';
import { useAuthStore } from '../../store';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = (location.state as { message?: string } | null)?.message;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await authService.login(data.email, data.password);
      setSession(session);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[420px] animate-fade-in">
      <header className="text-center mb-ds-xl lg:hidden">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-ds-xl bg-primary-container text-on-primary-container mb-ds-md shadow-md">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
        <h1 className="text-headline-md text-on-surface tracking-tight font-bold">
          Welcome Back
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1 font-medium">
          Focus on what matters today.
        </p>
      </header>

      <div className="bg-surface-container-lowest rounded-ds-xl p-ds-lg shadow-level1 border border-outline-variant/30">
        <div className="hidden lg:block mb-ds-lg">
          <h1 className="text-headline-md text-on-surface tracking-tight font-bold">
            Welcome Back
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1 font-medium">
            Sign in to continue to your tasks.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-ds-lg">
          {successMessage && (
            <div className="rounded-ds-md bg-primary/10 p-3 text-xs text-primary font-bold">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="rounded-ds-md bg-error/10 p-3 text-xs text-error font-bold">
              {error}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            icon="mail"
            placeholder="name@company.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="space-y-ds-xs">
            <div className="flex justify-between items-center px-xs">
              <label className="text-label-md font-bold text-on-surface-variant/80 uppercase tracking-widest block ml-xs">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline transition-all font-bold"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              icon="lock"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="flex items-center space-x-2 px-xs">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="text-body-md text-on-surface-variant cursor-pointer font-medium">
              Keep me logged in
            </label>
          </div>

          <Button type="submit" className="w-full font-bold" size="lg" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </div>

      <footer className="mt-ds-sm text-center">
        <p className="text-sm text-on-surface-variant font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline ml-1">
            Register
          </Link>
        </p>
      </footer>

      {/* Visual Atmospheric Elements — mobile only */}
      <div className="lg:hidden fixed top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[80px] -z-10" />
      <div className="lg:hidden fixed bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary-container/10 rounded-full blur-[80px] -z-10" />
    </main>
  );
};
