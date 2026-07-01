import React from 'react';
import { Skeleton } from '../../../../components/ui/skeleton';

export const TaskItemSkeleton: React.FC = () => {
  return (
    <div className="p-ds-md rounded-ds-lg border border-outline-variant/10 bg-surface-container-lowest flex items-start gap-ds-md">
      <Skeleton className="w-5 h-5 rounded-full shrink-0 mt-1" />
      <div className="flex-1 space-y-ds-sm min-w-0">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-full max-w-[280px]" />
        <div className="flex gap-ds-xs pt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};
