import React from 'react';
import { cn } from '../../../utils/cn';
import type { TaskStatus, TaskPriority } from '../../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: TaskStatus | TaskPriority | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants: Record<string, string> = {
    default: 'bg-surface-container-highest text-on-surface-variant',
    todo: 'bg-primary-container/10 text-primary dark:bg-primary/20 dark:text-primary',
    'in-progress': 'bg-secondary-container/10 text-secondary dark:bg-secondary/20 dark:text-secondary',
    done: 'bg-tertiary-container/10 text-tertiary dark:bg-tertiary/20 dark:text-tertiary',
    high: 'bg-error-container/10 text-error dark:bg-error/20 dark:text-error',
    medium: 'bg-secondary-container/10 text-secondary dark:bg-secondary/20 dark:text-secondary',
    low: 'bg-primary-container/10 text-primary dark:bg-primary/20 dark:text-primary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
};
