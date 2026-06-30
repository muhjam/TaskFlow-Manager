import { create } from 'zustand';
import type { TaskStatus, TaskPriority } from '../../../types';

interface TaskFilterState {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  viewMode: 'list' | 'kanban';
  setSearch: (search: string) => void;
  setStatus: (status: TaskStatus | 'all') => void;
  setPriority: (priority: TaskPriority | 'all') => void;
  setViewMode: (mode: 'list' | 'kanban') => void;
}

export const useTaskStore = create<TaskFilterState>((set) => ({
  search: '',
  status: 'all',
  priority: 'all',
  viewMode: 'list',
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setViewMode: (viewMode) => set({ viewMode }),
}));
