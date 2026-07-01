import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  useDroppable,
} from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Task, TaskStatus } from '../../../../types';
import { TaskItem } from '../task-item';
import { useTaskMutations } from '../../hooks/use-tasks';
import { cn } from '../../../../utils/cn';
import { EmptyState } from '../../../../components/ui/empty-state';

interface TaskBoardProps {
  tasks: Task[];
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

interface KanbanColumnProps {
  id: TaskStatus;
  label: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, label, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className="min-w-[280px] md:flex-1 bg-surface-container-low/50 rounded-ds-lg p-ds-md flex flex-col gap-ds-md snap-center border border-outline-variant/10 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-ds-xs">
        <span className="text-headline-sm text-on-surface font-black capitalize tracking-wide">{label}</span>
        <span className={cn(
          "px-2 py-0.5 rounded-full font-bold text-[10px] shadow-sm",
          id === 'in-progress' ? "bg-primary text-white" : "bg-surface-container-highest text-on-surface-variant"
        )}>
          {tasks.length}
        </span>
      </div>
      
      <SortableContext
        id={id}
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-ds-sm min-h-[150px] flex-1">
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskItem task={task} isSortable />
            </div>
          ))}
          {tasks.length === 0 && (
            <EmptyState 
              title="Empty"
              className="py-10 bg-surface/20 rounded-ds-lg border-2 border-dashed border-outline-variant/10 flex-1"
            />
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const { updateTask } = useTaskMutations();
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if over a column or a task
    const overTask = tasks.find((t) => t.id === overId);
    const isOverAColumn = COLUMNS.some((col) => col.id === overId);

    let nextStatus: TaskStatus | null = null;

    if (isOverAColumn) {
      nextStatus = overId as TaskStatus;
    } else if (overTask && overTask.status !== activeTask.status) {
      nextStatus = overTask.status;
    }

    if (nextStatus && nextStatus !== activeTask.status) {
      updateTask.mutate({ id: activeTask.id, updates: { status: nextStatus } });
    }
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-scroll flex gap-ds-md overflow-x-auto pb-ds-lg snap-x snap-mandatory h-full">
        {COLUMNS.map((column) => (
          <KanbanColumn 
            key={column.id}
            id={column.id}
            label={column.label}
            tasks={tasks.filter((t) => t.status === column.id)}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.5',
            },
          },
        }),
      }}>
        {activeTask ? <TaskItem task={activeTask} showGripHandle /> : null}
      </DragOverlay>
    </DndContext>
  );
};
