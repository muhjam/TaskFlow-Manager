import React from 'react';
import { cn } from '../../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'error' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary !text-white hover:bg-primary/90 shadow-[0_10px_15px_rgba(17,24,39,0.1)] dark:shadow-none',
      secondary: 'bg-secondary !text-white hover:bg-secondary/90',
      ghost: 'bg-transparent text-primary hover:bg-surface-container-low',
      error: 'bg-error !text-white hover:bg-error/90',
      surface: 'bg-surface text-primary shadow-sm hover:bg-surface-container-low',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-headline-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary-container/30 disabled:pointer-events-none disabled:opacity-70',
          variants[variant],
          sizes[size],
          isLoading && 'cursor-wait',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
