import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services';
import { useAuthStore } from '../../../auth/store';
import type { Task } from '../../../../types';

export const useTasks = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: () => taskService.getTasks(user!.id),
    enabled: !!user?.id,
  });
};

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const createTask = useMutation({
    mutationFn: (taskData: Parameters<typeof taskService.createTask>[1]) =>
      taskService.createTask(user!.id, taskData),
    onMutate: async (newTaskData) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', user?.id] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', user?.id]);
      
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks', user?.id], [
          ...previousTasks,
          {
            ...newTaskData,
            id: 'temp-id',
            userId: user!.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Task,
        ]);
      }

      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', user?.id], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof taskService.updateTask>[1] }) =>
      taskService.updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks', user?.id] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', user?.id]);

      // Optimistically update to the new value
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ['tasks', user?.id],
          previousTasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
          )
        );
      }

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', user?.id], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', user?.id] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', user?.id]);

      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ['tasks', user?.id],
          previousTasks.filter((task) => task.id !== id)
        );
      }

      return { previousTasks };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', user?.id], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
  };
};
