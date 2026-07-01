import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task, TaskStatus } from '../../../../types';
import { Badge } from '../../../../components/ui/badge';
import { Trash2, CheckCircle, Circle, GripVertical, Clock, Calendar } from 'lucide-react';
import { useTaskMutations } from '../../hooks/use-tasks';
import { cn } from '../../../../utils/cn';
import { ConfirmModal } from '../../../../components/ui/confirm-modal';

interface TaskItemProps {
  task: Task;
  isSortable?: boolean;
  showGripHandle?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, isSortable, showGripHandle }) => {
  const { updateTask, deleteTask } = useTaskMutations();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: !isSortable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleStatus = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const statusOrder: TaskStatus[] = ['todo', 'in-progress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    updateTask.mutate({ id: task.id, updates: { status: nextStatus } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const isDone = task.status === 'done';
  const showGrip = isSortable || showGripHandle;

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-ds-md rounded-ds-lg border-2 border-dashed border-primary/30 bg-primary/5 min-h-[80px] opacity-50"
      />
    );
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      onClick={() => !isSortable && handleToggleStatus()}
      className={cn(
        "p-ds-md rounded-ds-lg shadow-level1 border border-outline-variant/10 hover:border-primary-fixed hover:shadow-level2 transition-all duration-200 group flex items-start gap-ds-md",
        isDone ? "bg-surface-container opacity-80" : "bg-surface-container-lowest",
        !isSortable && "cursor-pointer"
      )}
    >
      {showGrip && (
        <div 
          {...(isSortable ? { ...attributes, ...listeners } : {})}
          className={cn(
            "mt-1 text-outline-variant p-0.5",
            isSortable && "cursor-grab active:cursor-grabbing hover:text-primary transition-colors"
          )}
        >
          <GripVertical className="h-4 w-4" />
        </div>
      )}
      {!showGrip && (
        <div className="pt-1">
          <button
            onClick={handleToggleStatus}
            className={cn(
              "w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all cursor-pointer bg-surface-container-lowest shadow-sm",
              isDone ? "border-primary bg-primary text-white" : "border-outline-variant hover:border-primary text-primary"
            )}
          >
            {task.status === 'done' ? (
              <CheckCircle className="h-3.5 w-3.5" />
            ) : task.status === 'in-progress' ? (
              <Clock className="h-3.5 w-3.5 text-secondary fill-secondary/10" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <span 
          className={cn(
            "block text-headline-sm text-on-surface font-bold truncate leading-tight",
            isDone && "line-through text-on-surface-variant font-medium"
          )}
        >
          {task.title}
        </span>

        {task.description && (
          <p 
            className={cn(
              "text-body-md text-on-surface-variant mt-2 line-clamp-1 leading-relaxed",
              isDone && "line-through"
            )}
          >
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-ds-xs mt-ds-sm items-center">
          <Badge variant={task.priority} className="px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] capitalize">{task.priority}</Badge>
          <Badge variant={task.status} className="px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] capitalize">{task.status}</Badge>
          {task.dueDate && (
            <Badge variant="default" className="px-2 py-0.5 font-bold text-[9px] gap-1 capitalize">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleDelete}
          className="p-1.5 text-error hover:bg-error/10 rounded-full transition-all"
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteTask.mutate(task.id)}
        title="Delete Task"
        description={`Delete "${task.title}"?`}
        confirmText="Delete"
        variant="error"
      />
    </div>
  );
};
