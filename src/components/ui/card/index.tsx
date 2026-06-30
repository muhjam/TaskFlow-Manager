import React from 'react';
import { cn } from '../../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'none' | 'level1' | 'level2';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation = 'level1', ...props }, ref) => {
    const elevations = {
      none: '',
      level1: 'shadow-level1',
      level2: 'shadow-level2',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-ds-lg bg-surface-container-lowest p-ds-md',
          elevations[elevation],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
