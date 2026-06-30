import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { authService } from '../../services';
import { useAuthStore } from '../../store';

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await authService.register(data.name, data.email, data.password);
      setSession(session);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[420px] animate-fade-in">
      <header className="text-center mb-ds-xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-ds-xl bg-primary-container text-on-primary-container mb-ds-md shadow-md">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
        <h1 className="text-headline-md text-on-surface tracking-tight font-bold">
          Create Account
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1 font-medium">
          Start your productivity journey.
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
            label="Full Name"
            type="text"
            icon="person"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email Address"
            type="email"
            icon="mail"
            placeholder="name@company.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
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
            Register
          </Button>
        </form>
      </div>

      <footer className="mt-ds-xl text-center">
        <p className="text-body-md text-on-surface-variant font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline ml-1">
            Login
          </Link>
        </p>
      </footer>

      {/* Visual Atmospheric Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[80px] -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary-container/10 rounded-full blur-[80px] -z-10"></div>
    </main>
  );
};
