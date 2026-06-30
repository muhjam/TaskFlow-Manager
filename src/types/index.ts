export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt: string;
}

export interface AuthSession {
  token: string | null;
  user: Omit<User, 'password'> | null;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
