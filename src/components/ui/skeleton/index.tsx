import React from 'react';
import { cn } from '../../../utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-ds-md bg-surface-container',
        className
      )}
      {...props}
    />
  );
};
