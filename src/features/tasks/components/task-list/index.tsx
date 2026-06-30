import React from 'react';
import type { Task } from '../../../../types';
import { TaskItem } from '../task-item';
import { EmptyState } from '../../../../components/ui/empty-state';
import { Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <EmptyState 
        icon={<Inbox className="h-10 w-10 text-on-surface-variant/40" />}
        title="No tasks found"
        description="Try searching for something else or add a new task to get started."
      />
    );
  }

  return (
    <div className="space-y-ds-sm animate-fade-in">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
