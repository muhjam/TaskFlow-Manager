import React from 'react';
import { Skeleton } from '../../../../components/ui/skeleton';
import { TaskItemSkeleton } from '../task-item-skeleton';

const KanbanColumnSkeleton: React.FC = () => (
  <div className="min-w-[280px] md:flex-1 bg-surface-container-low/50 rounded-ds-lg p-ds-md flex flex-col gap-ds-md border border-outline-variant/10">
    <div className="flex items-center gap-2 mb-ds-xs">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-5 w-6 rounded-full" />
    </div>
    <div className="flex flex-col gap-ds-sm">
      <TaskItemSkeleton />
      <TaskItemSkeleton />
    </div>
  </div>
);

export const TaskBoardSkeleton: React.FC = () => {
  return (
    <div className="flex gap-ds-md overflow-x-auto pb-ds-lg">
      <KanbanColumnSkeleton />
      <KanbanColumnSkeleton />
      <KanbanColumnSkeleton />
    </div>
  );
};
