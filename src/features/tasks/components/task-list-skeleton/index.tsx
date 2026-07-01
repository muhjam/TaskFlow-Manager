import React from 'react';
import { Skeleton } from '../../../../components/ui/skeleton';
import { TaskItemSkeleton } from '../task-item-skeleton';

export const TaskListSkeleton: React.FC = () => {
  return (
    <section className="space-y-ds-md">
      <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/5 mb-ds-md">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-8 rounded-full" />
      </div>
      <div className="space-y-ds-sm">
        {Array.from({ length: 4 }).map((_, i) => (
          <TaskItemSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};
