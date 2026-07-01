import React from 'react';
import { CheckCircle } from 'lucide-react';

interface AuthSplitLayoutProps {
  headline: string;
  description: string;
  children: React.ReactNode;
}

export const AuthSplitLayout: React.FC<AuthSplitLayoutProps> = ({
  headline,
  description,
  children,
}) => {
  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/login-hero.png"
          alt="Productive workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
        <div className="relative z-10 flex flex-col justify-between p-ds-xxl w-full">
          <div className="flex items-center gap-ds-sm">
            <CheckCircle className="h-8 w-8 text-white fill-white/20" />
            <span className="text-headline-md font-extrabold text-white tracking-tight">
              TaskFlow Manager
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="text-display-lg font-extrabold text-white leading-tight mb-ds-md">
              {headline}
            </h1>
            <p className="text-body-lg text-white/90 font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex items-center justify-center p-ds-container">
        {children}
      </div>
    </div>
  );
};
