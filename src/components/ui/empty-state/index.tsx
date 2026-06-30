import React from 'react';
import { cn } from '../../../utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-on-surface-variant/60 animate-fade-in text-center", className)}>
      {icon && (
        <div className="bg-surface-container rounded-full p-6 mb-4 shadow-sm">
          {icon}
        </div>
      )}
      <p className="font-bold text-headline-sm text-on-surface">{title}</p>
      {description && (
        <p className="text-body-md mt-1 max-w-[280px]">{description}</p>
      )}
    </div>
  );
};
