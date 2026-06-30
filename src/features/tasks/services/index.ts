import { mockApi } from '../../../api/mock';
import type { Task } from '../../../types';

export const taskService = {
  getTasks: async (userId: string): Promise<Task[]> => {
    await mockApi.delay();
    const tasks = mockApi.getTasks();
    return tasks.filter((t) => t.userId === userId);
  },

  createTask: async (userId: string, taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    await mockApi.delay();
    const tasks = mockApi.getTasks();
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockApi.saveTasks([...tasks, newTask]);
    return newTask;
  },

  updateTask: async (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Task> => {
    await mockApi.delay();
    const tasks = mockApi.getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Tugas tidak ditemukan');
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const newTasks = [...tasks];
    newTasks[taskIndex] = updatedTask;
    mockApi.saveTasks(newTasks);
    return updatedTask;
  },

  deleteTask: async (id: string): Promise<void> => {
    await mockApi.delay();
    const tasks = mockApi.getTasks();
    const newTasks = tasks.filter((t) => t.id !== id);
    mockApi.saveTasks(newTasks);
  },
};
