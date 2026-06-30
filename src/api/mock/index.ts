import { storage, STORAGE_KEYS } from '../../utils/storage';
import type { User, Task } from '../../types';

const LATENCY = 800;

export const mockApi = {
  delay: () => new Promise((resolve) => setTimeout(resolve, LATENCY)),

  // Auth
  getUsers: (): User[] => storage.get<User[]>(STORAGE_KEYS.USERS) || [],
  saveUsers: (users: User[]) => storage.set(STORAGE_KEYS.USERS, users),

  // Tasks
  getTasks: (): Task[] => storage.get<Task[]>(STORAGE_KEYS.TASKS) || [],
  saveTasks: (tasks: Task[]) => storage.set(STORAGE_KEYS.TASKS, tasks),
};
